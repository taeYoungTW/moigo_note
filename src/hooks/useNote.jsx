import { useCallback, useState } from 'react';

// Manage Global States & Actions
const useNote = () => {
	// Init State : useState
	const [isOnCreateNote, setIsOnCreateNote] = useState(false);
	const [selectedNoteIds, setSelectedNoteIds] = useState([]); // ex. [ id, id, id, ...]
	const [allNotes, setAllNotes] = useState([]);
	const [detailNote, setDetailNote] = useState({});

	// Actions: useCallback
	// Change "isOn(focus)" State of CreateNote Area
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
		setSelectedNoteIds([]); // Cancel Selected Notes
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

	const cancelSelect = useCallback(() => {
		setSelectedNoteIds([]);
	}, []);

	// Detail Note
	const onDetailNote = useCallback((note) => {
		setDetailNote(note);
	}, []);

	const offDetailNote = useCallback(() => {
		setDetailNote({});
	}, []);

	// Combine States & Actions
	const combineStates = {
		allNotes,
		isOnCreateNote,
		selectedNoteIds,
		detailNote,
	};
	const combineActions = {
		addNote,
		changeIsOnCreateNote,
		deleteNote,
		deleteNotes,
		selectNoteId,
		deleteNoteId,
		cancelSelect,
		onDetailNote,
		offDetailNote,
	};

	return { ...combineStates, ...combineActions };
};

export default useNote;
