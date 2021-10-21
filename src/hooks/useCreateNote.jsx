import { useCallback, useState } from 'react';

const useCreateNote = () => {
	// Init State : useState
	const [isOnCreateNote, setIsOnCreateNote] = useState(false);
	const [allNotes, setAllNotes] = useState([]);

	// Actions: useCallback
	const addNote = useCallback(
		(note) => {
			setAllNotes([...allNotes, note]);
		},
		[allNotes]
	);
	const changeIsOnCreateNote = useCallback((value) => {
		setIsOnCreateNote(value);
	}, []);

	// const deleteNote = useCallback((note) => {
	//   allNotes.filter()
	// })

	// Combine
	const combineStates = { allNotes, isOnCreateNote };
	const combineActions = { addNote, changeIsOnCreateNote };

	return { ...combineStates, ...combineActions };
};

export default useCreateNote;
