import ReadBlocks from '../ReadBlocks/ReadBlocks';
import SummaryNoteThumbnail from '../SummaryNoteThumbnail/SummaryNoteThumbnail';
import styles from './SummaryNoteContent.scss';
import readBlocksStyles from '../ReadBlocks/ReadBlocks.scss';
const SummaryNoteContent = ({ note }) => {
	return (
		<div className={styles.container}>
			<SummaryNoteThumbnail blocks={note.blocks} />
			<div className={styles.titleBox}>
				{note.title && <h1 className={styles.title}>{note.title}</h1>}
				<ReadBlocks
					blocks={note.blocks}
					noteId={note.id}
					isSummaryNote
					className={readBlocksStyles.summaryNote}
				/>
			</div>
		</div>
	);
};

export default SummaryNoteContent;
