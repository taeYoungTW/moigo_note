import React, { useCallback, useState } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';

import { ItemTypes } from '../../constants/constants';

import './DnDListBlockHOC.scss';
import BlockCtrlBtns from '../BlockCtrlBtns/BlockCtrlBtns';

const DnDListBlockHOC = ({ blockId, blockIndex, Component, ComponentProp }) => {
	// Global States & Actions
	const { _blocks } = useAppState();
	const { _initBlocks } = useAppAction();

	// Local States
	const [isIndexSame, setIsIndexSame] = useState(false);
	const [isBottomDrag, setIsBottomDrag] = useState(false);

	// Functions
	const moveBlock = useCallback(
		(dragIndex, hoverIndex) => {
			const newBlocks = [..._blocks];
			const [draggedBlock] = newBlocks.splice(dragIndex, 1);
			newBlocks.splice(hoverIndex, 0, draggedBlock);
			_initBlocks(newBlocks);
		},
		[_blocks, _initBlocks]
	);

	// React-Dnd Hooks
	const [{ isOver }, drop] = useDrop({
		accept: ItemTypes.BLOCK,
		collect: (monitor) => {
			return { isOver: monitor.isOver() };
		},
		hover(dragItem) {
			const { dragIndex } = dragItem;
			setIsIndexSame(false);
			setIsBottomDrag(false);

			if (dragIndex === blockIndex) {
				setIsIndexSame(true);
				return;
			}

			if (dragIndex > blockIndex) {
				setIsBottomDrag(true);
			}
		},
		drop(dragItem) {
			const { dragIndex } = dragItem;

			moveBlock(dragIndex, blockIndex);
			dragItem.dragIndex = blockIndex;
		},
	});

	const [, drag, preview] = useDrag({
		type: ItemTypes.BLOCK,
		item: () => ({ dragId: blockId, dragIndex: blockIndex }),
	});

	return (
		<div ref={drop}>
			<div
				className="block-location-indicator"
				style={{
					display: isOver && !isIndexSame && isBottomDrag ? '' : 'none',
				}}
			></div>
			<div ref={preview}>
				<Component {...ComponentProp}>
					<BlockCtrlBtns blockId={ComponentProp.block.id} ref={drag} />
				</Component>
			</div>
			<div
				className="block-location-indicator"
				style={{
					display: isOver && !isIndexSame && !isBottomDrag ? '' : 'none',
				}}
			></div>
		</div>
	);
};

export default DnDListBlockHOC;
