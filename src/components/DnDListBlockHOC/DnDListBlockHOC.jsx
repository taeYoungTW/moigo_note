import React, { useCallback, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import { ItemTypes } from '../../constants/constants';
import BlockCtrlBtns from '../BlockCtrlBtns/BlockCtrlBtns';
import { getEmptyImage } from 'react-dnd-html5-backend';

const DnDListBlockHOC = ({ block, blockIndex, Component, ComponentProp }) => {
	// Global States & Actions
	const { _blocks } = useAppState();
	const { _initBlocks } = useAppAction();

	const currentRef = useRef(null);

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
	const [, drop] = useDrop({
		accept: ItemTypes.BLOCK,
		collect: (monitor) => {
			return { isOver: monitor.isOver() };
		},
		hover(dragItem, monitor) {
			const { dragIndex, blockHeight } = dragItem;

			if (dragIndex === blockIndex) {
				return;
			}

			if (!currentRef.current) {
				return;
			}

			const hoverBoundingRect = currentRef.current?.getBoundingClientRect();

			const { bottom: dropBottom } = hoverBoundingRect;
			const cursorClientY = monitor.getClientOffset().y;

			// 위에서 아래로 이동하는 경우
			if (dragIndex < blockIndex) {
				if (cursorClientY < dropBottom - blockHeight) {
					return;
				}
			}

			moveBlock(dragIndex, blockIndex);
			dragItem.dragIndex = blockIndex;
		},
	});

	const [{ isDragging }, drag, preview] = useDrag({
		type: ItemTypes.BLOCK,
		item: () => ({
			dragIndex: blockIndex,
			block,
			blockHeight: currentRef?.current?.clientHeight,
		}),
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	preview(getEmptyImage());
	return (
		<Component
			{...ComponentProp}
			isDragging={isDragging}
			ref={drop(currentRef)}
		>
			<BlockCtrlBtns blockId={ComponentProp.block.id} ref={drag} />
		</Component>
	);
};

export default DnDListBlockHOC;
