import React from 'react';
import { useDragLayer } from 'react-dnd';
import { ItemTypes } from '../../constants/constants';
import SummaryNote from '../SummaryNote/SummaryNote';
import './DragNoteLayer.scss';

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

	return (
		<div
			className="drag-layer-area"
			style={{
				position: 'fixed',
				pointerEvents: 'none',
				left: 0,
				top: 0,
				width: '100%',
				height: '100%',
				zIndex: 100,
			}}
			/* style에 주지 않고 SCSS로 지정하는 경우, zIndex 문제가 발생 함 */
		>
			{renderItem()}
		</div>
	);
};

export default DragNoteLayer;
