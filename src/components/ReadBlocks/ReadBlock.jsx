import React from 'react';
import { INVALID_BLOCK_TYPE_TEXT } from '../../constants/constants';
import useError from '../../hooks/useError';
import ReadChecklistBlock from './ReadChecklistBlock';
import ReadImgBlock from './ReadImgBlock';
import ReadTextBlock from './ReadTextBlock';

const ReadBlock = ({ block, noteId, isDetailNote }) => {
	const _setUseError = useError();

	const blockRouter = (blockType) => {
		switch (blockType) {
			case 'text':
				return (
					<ReadTextBlock
						block={block}
						key={block.id}
						isDetailNote={isDetailNote}
					/>
				);
			case 'checklist':
				return (
					<ReadChecklistBlock
						block={block}
						key={block.id}
						noteId={noteId}
						isDetailNote={isDetailNote}
					/>
				);
			case 'image':
				return (
					<ReadImgBlock
						block={block}
						key={block.id}
						isDetailNote={isDetailNote}
					/>
				);
			default:
				_setUseError({
					message: INVALID_BLOCK_TYPE_TEXT,
					location: 'DetailNote/ReadBlock/DetailBlockRouter',
				});
				return <></>;
		}
	};

	return (
		<div className={`read_block ${isDetailNote ? 'detail' : ''}`}>
			{blockRouter(block.type)}
		</div>
	);
};

export default ReadBlock;
