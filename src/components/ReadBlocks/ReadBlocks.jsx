import ReadBlock from '../ReadBlock/ReadBlock';
import './ReadBlocks.scss';

const ReadBlocks = ({ noteId, blocks, isSummaryNote }) => {
	return (
		<div className="read-blocks">
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
