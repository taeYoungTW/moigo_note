import './ReadBlocks.scss';
import PropTypes from 'prop-types';

const ReadTextBlock = ({ block, isDetail }) => {
	// Render -------------------------------------------------------
	return (
		<div className={`read_block ${isDetail ? 'detail' : ''}`}>
			<div className="read_text_block">{block.text}</div>
		</div>
	);
};

// PropTypes ------------------------------------------------------
ReadTextBlock.propTypes = {
	block: PropTypes.object,
	isDetail: PropTypes.bool,
};

export default ReadTextBlock;
