import { useCallback, useState } from 'react';

// Manage Global States & Actions
const useNote = () => {
	/*
	 * ------ Init State : useState ------------------
	 */
	const [isOnCreateNoteForm, setIsOnCreateNoteForm] = useState(false); // ex. true or false
	const [selectedNoteIds, setSelectedNoteIds] = useState([]); // ex. [ id, id, id, ...]
	const [allNotes, setAllNotes] = useState([]); // ex. [{title, id, blocks}, {title, id, blocks}, {title, id, blocks}, ... ]
	const [detailNote, setDetailNote] = useState({}); // ex. {title, id, blocks}
	const [confirmNoteIdtoDelete, setConfirmNoteIdtoDelete] = useState(''); // string : Put a specific Note id to delete

	/*
	 * ------ Actions: useCallback -------------------
	 */
	/*
	 * ~~~~ About State of CreateNote Area ~~~~
	 * - changeIsOnCreateNoteForm : Change "isOn(focus)"
	 * true : (CreateNote -> CreateNoteForm)
	 * 									Or
	 * false : (CreateNoteForm -> CreateNote)
	 */
	const changeIsOnCreateNoteForm = useCallback((value) => {
		setIsOnCreateNoteForm(value);
	}, []);
	/**
	 * ~~~~ About Selection ~~~~
	 *	- addSelectedNotedId : add A selected NoteID To SelectedNoteIds
	 *	- deleteSelectedNoteId : delete A selected NoteID To SelectedNoteIds
	 *	- resetSelectedNoteIds : reset SelectedNoteIds
	 */
	const addSelectedNoteId = useCallback((id) => {
		setSelectedNoteIds((ids) => [...ids, id]);
	}, []);

	const deleteSelectedNoteId = useCallback(
		(id) => {
			const newSelectedNoteIds = selectedNoteIds.filter(
				(noteId) => noteId !== id
			);
			setSelectedNoteIds(newSelectedNoteIds);
		},
		[selectedNoteIds]
	);

	const resetSelectedNoteIds = useCallback(() => {
		setSelectedNoteIds([]);
	}, []);

	/*
	 * ~~~~ About Detail Note (ON/OFF) ~~~~
	 * - onDetailNote : Add a specific Note to detailNote (Global State) when user click the specific SummaryNote.
	 * 									After that, DetailNot Component is rendered
	 * - offDetailNote : Reset detailNote state
	 * - updateDetailNoteChecklist : Update A specific ChecklistBlock for detailNote state
	 */
	const onDetailNote = useCallback((note) => {
		setDetailNote(note);
	}, []);

	const offDetailNote = useCallback(() => {
		setDetailNote({});
	}, []);

	const updateDetailNoteChecklist = useCallback(
		(targetBlock) =>
			setDetailNote((detailNote) => {
				const newBlocks = detailNote.blocks.map((block) => {
					if (block.id === targetBlock.id) {
						return { ...targetBlock };
					} else {
						return { ...block };
					}
				});

				return { ...detailNote, blocks: newBlocks };
			}),
		[]
	);

	/*
	 * ~~~~ About "allNotes" state ~~~~
	 * - addNote : Add a specific Note to "allNotes" state
	 * - deleteNote : Delete a specific Note to "allNotes" state
	 * - deleteNotes : Delete specific Notes (selected Notes) to "allNotes" state
	 * - updateNote : Update a specific Note of "allNotes" state
	 * - updateNoteChecklist : Update a specific ChecklistBlock of a specific Note (so, need noteId and block)
	 */
	const addNote = useCallback(
		(note) => {
			allNotes.unshift(note);
			setAllNotes([...allNotes]);
		},
		[allNotes]
	);

	const deleteNote = useCallback(
		(id) => {
			const newAllNotes = allNotes.filter((note) => note.id !== id);
			setAllNotes(newAllNotes);

			const isSelected = selectedNoteIds.includes(id);
			if (isSelected) {
				deleteSelectedNoteId(id);
			}
		},
		[allNotes, selectedNoteIds, deleteSelectedNoteId]
	);

	const deleteNotes = useCallback(() => {
		let tempAllNotes = allNotes;
		selectedNoteIds.forEach((id) => {
			tempAllNotes = tempAllNotes.filter((note) => note.id !== id);
		});
		setSelectedNoteIds([]); // Cancel Selected Notes
		setAllNotes(tempAllNotes);
	}, [allNotes, selectedNoteIds]);

	const updateNote = useCallback(
		(newNote) => {
			const newAllNotes = allNotes.filter((note) => note.id !== newNote.id);
			newAllNotes.unshift(newNote);
			setAllNotes(newAllNotes);
			setDetailNote({});
		},
		[allNotes]
	);

	const updateNoteChecklist = useCallback((noteId, targetBlock) => {
		setAllNotes((AllNotes) => {
			return AllNotes.map((note) => {
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
		});
	}, []);

	// ------ Combine States & Actions ------
	const combineStates = {
		allNotes,
		isOnCreateNoteForm,
		selectedNoteIds,
		detailNote,
		confirmNoteIdtoDelete,
	};
	const combineActions = {
		addNote,
		changeIsOnCreateNoteForm,
		deleteNote,
		deleteNotes,
		addSelectedNoteId,
		deleteSelectedNoteId,
		resetSelectedNoteIds,
		onDetailNote,
		offDetailNote,
		updateNote,
		setConfirmNoteIdtoDelete,
		updateNoteChecklist,
		updateDetailNoteChecklist,
	};

	return { ...combineStates, ...combineActions };
};

export default useNote;
