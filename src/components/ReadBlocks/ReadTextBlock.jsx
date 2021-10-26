import './ReadBlocks.scss';

const ReadTextBlock = ({ block }) => {
	return (
		<div className="read_block">
			<div className="read_text_block">{block.text}</div>
		</div>
	);
};

export default ReadTextBlock;
