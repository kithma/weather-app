import { useEffect, useRef, useState } from "react";
import Button from "./Button";

import "../../styles/shared/SearchInput.scss";

interface Props {
	name: string
	placeholder: string
	onSearch: (value: string) => void
	items: any[]
	onSelectItem: (location: any) => void
	error: string
}

const SearchInput = ({ name, placeholder, onSearch, items, onSelectItem, error }: Props) => {
	const [showItems, setShowItems] = useState(items.length > 0);
	const [showError, setShowError] = useState(false);
	const inputRef = useRef<any>();
	const containerRef = useRef<any>();

	useEffect(() => {
		const handleClickOutside = (event: any) => {
			if (containerRef.current && !containerRef.current.contains(event.target)) {
				setShowItems(false)
			}
		}
		document.addEventListener("mousedown", handleClickOutside);
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [containerRef]);

	useEffect(() => {
		setShowItems(items.length > 0);
		if (items.length > 0)
			setShowError(false);
	}, [items]);

	const onButtonClick = () => {
		onSearch(inputRef.current.value);
		if (items.length === 0)
			setShowError(true);
	};

	const selectItem = (item: any) => {
		onSelectItem(item);
		setShowItems(false);
	};

	return <>
		<div className="search-input-container">
			<div className="search-input-container__search">
				<input
					ref={inputRef}
					type="text"
					name={name}
					id={name}
					placeholder={placeholder}
				/>
				{items.length > 0 && showItems &&
					<div className="search-input-container__search--items" ref={containerRef}>
						{items?.map((item, index) => {
							return <div
								key={index}
								onClick={() => selectItem(item)}>
								{item.name}, {item.country}
							</div>
						})}
					</div>}
			</div>
			<Button onClick={() => onButtonClick()}>
				Search
			</Button>
		</div>
		{showError && <p className="error">{error}</p>}
	</>
};

export default SearchInput;