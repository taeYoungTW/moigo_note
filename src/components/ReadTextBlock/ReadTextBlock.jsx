import './ReadTextBlock.scss';
import PropTypes from 'prop-types';

const ReadTextBlock = ({ block }) => {
	// Render -------------------------------------------------------
	return <div className="read_text_block">{block.text}</div>;
};

// PropTypes ------------------------------------------------------
ReadTextBlock.propTypes = {
	block: PropTypes.object,
};

export default ReadTextBlock;
