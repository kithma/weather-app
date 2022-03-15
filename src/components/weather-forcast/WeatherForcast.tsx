import { useContext, useEffect, useState } from 'react';
import DailyWeather from './DailyWeather';
import ToggleButton from "../shared/ToggleButton";
import CurrentWeather from "./CurrentWeather";
import SearchInput from "../shared/SearchInput";
import { StoreContext } from "../../stores/StoreContext";
import { observer } from "mobx-react";
import { GeoLocation } from '../../models/WeatherForcast';
import Spinner from '../shared/Spinner';

import "../../styles/components/WeatherForcast.scss";


const WeatherForcast = () => {
	const { mainStore } = useContext(StoreContext);
	const { geoLocation, loading } = mainStore;
	const [geoLocations, setGeoLocations] = useState([]);

	useEffect(() => {
		if (!geoLocation) {
			navigator.geolocation.getCurrentPosition(function (position) {
				mainStore.loadWeatherData(position.coords.latitude, position.coords.longitude);
			});
		}
		else
			mainStore.loadWeatherData()
	}, []);

	const onSearchCity = async (city: string) => {
		const data = await mainStore.loadGeoLocation({ city });
		setGeoLocations(data);
	};

	const onChangeScaleOption = () => {
		mainStore.loadWeatherData();
	};

	const onSelectgeoLocation = async (location: GeoLocation) => {
		mainStore.geoLocation = location;
		mainStore.loadWeatherData();
	};

	return (
		<div className="app-container">
			<div className="app-container__layout">
				<SearchInput
					placeholder="Search city"
					name="city"
					onSearch={onSearchCity}
					items={geoLocations}
					onSelectItem={onSelectgeoLocation}
					error="Please enter a valid city"
				/>
				<div className="data-container">
					<ToggleButton onChange={onChangeScaleOption} />

					{loading ? <Spinner /> :
						geoLocation ?
							<>
								<p className="bold data-container__city">{`${geoLocation?.name}, ${geoLocation?.country}`}</p>
								<div className="data-container__forcast">
									<CurrentWeather />
									<DailyWeather />
								</div>
							</> :
							<p className="error">Please select a city</p>}
				</div>
			</div>
		</div>
	);
}

export default observer(WeatherForcast);
