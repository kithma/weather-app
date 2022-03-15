import React from "react";
import MainStore from "./MainStore";

interface StoreContextType {
	mainStore: MainStore;
}

const mainStore = new MainStore();

export const StoreContext = React.createContext<StoreContextType>({
	mainStore
});