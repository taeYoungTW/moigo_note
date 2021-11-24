import React from 'react';
import { useDragLayer } from 'react-dnd';
import { createPortal } from 'react-dom';
import { ItemTypes } from '../../constants/constants';
import BlockCtrlBtns from '../BlockCtrlBtns/BlockCtrlBtns';
import CreateBlock from '../CreateBlock/CreateBlock';

const DragBlockLayer = () => {
	const { itemType, item, currentOffset, initialOffset } = useDragLayer(
		(monitor) => ({
			item: monitor.getItem(),
			itemType: monitor.getItemType(),
			isDragging: monitor.isDragging(),
			currentOffset: monitor.getSourceClientOffset(),
			initialOffset: monitor.getInitialSourceClientOffset(),
		})
	);

	const dragLayoutRoot = document.querySelector('#drag-layout-root');

	const renderItem = () => {
		switch (itemType) {
			case ItemTypes.BLOCK:
				return (
					<div
						className="block-drag-layer"
						style={{
							width: '546px',
							transform: `translate(${initialOffset?.x - 500}px, ${
								currentOffset?.y
							}px)`,
						}}
					>
						<CreateBlock block={item.block}>
							<BlockCtrlBtns />
						</CreateBlock>
					</div>
				);
			default:
				return null;
		}
	};

	return createPortal(renderItem(), dragLayoutRoot);
};

export default DragBlockLayer;
