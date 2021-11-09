import React, { useEffect, useRef, useState } from 'react';
import './SummaryNoteImages.scss';

const SummaryNoteImages = ({ noteId }) => {
	const [imgCount, setImgCount] = useState(0);

	const summaryImagesRef = useRef(null);

	useEffect(() => {
		if (summaryImagesRef.current?.children) {
			setImgCount(summaryImagesRef.current.children.length - 2);
		}
	}, [summaryImagesRef.current?.children.length]);
	return (
		<div
			className="summary_note_image_ctnr"
			id={`summary_note_images_root_${noteId}`}
			ref={summaryImagesRef}
		>
			<div
				className="summary_note_image_count"
				style={{
					display: imgCount > 0 ? '' : 'none',
				}}
			>
				{`${imgCount}+`}
			</div>
		</div>
	);
};

export default SummaryNoteImages;
