import ReadBlock from '../ReadBlock/ReadBlock';

const ReadBlocks = ({ noteId, blocks, isSummaryNote, className }) => {
	return (
		<div className={className}>
			{blocks.map((block, blockIndex) => (
				<ReadBlock
					key={block.id}
					block={block}
					noteId={noteId}
					blockIndex={blockIndex}
					isSummaryNote={isSummaryNote}
				/>
			))}
		</div>
	);
};

export default ReadBlocks;
