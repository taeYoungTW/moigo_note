import React, { useEffect, useState } from 'react';
import ReadBlocks from '../ReadBlocks/ReadBlocks';
import SummaryNoteThumbnail from '../SummaryNoteThumbnail/SummaryNoteThumbnail';
import './SummaryNoteContent.scss';

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
		<div className="summary-note-content">
			{thumbnail.count !== 0 && <SummaryNoteThumbnail thumbnail={thumbnail} />}
			<div className="summary-note-title-blocks">
				{note.title && <h1 className="summary-note-title">{note.title}</h1>}
				<ReadBlocks blocks={note.blocks} noteId={note.id} isSummaryNote />
			</div>
		</div>
	);
};

export default SummaryNoteContent;
