import './ReadBlocks.scss';
import PropTypes from 'prop-types';

const ReadTextBlock = ({ block, isDetailNote }) => {
	// Render -------------------------------------------------------
	return <div className="read_text_block">{block.text}</div>;
};

// PropTypes ------------------------------------------------------
ReadTextBlock.propTypes = {
	block: PropTypes.object,
	isDetail: PropTypes.bool,
};

export default ReadTextBlock;
