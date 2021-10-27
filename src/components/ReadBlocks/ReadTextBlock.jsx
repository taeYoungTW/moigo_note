import './ReadBlocks.scss';

const ReadTextBlock = ({ block, isDetail }) => {
	return (
		<div className={`read_block ${isDetail ? 'detail' : ''}`}>
			<div className="read_text_block">{block.text}</div>
		</div>
	);
};

export default ReadTextBlock;
