import './SummaryNoteThumbnail.scss';

const SummaryNoteThumbnail = ({ thumbnail }) => {
	return (
		<div className="summary-note-thumbnail-container">
			<img
				className="summary-note-thumbnail"
				src={thumbnail.block.dataUrl}
				alt="summary-note-thumbnail"
			/>
			<div
				className="summary-note-img-count"
				style={{
					display: thumbnail.count < 2 ? 'none' : '',
				}}
			>
				{`${thumbnail.count - 1}+`}
			</div>
		</div>
	);
};

export default SummaryNoteThumbnail;
