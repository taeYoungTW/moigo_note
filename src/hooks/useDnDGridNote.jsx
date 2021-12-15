import { useCallback, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ItemTypes } from '../constants/constants';

const useDnDGridNote = (index, note, useAppAction) => {
	const { _allNotes, _setNotes } = useAppAction();
	const noteRef = useRef(null);

	const moveNote = useCallback(
		(dragIndex, hoverIndex) => {
			const newNotes = [..._allNotes];
			const [draggedNote] = newNotes.splice(dragIndex, 1);
			newNotes.splice(hoverIndex, 0, draggedNote);
			_setNotes(newNotes);
		},
		[_allNotes, _setNotes]
	);

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
		item: () => ({ dragIndex: index, note }),
		collect: (monitor) => {
			return {
				isDragging: monitor.isDragging(),
			};
		},
	});

	preview(getEmptyImage());

	return { dndRef: drag(drop(noteRef)), isDragging };
};

export default useDnDGridNote;
