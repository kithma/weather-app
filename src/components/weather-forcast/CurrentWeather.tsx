import { useContext } from "react";
import { observer } from "mobx-react";
import { StoreContext } from "../../stores/StoreContext";
import { getImageUrl } from "../../utils/ImageUtils";
import { SCALE_TYPE_OPTIONS } from "../../configs/constants";
import moment from "moment";

import "../../styles/components/CurrentWeather.scss";

const CurrentWeather = () => {
	const { mainStore } = useContext(StoreContext);
	const { currentWeather, scaleType } = mainStore;
	const selectedScaleType = SCALE_TYPE_OPTIONS.find(type => type.value === scaleType)?.label;

	return <div>
		<h2 className="bold">Current Weather</h2>
		<div className="current-weather-container">
			<p className="bold">{moment.unix(currentWeather?.dt).format("dddd, MMM D HH:MM")}</p>
			<div className="current-weather-container__info">
				<img src={getImageUrl(currentWeather?.weather[0]?.icon)} alt="" />
				<p className="current-weather-container__info--temp">{currentWeather?.temp} {selectedScaleType}</p>
			</div>
		</div>
	</div>
}

export default observer(CurrentWeather);