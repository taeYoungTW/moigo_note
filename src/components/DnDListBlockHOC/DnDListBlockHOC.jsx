import React, { useCallback, useRef, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';

import {
	BLOCK_TYPE,
	CTRL_BLOCK_ICON_FONT_SIZE,
} from '../../constants/constants';
import MenuIcon from '@mui/icons-material/Menu';

const DnDListBlockHOC = ({ id, index, Component, ComponentProp }) => {
	// Global States & Actions
	const { _blocks } = useAppState();
	const { _initBlocks } = useAppAction();

	// Ref
	const dropRef = useRef(null);

	// Local States
	const [isMe, setIsMe] = useState(false);
	const [isBottomDragIndex, setIsBottomDragIndex] = useState(false);

	const moveBlock = useCallback(
		(dragIndex, hoverIndex) => {
			const newBlocks = [..._blocks];
			const [dragedBlock] = newBlocks.splice(dragIndex, 1);
			newBlocks.splice(hoverIndex, 0, dragedBlock);
			_initBlocks(newBlocks);
		},
		[_blocks, _initBlocks]
	);

	const [{ isOver }, drop] = useDrop({
		accept: BLOCK_TYPE,
		collect: (monitor) => {
			return { isOver: monitor.isOver() };
		},
		hover(dragItem, monitor) {
			const { dragIndex } = dragItem;
			setIsMe(false);
			setIsBottomDragIndex(false);

			if (!dropRef.current || dragIndex === index) {
				setIsMe(true);
				return;
			}

			if (dragIndex > index) {
				setIsBottomDragIndex(true);
			}
		},
		drop(dragItem, monitor) {
			const { dragIndex } = dragItem;

			moveBlock(dragIndex, index);
			dragItem.dragIndex = index;
		},
	});

	const [, drag, preview] = useDrag({
		type: BLOCK_TYPE,
		item: () => ({ dragId: id, dragIndex: index }),
		collect: (monitor) => {
			return {
				isDragging: monitor.isDragging(),
			};
		},
	});

	return (
		<div ref={drop(dropRef)}>
			<div
				className="block_location_indicator"
				style={{
					height: '10px',
					backgroundColor: 'rgba(0, 122, 204, 0.8)',
					opacity: 0.5,
					display: isOver && !isMe && isBottomDragIndex ? '' : 'none',
				}}
			></div>
			<div ref={preview}>
				<Component {...ComponentProp}>
					<button type="button" ref={drag}>
						<MenuIcon sx={{ fontSize: CTRL_BLOCK_ICON_FONT_SIZE }} />
					</button>
				</Component>
			</div>
			<div
				className="block_location_indicator"
				style={{
					height: '10px',
					backgroundColor: 'rgba(0, 122, 204, 0.8)',
					opacity: 0.5,
					display: isOver && !isMe && !isBottomDragIndex ? '' : 'none',
				}}
			></div>
		</div>
	);
};

export default DnDListBlockHOC;
