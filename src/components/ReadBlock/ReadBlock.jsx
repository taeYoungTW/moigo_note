import React from 'react';
import { INVALID_BLOCK_TYPE_TEXT } from '../../constants/constants';
import useError from '../../hooks/useError';
import ReadChecklistBlock from '../ReadChecklistBlock/ReadChecklistBlock';
import ReadImgBlock from '../ReadImgBlock/ReadImgBlock';
import ReadTextBlock from '../ReadTextBlock/ReadTextBlock';
import styles from './ReadBlock.scss';

const ReadBlock = ({ block, noteId, isSummaryNote, blockIndex }) => {
	const _setUseError = useError();

	const blockRouter = (blockType) => {
		switch (blockType) {
			case 'text':
				return <ReadTextBlock block={block} key={block.id} />;
			case 'checklist':
				return (
					<ReadChecklistBlock
						block={block}
						key={block.id}
						noteId={noteId}
						blockIndex={blockIndex}
					/>
				);
			case 'image':
				if (isSummaryNote) {
					return <></>;
				}
				return <ReadImgBlock block={block} key={block.id} />;
			default:
				_setUseError({
					message: INVALID_BLOCK_TYPE_TEXT,
					location: 'DetailNote/ReadBlock/DetailBlockRouter',
				});
				return <></>;
		}
	};

	return <div className={styles.readBlock}>{blockRouter(block.type)}</div>;
};

export default ReadBlock;
