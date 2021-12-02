import { useEffect, useState } from 'react';
import styles from './SummaryNoteThumbnail.scss';

const SummaryNoteThumbnail = ({ blocks }) => {
	// Local States -----------------------------------------------
	const [thumbnail, setThumbnail] = useState({ dataUrl: '', count: 0 });

	// Function -----------------------------------------------
	const splitImgBlocks = (blocks) => {
		let count = 0;
		let firstImg = {};

		for (let i = 0; i < blocks.length; i++) {
			if (blocks[i].type === 'image') {
				if (count === 0) {
					firstImg = blocks[i].dataUrl;
				}
				count += 1;
			}
		}

		setThumbnail({ dataUrl: firstImg, count });
	};

	// useEffect --------------------------------
	useEffect(() => {
		splitImgBlocks(blocks);
	}, [blocks]);

	return (
		thumbnail.count !== 0 && (
			<div className={styles.container}>
				<img
					className={styles.thumbnail}
					src={thumbnail.dataUrl}
					alt="summary-note-thumbnail"
				/>
				<div
					className={styles.imgCount}
					style={{
						display: thumbnail.count < 2 ? 'none' : '',
					}}
				>
					{`${thumbnail.count - 1}+`}
				</div>
			</div>
		)
	);
};

export default SummaryNoteThumbnail;
