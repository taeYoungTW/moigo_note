import { useCallback } from 'react';
import { BlockTypes, INVALID_BLOCK_TYPE_TEXT } from '../../constants/constants';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import useDnDListBlock from '../../hooks/useDnDListBlock';
import useError from '../../hooks/useError';
import BlockCtrlBtns from '../BlockCtrlBtns/BlockCtrlBtns';
import CreateChecklistBlock from '../CreateChecklistBlock/CreateChecklistBlock';
import CreateImgBlock from '../CreateImgBlock/CreateImgBlock';
import CreateTextBlock from '../CreateTextBlock/CreateTextBlock';
import styles from './CreateBlock.scss';

const CreateBlock = ({ block, index }) => {
	// Global States & Actions ---------------------------------------
	const { _blocks } = useAppState();
	const { _initBlocks } = useAppAction();

	// Functions ---------------------------------------
	const moveBlock = useCallback(
		(dragIndex, hoverIndex) => {
			const newBlocks = [..._blocks];
			const [draggedBlock] = newBlocks.splice(dragIndex, 1);
			newBlocks.splice(hoverIndex, 0, draggedBlock);
			_initBlocks(newBlocks);
		},
		[_blocks, _initBlocks]
	);

	const blockRouter = (BlockType) => {
		switch (BlockType) {
			case BlockTypes.TEXT:
				return <CreateTextBlock block={block} blockIndex={index} />;
			case BlockTypes.CHECKLIST:
				return <CreateChecklistBlock block={block} blockIndex={index} />;
			case BlockTypes.IMAGE:
				return <CreateImgBlock block={block} blockIndex={index} />;
			default:
				_setUseError({
					message: INVALID_BLOCK_TYPE_TEXT,
					location: 'CreateBlock',
				});
				return <></>;
		}
	};

	/* Hooks ---------------------------- */
	const _setUseError = useError();

	const { dropRef, dragRef, isDragging } = useDnDListBlock(
		index,
		block,
		moveBlock
	);

	// render ----------------------------
	return (
		<div
			className={styles.createBlock}
			ref={dropRef}
			style={{
				opacity: isDragging ? 0 : 1,
			}}
		>
			{blockRouter(block.type)}
			<BlockCtrlBtns blockId={block.id} ref={dragRef} />
		</div>
	);
};

export default CreateBlock;
