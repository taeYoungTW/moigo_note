import ReadBlocks from '../ReadBlocks/ReadBlocks';
import SummaryNoteThumbnail from '../SummaryNoteThumbnail/SummaryNoteThumbnail';
import './SummaryNoteContent.scss';

const SummaryNoteContent = ({ note }) => {
	return (
		<div className="summary-note-content">
			<SummaryNoteThumbnail blocks={note.blocks} />
			<div className="summary-note-title-blocks">
				{note.title && <h1 className="summary-note-title">{note.title}</h1>}
				<ReadBlocks blocks={note.blocks} noteId={note.id} isSummaryNote />
			</div>
		</div>
	);
};

export default SummaryNoteContent;
