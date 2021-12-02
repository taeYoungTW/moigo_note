import PropTypes from 'prop-types';
import { CTRL_WINDOW_BTN_ICON_STYLE } from '../../constants/iconStyles';
import styles from './CtrlWindowBtn.scss';

const CtrlWindowBtn = ({ Icon }) => {
	// Render ---------------------------------
	return (
		<button className={styles.ctrlWindowBtn}>
			<Icon
				sx={CTRL_WINDOW_BTN_ICON_STYLE}
				className={styles.ctrlWindowBtnIcon}
			/>
		</button>
	);
};

// PropTypes ---------------------------------
CtrlWindowBtn.propTypes = {
	Icon: PropTypes.elementType,
};

export default CtrlWindowBtn;
