import { useCallback, useState } from 'react';

// Manage Global States & Actions
const useNote = () => {
	/*
	 * ------ Init State : useState ------------------
	 */
	const [_isOnCreateNoteForm, setIsOnCreateNoteForm] = useState(false); // ex. true or false
	const [_selectedNoteIds, setSelectedNoteIds] = useState([]); // ex. [ id, id, id, ...]
	const [_allNotes, setAllNotes] = useState([]); // ex. [{title, id, blocks}, {title, id, blocks}, {title, id, blocks}, ... ]
	const [_detailNote, setDetailNote] = useState({}); // ex. {title, id, blocks}

	/*
	 * ------ Actions: useCallback -------------------
	 */
	/*
	 * ~~~~ About State of CreateNote Area ~~~~
	 * - _changeIsOnCreateNoteForm : Change "isOn(focus)"
	 * true : (CreateNote -> CreateNoteForm)
	 * 									Or
	 * false : (CreateNoteForm -> CreateNote)
	 */
	const _changeIsOnCreateNoteForm = useCallback((value) => {
		setIsOnCreateNoteForm(value);
	}, []);
	/**
	 * ~~~~ About Selection ~~~~
	 *	- _addSelectedNotedId : add A selected NoteID To SelectedNoteIds
	 *	- _deleteSelectedNoteId : delete A selected NoteID from SelectedNoteIds
	 *	- _resetSelectedNoteIds : reset SelectedNoteIds
	 *	- _deleteSelectedNoteIds : delete selected IDs from SelectedNoteIds
	 */
	const _addSelectedNoteId = useCallback((id) => {
		setSelectedNoteIds((ids) => [...ids, id]);
	}, []);

	const _deleteSelectedNoteId = useCallback(
		(id) => {
			const newSelectedNoteIds = _selectedNoteIds.filter(
				(noteId) => noteId !== id
			);
			setSelectedNoteIds(newSelectedNoteIds);
		},
		[_selectedNoteIds]
	);

	const _resetSelectedNoteIds = useCallback(() => {
		setSelectedNoteIds([]);
	}, []);

	/* 
	const _deleteSelectedNoteIds = useCallback((inputIds) => {
		let tempIds = _selectedNoteIds;

		tempIds = inputIds.reduce((acc, inputId)=>{
			return acc.filter((id)=> id !== inputId)
		},tempIds)

			setSelectedNoteIds(tempIds);
	}, [_selectedNoteIds]); 
	*/

	/*
	 * ~~~~ About Detail Note (ON/OFF) ~~~~
	 * - _setDetailNote : Add a specific Note to _detailNote (Global State) when user click the specific SummaryNote.
	 * 									After that, DetailNot Component is rendered
	 * - _resetDetailNote : Reset _detailNote state
	 * - _updateChecklistOfDetailNote : Update A specific ChecklistBlock of _detailNote state
	 */
	const _setDetailNote = useCallback((note) => {
		setDetailNote(note);
	}, []);

	const _resetDetailNote = useCallback(() => {
		setDetailNote({});
	}, []);

	const _updateChecklistOfDetailNote = useCallback(
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
	 * ~~~~ About "_allNotes" state ~~~~
	 * - _addNote : Add a specific Note to "_allNotes" state
	 * - _deleteNote : Delete a specific Note from "_allNotes" state
	 * - _deleteNotes : Delete specific Notes (selected Notes) from "_allNotes" state
	 * - _updateNote : Update a specific Note of "_allNotes" state
	 * - _updateChecklistOfNote : Update a specific ChecklistBlock of a specific Note (so, need noteId and block)
	 */
	const _addNote = useCallback(
		(note) => {
			_allNotes.unshift(note);
			setAllNotes([..._allNotes]);
		},
		[_allNotes]
	);

	const _deleteNote = useCallback(
		(id) => {
			const newAllNotes = _allNotes.filter((note) => note.id !== id);
			setAllNotes(newAllNotes);
		},
		[_allNotes]
	);

	const _deleteNotes = useCallback(
		(inputIds) => {
			let tempAllNotes = _allNotes;
			for (let i = 0; i < inputIds.length; i++) {
				for (let j = 0; j < tempAllNotes.length; j++) {
					if (inputIds[i] === tempAllNotes[j].id) {
						tempAllNotes.splice(j, 1);
						break;
					}
				}
			}
			setAllNotes([...tempAllNotes]);
		},
		[_allNotes]
	); // reduce 방식과 비교했을 때 작은 숫자의 경우 큰 차이는 없으나, 10만 단위 이상시 차이가 발생했습니다.

	/* 
	const _deleteNotesReduce = useCallback(
		(inputIds) => {
			const tempAllNotes = inputIds.reduce((acc, inputId) => {
				return acc.filter((note) => note.id !== inputId);
			}, _allNotes);

			setAllNotes(tempAllNotes);
		},
		[_allNotes]
	); 
	*/

	const _updateNote = useCallback(
		(newNote) => {
			const newAllNotes = _allNotes.filter((note) => note.id !== newNote.id);
			newAllNotes.unshift(newNote);
			setAllNotes(newAllNotes);
			setDetailNote({});
		},
		[_allNotes]
	);

	const _updateChecklistOfNote = useCallback((noteId, targetBlock) => {
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
		_allNotes,
		_isOnCreateNoteForm,
		_selectedNoteIds,
		_detailNote,
	};
	const combineActions = {
		_addNote,
		_changeIsOnCreateNoteForm,
		_deleteNote,
		_deleteNotes,
		_addSelectedNoteId,
		_deleteSelectedNoteId,
		_resetSelectedNoteIds,
		_setDetailNote,
		_resetDetailNote,
		_updateNote,
		_updateChecklistOfNote,
		_updateChecklistOfDetailNote,
	};

	return { ...combineStates, ...combineActions };
};

export default useNote;
