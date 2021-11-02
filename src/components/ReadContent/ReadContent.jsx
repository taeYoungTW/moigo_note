import React from 'react';
import { INVALID_BLOCK_TYPE_TEXT } from '../../constants/constants';
import useError from '../../hooks/useError';
import ReadChecklistBlock from '../ReadBlocks/ReadChecklistBlock';
import ReadTextBlock from '../ReadBlocks/ReadTextBlock';

const ReadContent = ({ note, isDetailNote }) => {
	const _setUseError = useError();
	return (
		<div className={`${isDetailNote ? 'detailNote_' : ''}content`}>
			{note?.blocks?.map((block) => {
				switch (block.type) {
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
								noteId={note.id}
								isDetailNote={isDetailNote}
							/>
						);
					default:
						_setUseError({
							message: INVALID_BLOCK_TYPE_TEXT,
							location: 'SummaryNote/summary_area_el/switch',
						});
						return <></>;
				}
			})}
		</div>
	);
};

export default ReadContent;
