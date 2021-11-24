import React from 'react';
import { useDragLayer } from 'react-dnd';
import { createPortal } from 'react-dom';
import { ItemTypes } from '../../constants/constants';
import { CTRL_BLOCK_ICON_STYLE } from '../../constants/iconStyles';
import CreateBlock from '../CreateBlock/CreateBlock';
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import './DragBlockLayer.scss';

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
							backgroundColor: '#f1f9fc',
							transform: `translate(${initialOffset?.x - 501}px, ${
								currentOffset?.y - item.blockHeight / 2
							}px)`,
						}}
					>
						<CreateBlock block={item.block}>
							<div className="block-drag-layer-ctrl-btns">
								<DeleteIcon sx={CTRL_BLOCK_ICON_STYLE} />
								<MenuIcon sx={CTRL_BLOCK_ICON_STYLE} />
							</div>
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
