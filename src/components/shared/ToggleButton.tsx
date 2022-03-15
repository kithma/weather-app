import { useContext } from 'react';
import { ScaleTypes, SCALE_TYPE_OPTIONS } from '../../configs/constants';
import { StoreContext } from "./../../stores/StoreContext";
import { observer } from 'mobx-react';

import "../../styles/shared/ToggleButton.scss";

interface Props {
	onChange: () => void
}

const ToggleButton = observer(({ onChange }: Props) => {
	const { mainStore } = useContext(StoreContext);
	const { scaleType } = mainStore;

	const onSelectOption = (option: ScaleTypes) => {
		mainStore.scaleType = option;
		onChange();
	};

	return <div className="toggle-container">
		<p>{SCALE_TYPE_OPTIONS[0].label}</p>
		<div className="toggle-button">
			<div
				className={`toggle-button__toggler${scaleType === SCALE_TYPE_OPTIONS[0].value ? "--active" : ""}`}
				onClick={() => onSelectOption(SCALE_TYPE_OPTIONS[0].value)}
			/>
			<div className={`toggle-button__toggler${scaleType === SCALE_TYPE_OPTIONS[1].value ? "--active" : ""}`}
				onClick={() => onSelectOption(SCALE_TYPE_OPTIONS[1].value)} />
		</div>
		<p>{SCALE_TYPE_OPTIONS[1].label}</p>
	</div>
});

export default ToggleButton;