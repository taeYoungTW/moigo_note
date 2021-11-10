import { INVALID_BLOCK_TYPE_TEXT } from '../../constants/constants';
import useError from '../../hooks/useError';
import ReadChecklistBlock from '../ReadBlocks/ReadChecklistBlock';
import ReadImgBlock from '../ReadBlocks/ReadImgBlock';
import ReadTextBlock from '../ReadBlocks/ReadTextBlock';
import React, { useEffect, useState } from 'react';
import reactDom from 'react-dom';
/* 
썸네일 이미지 컴포넌트
*/
const ReadContent = ({ note, isDetailNote }) => {
	const _setUseError = useError();

	const summaryNoteImagesRoot = document.querySelector(
		`#summary_note_images_root_${note.id}`
	);

	const [hasMounted, setHasMounted] = useState(false);
	useEffect(() => {
		setHasMounted(true);
	}, []);

	if (!hasMounted) {
		return <></>;
	}

	const blockRouter = () => {
		let isFirstImg = true;
		return note?.blocks?.map((block) => {
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
				case 'image':
					if (isDetailNote) {
						return (
							<ReadImgBlock
								block={block}
								key={block.id}
								isDetailNote={isDetailNote}
							/>
						);
					}
					if (isFirstImg) {
						isFirstImg = false;
						return reactDom.createPortal(
							<img
								src={block.dataUrl}
								alt="summary_note_img"
								className="summary_note_img"
								key={block.id}
							/>,
							summaryNoteImagesRoot
						);
					} else {
						return reactDom.createPortal(
							<img
								src={block.dataUrl}
								alt="summary_note_img"
								key={block.id}
								style={{ display: 'none' }}
							/>,
							summaryNoteImagesRoot
						);
					}
				default:
					_setUseError({
						message: INVALID_BLOCK_TYPE_TEXT,
						location: 'SummaryNote/summary_area_el/switch',
					});
					return <></>;
			}
		});
	};

	return (
		<div className={`${isDetailNote ? 'detailNote_' : ''}content`}>
			{blockRouter()}
		</div>
	);
};

export default ReadContent;
