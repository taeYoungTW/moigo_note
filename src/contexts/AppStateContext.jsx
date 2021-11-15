import { createContext, useContext } from 'react';
import Note from '../contextStore/Note';
import Block from '../contextStore/Block';
import Proptypes from 'prop-types';

const AppStateContext = createContext();
// State와 Action을 구분하여 사용하기 위함
const useAppState = () => useContext(AppStateContext);
const useAppAction = () => useContext(AppStateContext);

// Provider
const AppStateProvider = ({ children }) => {
	// Combine
	const combine = { ...Note(), ...Block() };

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
		_isCreateNoteFormOn: Proptypes.bool,
		_selectedNoteIds: Proptypes.array,
		_allNotes: Proptypes.array,
		_modalNote: Proptypes.object,
		_confirmNoteIdToDelete: Proptypes.string,
		_blocks: Proptypes.array,
	}),
};

export { AppStateProvider, useAppState, useAppAction };
