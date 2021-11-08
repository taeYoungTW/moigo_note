import React, { useCallback, useRef } from 'react';
import { useDrop } from 'react-dnd';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';

import { BLOCK_TYPE } from '../../constants/constants';
import MoveBlockBtn from '../Common/MoveBlockBtn';

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

			const { y: dropY, height: dropHeight } =
				dropRef.current.getBoundingClientRect();
			const { y: dragCursorY } = monitor.getClientOffset();

			if (dragIndex > index) {
				if (dropHeight > 45) {
					if (dragCursorY < dropY + 45) {
						moveBlock(dragIndex, index);
						dragItem.dragIndex = index;
						return;
					}
					return;
				}
			}
			moveBlock(dragIndex, index);
			dragItem.dragIndex = index;
		},
	});

	return (
		<div ref={drop(dropRef)}>
			<Component {...ComponentProp}>
				<MoveBlockBtn index={index} id={id} />
			</Component>
		</div>
	);
};

export default DnDListBlockHOC;
