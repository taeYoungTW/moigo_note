import React from 'react';
import { useDragLayer } from 'react-dnd';
import { createPortal } from 'react-dom';
import { ItemTypes } from '../../constants/constants';
import { CTRL_BLOCK_ICON_STYLE } from '../../constants/iconStyles';
import CreateBlock from '../CreateBlock/CreateBlock';
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import styles from './DragBlockLayer.scss';

const DragBlockLayer = () => {
	// react-dnd hook ---------------------------------------------------
	const { itemType, item, currentOffset, initialOffset } = useDragLayer(
		(monitor) => ({
			item: monitor.getItem(),
			itemType: monitor.getItemType(),
			isDragging: monitor.isDragging(),
			currentOffset: monitor.getSourceClientOffset(),
			initialOffset: monitor.getInitialSourceClientOffset(),
		})
	);

	// Target DOM El for CreatePortal ---------------------------------------------------
	const dragLayoutRoot = document.querySelector('#drag-layout-root');

	// Function ---------------------------------------------------
	const renderItem = () => {
		switch (itemType) {
			case ItemTypes.BLOCK:
				return (
					<div
						className={styles.dragLayer}
						style={{
							opacity: item.blockHeight >= 200 ? 0.8 : 1,
							transform: `translate(${initialOffset?.x - 501}px, ${
								currentOffset?.y - item.blockHeight / 2 + 10
							}px)`,
						}}
					>
						<CreateBlock block={item.block} />
						<div className={styles.dragLayerCtrlBtns}>
							<DeleteIcon sx={CTRL_BLOCK_ICON_STYLE} />
							<MenuIcon sx={CTRL_BLOCK_ICON_STYLE} />
						</div>
					</div>
				);
			default:
				return null;
		}
	};

	// Render ---------------------------------------------------
	return createPortal(renderItem(), dragLayoutRoot);
};

export default DragBlockLayer;
