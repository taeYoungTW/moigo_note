import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { NOTE_TYPE } from '../../constants/constants';

const DnDGridNoteHOC = ({ id, index, note, moveNotes, Component }) => {
	const noteRef = useRef(null);

	const [, drop] = useDrop({
		accept: NOTE_TYPE,
		hover(dragItem, monitor) {
			const { dragIndex } = dragItem;

			if (dragIndex === index) {
				return;
			}

			moveNotes(dragIndex, index);
			dragItem.dragIndex = index;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: NOTE_TYPE,
		item: () => ({ dragId: id, dragIndex: index }),
		collect: (monitor) => {
			return {
				isDragging: monitor.isDragging(),
			};
		},
	});

	return (
		<Component isDragging={isDragging} note={note} ref={drag(drop(noteRef))} />
	);
};

export default DnDGridNoteHOC;
