import { useContext } from "react";
import { StoreContext } from "../../stores/StoreContext";
import { observer } from "mobx-react";
import { getImageUrl } from "../../utils/ImageUtils";
import { SCALE_TYPE_OPTIONS } from "../../configs/constants";
import moment from "moment";

import "../../styles/components/DailyWeather.scss";

const DailyWeather = () => {
	const { mainStore } = useContext(StoreContext);
	const { dailyForcast, scaleType } = mainStore;
	const selectedScaleType = SCALE_TYPE_OPTIONS.find(type => type.value === scaleType)?.label;


	return <div>
		<h2 className="bold">8 day weather forcast</h2>
		<div className="daily-weather-container">
			{dailyForcast?.map(({ weather, dt, temp }) => {
				return <div className="daily-weather-container__day" key={dt}>
					<p className="bold">{moment.unix(dt).format(("dddd, MMM D"))}</p>
					<div className="daily-weather-container__day--info">
						<img src={getImageUrl(weather[0].icon)} alt="" />
						<p className="daily-weather-container__info--temp">{temp?.day} {selectedScaleType}</p>
					</div>
				</div>
			})}
		</div>
	</div>
};

export default observer(DailyWeather);