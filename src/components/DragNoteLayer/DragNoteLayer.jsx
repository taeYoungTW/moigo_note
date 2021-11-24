import React from 'react';
import { useDragLayer } from 'react-dnd';
import { createPortal } from 'react-dom';
import { ItemTypes } from '../../constants/constants';
import SummaryNote from '../SummaryNote/SummaryNote';
// import './DragNoteLayer.scss';

const DragNoteLayer = () => {
	const { itemType, item, currentOffset, isDragging } = useDragLayer(
		(monitor) => ({
			item: monitor.getItem(),
			itemType: monitor.getItemType(),
			isDragging: monitor.isDragging(),
			currentOffset: monitor.getSourceClientOffset(),
		})
	);

	const renderItem = () => {
		switch (itemType) {
			case ItemTypes.NOTE:
				return (
					<div
						className="summary-note-drag-layer"
						style={{
							transform: `${isDragging && 'scale(1.05)'} translate(${
								currentOffset?.x
							}px, ${currentOffset?.y}px)`,
						}}
					>
						<SummaryNote note={item.note} />
					</div>
				);
			default:
				return null;
		}
	};

	const dragLayoutRoot = document.querySelector('#drag-layout-root');

	return createPortal(renderItem(), dragLayoutRoot);
};

export default DragNoteLayer;
