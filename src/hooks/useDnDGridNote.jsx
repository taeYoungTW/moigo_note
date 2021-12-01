import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ItemTypes } from '../constants/constants';

const useDnDGridNote = (index, note, moveNote) => {
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
