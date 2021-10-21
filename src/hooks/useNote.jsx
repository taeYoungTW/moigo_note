import { useCallback, useState } from 'react';

const useNote = () => {
	// Init State : useState
	const [isOnCreateNote, setIsOnCreateNote] = useState(false);
	const [selectedNoteIds, setSelectedNoteIds] = useState([]); // ex. [ id, id, id, ...]
	const [allNotes, setAllNotes] = useState([]);

	// Actions: useCallback

	// Change State
	const changeIsOnCreateNote = useCallback((value) => {
		setIsOnCreateNote(value);
	}, []);

	// Create A Note
	const addNote = useCallback(
		(note) => {
			setAllNotes([...allNotes, note]);
		},
		[allNotes]
	);

	// Delete A specific Note
	const deleteNote = useCallback(
		(id) => {
			const newAllNotes = allNotes.filter((note) => note.id !== id);
			setAllNotes(newAllNotes);
		},
		[allNotes]
	);

	// Delete specific Notes (Selected)
	const deleteNotes = useCallback(() => {
		let tempAllNotes = allNotes;
		selectedNoteIds.forEach((id) => {
			tempAllNotes = tempAllNotes.filter((note) => note.id !== id);
		});
		setAllNotes(tempAllNotes);
	}, [allNotes, selectedNoteIds]);

	// About Selection
	const selectNoteId = useCallback((id) => {
		setSelectedNoteIds((ids) => [...ids, id]);
	}, []);

	const deleteNoteId = useCallback(
		(id) => {
			const newSelectedNoteIds = selectedNoteIds.filter(
				(noteId) => noteId !== id
			);
			setSelectedNoteIds(newSelectedNoteIds);
		},
		[selectedNoteIds]
	);

	// Combine
	const combineStates = { allNotes, isOnCreateNote, selectedNoteIds };
	const combineActions = {
		addNote,
		changeIsOnCreateNote,
		deleteNote,
		deleteNotes,
		selectNoteId,
		deleteNoteId,
	};

	return { ...combineStates, ...combineActions };
};

export default useNote;
