export enum ScaleTypes {
	Celsius = "metric",
	Fahrenheit = "imperial"

};

export const SCALE_TYPE_OPTIONS = [
	{ label: "°C", value: ScaleTypes.Celsius },
	{ label: "°F", value: ScaleTypes.Fahrenheit }
];