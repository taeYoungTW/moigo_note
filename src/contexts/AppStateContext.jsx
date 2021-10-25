import { createContext, useContext } from 'react';
import useNote from '../hooks/useNote';
import Proptypes from 'prop-types';
import useBlock from '../hooks/useBlock';

const AppStateContext = createContext();
// State와 Action을 구분하여 사용하기 위함
const useAppState = () => useContext(AppStateContext);
const useAppAction = () => useContext(AppStateContext);

// Provider
const AppstateProvider = ({ children }) => {
	// Combine
	const combine = { ...useNote(), ...useBlock() };

	// Provider
	return (
		<AppStateContext.Provider value={combine}>
			{children}
		</AppStateContext.Provider>
	);
};
AppStateContext.Provider.propTypes = {
	value: Proptypes.shape({
		isOnCreateNote: Proptypes.bool,
		selectedNoteIds: Proptypes.array,
		allNotes: Proptypes.array,
		detailNote: Proptypes.object,
		confirmNoteIdtoDelete: Proptypes.string,
	}),
};

export { AppstateProvider, useAppState, useAppAction };
