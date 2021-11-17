import ReadBlock from '../ReadBlocks/ReadBlock';

const ReadContent = ({ noteId, blocks, isDetailNote }) => {
	return (
		<div className={`${isDetailNote ? 'detailNote_' : ''}content`}>
			{blocks.map((block) => (
				<ReadBlock
					key={block.id}
					block={block}
					noteId={noteId}
					isDetailNote={isDetailNote}
				/>
			))}
		</div>
	);
};

export default ReadContent;
