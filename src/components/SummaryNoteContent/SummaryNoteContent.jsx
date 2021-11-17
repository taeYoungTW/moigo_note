import React, { useEffect, useState } from 'react';
import ReadContent from '../ReadContent/ReadContent';
import SummaryNoteThumbnail from '../SummaryNoteImages/SummaryNoteThumbnail';

const SummaryNoteContent = ({ note }) => {
	// Local States -----------------------------------------------
	const [thumbnail, setThumbnail] = useState({ block: {}, count: 0 });
	const [restBlocks, setRestBlocks] = useState([]);

	// Function -----------------------------------------------
	const splitImgBlocks = (blocks) => {
		let count = 0;
		let firstImg = {};

		const restBlocks = blocks.filter((block) => {
			if (block.type === 'image') {
				if (count === 0) {
					firstImg = block;
				}
				count += 1;
				return false;
			} else {
				return true;
			}
		});

		setThumbnail({ block: firstImg, count });
		setRestBlocks(restBlocks);
	};

	// useEffect --------------------------------
	useEffect(() => {
		splitImgBlocks(note.blocks);
	}, [note]);

	return (
		<div className="summary_area">
			{thumbnail.count !== 0 && <SummaryNoteThumbnail thumbnail={thumbnail} />}
			<div className="summary_area_content">
				{note.title && <h1 className="summary_title">{note.title}</h1>}
				<ReadContent
					blocks={restBlocks}
					noteId={note.id}
					isDetailNote={false}
				/>
			</div>
		</div>
	);
};

export default SummaryNoteContent;
