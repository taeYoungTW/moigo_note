import React from 'react';
import { BlockTypes, INVALID_BLOCK_TYPE_TEXT } from '../../constants/constants';
import useError from '../../hooks/useError';
import ReadChecklistBlock from '../ReadChecklistBlock/ReadChecklistBlock';
import ReadImgBlock from '../ReadImgBlock/ReadImgBlock';
import ReadTextBlock from '../ReadTextBlock/ReadTextBlock';
import styles from './ReadBlock.scss';

const ReadBlock = ({ block, noteId, isSummaryNote, blockIndex }) => {
	const setError = useError();

	const blockRouter = (blockType) => {
		switch (blockType) {
			case BlockTypes.TEXT:
				return <ReadTextBlock block={block} key={block.id} />;
			case BlockTypes.CHECKLIST:
				return (
					<ReadChecklistBlock
						block={block}
						key={block.id}
						noteId={noteId}
						blockIndex={blockIndex}
					/>
				);
			case BlockTypes.IMAGE:
				if (isSummaryNote) {
					return <></>;
				}
				return <ReadImgBlock block={block} key={block.id} />;
			default:
				setError({
					message: INVALID_BLOCK_TYPE_TEXT,
					location: 'DetailNote/ReadBlock/DetailBlockRouter',
				});
				return <></>;
		}
	};

	return <div className={styles.readBlock}>{blockRouter(block.type)}</div>;
};

export default ReadBlock;
