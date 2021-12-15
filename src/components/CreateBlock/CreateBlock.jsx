import { BlockTypes, INVALID_BLOCK_TYPE_TEXT } from '../../constants/constants';
import { useAppAction } from '../../contexts/AppStateContext';
import useDnDImgFile from '../../hooks/useDnDImgFile';
import useDnDListBlock from '../../hooks/useDnDListBlock';
import useError from '../../hooks/useError';
import BlockCtrlBtns from '../BlockCtrlBtns/BlockCtrlBtns';
import CreateChecklistBlock from '../CreateChecklistBlock/CreateChecklistBlock';
import CreateImgBlock from '../CreateImgBlock/CreateImgBlock';
import CreateTextBlock from '../CreateTextBlock/CreateTextBlock';
import styles from './CreateBlock.scss';

const CreateBlock = ({ block, index }) => {
	/* ---- Hooks ---------------------------- */
	const setError = useError();

	const { dropRef, dragRef, isDragging } = useDnDListBlock(
		index,
		block,
		useAppAction
	);

	const fileDropRef = useDnDImgFile(index, useAppAction);

	/* ---- Functions --------------------------------------- */
	const blockRouter = (BlockType) => {
		switch (BlockType) {
			case BlockTypes.TEXT:
				return <CreateTextBlock block={block} blockIndex={index} />;
			case BlockTypes.CHECKLIST:
				return <CreateChecklistBlock block={block} blockIndex={index} />;
			case BlockTypes.IMAGE:
				return <CreateImgBlock block={block} blockIndex={index} />;
			default:
				setError({
					message: INVALID_BLOCK_TYPE_TEXT,
					location: 'CreateBlock',
				});
				return <></>;
		}
	};

	/* ---- Render ---------------------------- */
	return (
		<div
			className={styles.createBlock}
			ref={fileDropRef(dropRef)}
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
