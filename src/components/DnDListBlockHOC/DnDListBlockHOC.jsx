import React, { useCallback, useRef } from 'react';
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

	const moveBlock = useCallback(
		(dragIndex, hoverIndex) => {
			const newBlocks = [..._blocks];
			const [dragedBlock] = newBlocks.splice(dragIndex, 1);
			newBlocks.splice(hoverIndex, 0, dragedBlock);
			_initBlocks(newBlocks);
		},
		[_blocks, _initBlocks]
	);

	const [, drop] = useDrop({
		accept: BLOCK_TYPE,
		hover(dragItem, monitor) {
			const { dragIndex } = dragItem;
			if (!dropRef.current || dragIndex === index) {
				return;
			}

			const {
				top: dropTop,
				bottom: dropBottom,
				height: dropHeight,
			} = dropRef.current.getBoundingClientRect();
			const { y: dragCursorY } = monitor.getClientOffset();

			if (dragIndex > index) {
				if (dropHeight > 10) {
					if (dragCursorY < dropTop + 10) {
						moveBlock(dragIndex, index);
						dragItem.dragIndex = index;
						return;
					}
					return;
				}
			}

			if (dragIndex < index) {
				if (dropHeight > 10) {
					if (dragCursorY > dropBottom - 10) {
						moveBlock(dragIndex, index);
						dragItem.dragIndex = index;
						return;
					}
					return;
				}
			}

			// moveBlock(dragIndex, index);
			// dragItem.dragIndex = index;
		},
	});

	const [{ isDragging }, drag, preview] = useDrag({
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
					backgroundColor: '#f8613b',
					opacity: 0.5,
					display: isDragging ? '' : 'none',
				}}
			></div>
			<div style={{ display: isDragging ? 'none' : '' }} ref={preview}>
				<Component {...ComponentProp}>
					<button type="button" ref={drag}>
						<MenuIcon sx={{ fontSize: CTRL_BLOCK_ICON_FONT_SIZE }} />
					</button>
				</Component>
			</div>
		</div>
	);
};

export default DnDListBlockHOC;
