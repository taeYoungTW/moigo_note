import styles from './ReadTextBlock.scss';
import PropTypes from 'prop-types';

const ReadTextBlock = ({ block }) => {
	// Render -------------------------------------------------------
	return <div className={styles.readTextBlock}>{block.text}</div>;
};

// PropTypes ------------------------------------------------------
ReadTextBlock.propTypes = {
	block: PropTypes.object,
};

export default ReadTextBlock;
