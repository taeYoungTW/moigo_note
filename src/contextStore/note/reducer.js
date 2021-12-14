import {
	ADD_NOTE,
	ADD_SELECTED_NOTE_ID,
	DELETE_NOTE,
	DELETE_NOTES,
	DELETE_SELECTED_NOTE_ID,
	MOVE_BLOCK_TO_END_OF_NOTE,
	RESET_SELECTED_NOTE_IDS,
	SET_IS_CREATE_NOTE_FORM_ON,
	SET_NOTES,
	SET_SEARCH_INPUT,
	UPDATE_BLOCK_OF_NOTE,
	UPDATE_NOTE,
} from './types';

// Initial State
const initialState = {
	_isCreateNoteFormOn: false,
	_selectedNoteIds: [],
	_notes: [],
	_searchInput: '',
};

// Reducer
const reducer = (state = initialState, { type = '', payload = '' }) => {
	switch (type) {
		case SET_SEARCH_INPUT: {
			return { ...state, _searchInput: payload };
		} // payload: string (value)
		case SET_IS_CREATE_NOTE_FORM_ON: {
			return { ...state, _isCreateNoteFormOn: payload }; // payload: boolean
		}
		case ADD_SELECTED_NOTE_ID: {
			return {
				...state,
				_selectedNoteIds: [...state._selectedNoteIds, payload], // payload: string (id)
			};
		}
		case DELETE_SELECTED_NOTE_ID: {
			const newSelectedNoteIds = state._selectedNoteIds.filter(
				(noteId) => noteId !== payload // payload: string (id)
			);
			return { ...state, _selectedNoteIds: newSelectedNoteIds };
		}
		case RESET_SELECTED_NOTE_IDS: {
			return { ...state, _selectedNoteIds: [] };
		}
		case SET_NOTES: {
			return { ...state, _notes: [...payload] }; // payload: array (newNotes)
		}
		case MOVE_BLOCK_TO_END_OF_NOTE: {
			const { noteId, blockIndex } = payload; // payload: object ({noteId, blockIndex})
			const newNotes = state._notes.map((note) => {
				if (note.id === noteId) {
					const newNote = { ...note };
					const [movedItem] = newNote.blocks.splice(blockIndex, 1);
					newNote.blocks.push(movedItem);
					return newNote;
				}
				return note;
			});
			return { ...state, _notes: newNotes };
		}
		case ADD_NOTE: {
			const newNotes = [...state._notes];
			newNotes.unshift(payload); // payload: object (note)
			return { ...state, _notes: newNotes };
		}
		case DELETE_NOTE: {
			const newNotes = state._notes.filter((note) => note.id !== payload); // payload: string (noteId)
			return { ...state, _notes: newNotes };
		}
		case DELETE_NOTES: {
			// payload: inputIds
			const newNotes = [...state._notes];
			for (let i = 0; i < payload.length; i++) {
				for (let j = 0; j < newNotes.length; j++) {
					if (payload[i] === newNotes[j].id) {
						newNotes.splice(j, 1);
						break;
					}
				}
			}
			return { ...state, _notes: newNotes };
		}
		case UPDATE_NOTE: {
			// payload: object (note)
			const newNotes = state._notes.filter((note) => note.id !== payload.id);
			newNotes.unshift(payload);
			return { ...state, _notes: newNotes };
		}
		case UPDATE_BLOCK_OF_NOTE: {
			const { noteId, targetBlock } = payload; // payload: object
			const newNotes = state._notes.map((note) => {
				if (note.id === noteId) {
					const newBlocks = note.blocks.map((block) => {
						if (block.id === targetBlock.id) {
							return { ...targetBlock };
						}
						return { ...block };
					});
					return { ...note, blocks: newBlocks };
				}
				return { ...note };
			});
			return { ...state, _notes: newNotes };
		}
		default:
			return state;
	}
};

export default reducer;
