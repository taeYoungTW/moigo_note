import { createContext, useContext } from 'react';
import useNote from '../hooks/useNote';

const AppStateContext = createContext();

// State와 Action을 구분하여 사용하기 위함
const useAppState = () => useContext(AppStateContext);
const useAppAction = () => useContext(AppStateContext);

// Provider
const AppstateProvider = ({ children }) => {
	// Combine
	const combine = { ...useNote() };

	// Provider
	return (
		<AppStateContext.Provider value={combine}>
			{children}
		</AppStateContext.Provider>
	);
};

export { AppstateProvider, useAppState, useAppAction };
