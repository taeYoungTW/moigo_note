import React, { useCallback } from 'react';
import { useDrop } from 'react-dnd';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';

import { BLOCK_TYPE } from '../../constants/constants';
import MoveBlockBtn from '../Common/MoveBlockBtn';

const DnDListBlockHOC = ({ id, index, Component, ComponentProp }) => {
	const { _blocks } = useAppState();
	const { _initBlocks } = useAppAction();

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

			if (dragIndex === index) {
				return;
			}

			moveBlock(dragIndex, index);
			dragItem.dragIndex = index;
		},
	});
	return (
		<div ref={drop}>
			<Component {...ComponentProp}>
				<MoveBlockBtn index={index} id={id} />
			</Component>
		</div>
	);
};

export default DnDListBlockHOC;
