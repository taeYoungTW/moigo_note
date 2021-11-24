import React, { useCallback, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ItemTypes } from '../../constants/constants';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';

const DnDGridNoteHOC = ({ id, index, note, Component }) => {
	// Global States, Actions ---------------------------------------
	const { _setNotes } = useAppAction();
	const { _allNotes } = useAppState();

	// Function ----------------------
	const moveNote = useCallback(
		(dragIndex, hoverIndex) => {
			const newNotes = [..._allNotes];
			const [draggedNote] = newNotes.splice(dragIndex, 1);
			newNotes.splice(hoverIndex, 0, draggedNote);
			_setNotes(newNotes);
		},
		[_allNotes, _setNotes]
	);

	// Ref ------------------------------------------
	const noteRef = useRef(null);

	// React-dnd Hooks -------------------------------
	const [, drop] = useDrop({
		accept: ItemTypes.NOTE,
		hover(dragItem, monitor) {
			const { dragIndex } = dragItem;

			if (dragIndex === index) {
				return;
			}

			moveNote(dragIndex, index);
			dragItem.dragIndex = index;
		},
	});

	const [{ isDragging }, drag, preview] = useDrag({
		type: ItemTypes.NOTE,
		item: () => ({ dragId: id, dragIndex: index, note }),
		collect: (monitor) => {
			return {
				isDragging: monitor.isDragging(),
			};
		},
	});

	preview(getEmptyImage());

	return (
		<Component isDragging={isDragging} note={note} ref={drag(drop(noteRef))} />
	);
};

export default DnDGridNoteHOC;
