import { useCallback, useState } from 'react';

// Manage Global States & Actions
const Note = () => {
	/*
	 * ------ Init State : useState ------------------
	 */
	const [_isCreateNoteFormOn, setIsCreateNoteFormOn] = useState(false); // ex. true or false
	const [_selectedNoteIds, setSelectedNoteIds] = useState([]); // ex. [ id, id, id, ...]
	const [_allNotes, setAllNotes] = useState([]); // ex. [{title, id, blocks}, {title, id, blocks}, {title, id, blocks}, ... ]
	const [_searchInput, setSearchInput] = useState('');
	/*
	 * ------ Actions: useCallback -------------------
	 */

	/*
	 * ~~~~ About Search
	 */
	const _setSearchInput = useCallback((value) => {
		setSearchInput(value);
	}, []);
	/*
	 * ~~~~ About State of CreateNote Area ~~~~
	 * - _setIsCreateNoteFormOn : Change "isOn(focus)"
	 * true : (CreateNote -> CreateNoteForm)
	 * 									Or
	 * false : (CreateNoteForm -> CreateNote)
	 */
	const _setIsCreateNoteFormOn = useCallback((value) => {
		setIsCreateNoteFormOn(value);
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
	 * ~~~~ About "_allNotes" state ~~~~
	 * - _addNote : Add a specific Note to "_allNotes" state
	 * - _deleteNote : Delete a specific Note from "_allNotes" state
	 * - _deleteNotes : Delete specific Notes (selected Notes) from "_allNotes" state
	 * - _updateNote : Update a specific Note of "_allNotes" state
	 * - _updateChecklistOfNote : Update a specific ChecklistBlock of a specific Note (so, need noteId and block)
	 */
	const _setNotes = useCallback((newNotes) => {
		setAllNotes([...newNotes]);
	}, []);

	const _moveBlockToBottomOfNote = useCallback(
		(noteId, targetBlockIndex) => {
			_allNotes.map((note) => {
				if (note.id === noteId) {
					const newNote = { ...note };
					const [movedItem] = newNote.blocks.splice(targetBlockIndex, 1);
					newNote.blocks.push(movedItem);
					return newNote;
				}
				return note;
			});
		},
		[_allNotes]
	);

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
		_isCreateNoteFormOn,
		_selectedNoteIds,
		_searchInput,
	};
	const combineActions = {
		_addNote,
		_setIsCreateNoteFormOn,
		_deleteNote,
		_deleteNotes,
		_setNotes,
		_addSelectedNoteId,
		_deleteSelectedNoteId,
		_resetSelectedNoteIds,
		_updateNote,
		_updateChecklistOfNote,
		_setSearchInput,
		_moveBlockToBottomOfNote,
	};

	return { ...combineStates, ...combineActions };
};

export default Note;
