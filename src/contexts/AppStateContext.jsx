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
// Global States PropTypes
AppStateContext.Provider.propTypes = {
	value: Proptypes.shape({
		_isOnCreateNoteForm: Proptypes.bool,
		_selectedNoteIds: Proptypes.array,
		_allNotes: Proptypes.array,
		_detailNote: Proptypes.object,
		_confirmNoteIdToDelete: Proptypes.string,
		_blocks: Proptypes.array,
	}),
};

export { AppstateProvider, useAppState, useAppAction };
