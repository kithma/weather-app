import { ObservableMap, observable, IObservableValue, runInAction, autorun } from "mobx";
import { ScaleTypes } from "../configs/constants";
import { ForcastResponse, GeoLocation, Current, Daily } from "../models/WeatherForcast";
const API_KEY = "e1c2d3bf6b76889d59e4f49cfbede379";

class MainStore {
	@observable
	private _scaleType: IObservableValue<ScaleTypes> = observable.box(ScaleTypes.Celsius);

	@observable
	private _dailyForcast: ObservableMap<number, Daily> = observable.map();

	@observable
	private _currentWeather: IObservableValue<Current> = observable.box();

	@observable
	private _geoLocation: IObservableValue<GeoLocation> = observable.box();

	@observable
	private _loading: IObservableValue<boolean> = observable.box(false);

	constructor() {
		autorun(this.syncWithLocalStorage)
	}

	syncWithLocalStorage = () => {
		const city = localStorage.getItem("city") as string;
		const country = localStorage.getItem("country");
		const scaleType = localStorage.getItem("scaleType") as ScaleTypes;

		if (country && city) {
			this._geoLocation.set({ country, name: city })
		}
		if (scaleType)
			this.scaleType = scaleType;
	}


	get scaleType() {
		return this._scaleType.get()
	}

	set scaleType(type: ScaleTypes) {
		runInAction(() => {
			this._scaleType.set(type)
			localStorage.setItem("scaleType", type)
		});
	}

	set loading(state: boolean) {
		runInAction(() => {
			this._loading.set(state)
		});
	}

	set geoLocation(location) {
		runInAction(() => {
			this._geoLocation.set(location)
		});

		localStorage.setItem("country", location?.country as string)
		localStorage.setItem("city", location.name as string)
	}

	get dailyForcast() {
		return [...this._dailyForcast.values()];
	};

	get currentWeather() {
		return this._currentWeather.get();
	};

	get geoLocation() {
		return this._geoLocation.get();
	};

	get loading() {
		return this._loading.get();
	}


	async loadWeatherData(lat?: number, lon?: number) {
		try {
			this.loading = true;
			let latitude = lat ?? this.geoLocation.lat;
			let longitude = lon ?? this.geoLocation.lon;


			if (!latitude || !longitude) {
				await this.loadGeoLocation({ storeData: true });

				latitude = this.geoLocation.lat;
				longitude = this.geoLocation.lon;
			}

			if (!this.geoLocation?.name && latitude && longitude) {
				await this.loadCityData(latitude, longitude)
			}

			const response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=${this.scaleType}&exclude=minutely,hourly,alerts`);

			const data: ForcastResponse = await response.json();

			runInAction(async () => {
				this._currentWeather.set(data.current);

				this._dailyForcast.clear();
				data.daily.forEach(item => {
					this._dailyForcast.set(item.dt, item);
				});
				this.loading = false;
			})
		} catch (err) {
			this.loading = false;
		}
	};

	async loadGeoLocation({ city, storeData = false }: { city?: string, storeData?: boolean }) {
		const selectedCity = city ?? this.geoLocation.name;

		try {
			const response = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${selectedCity}&appid=${API_KEY}&limit=10`);
			const data = await response.json();

			if (storeData)
				runInAction(() => {
					this._geoLocation.set(data[0])
				})
			else
				return data;

		} catch (err) {
		}
	}

	async loadCityData(lat: number, lon: number) {
		try {
			const response = await fetch(`http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&appid=${API_KEY}`);
			const [data] = await response.json();

			runInAction(() => {
				this._geoLocation.set(data);
			})
		} catch (err) {
		}
	}
}

export default MainStore;