import PropTypes from 'prop-types';
import { CTRL_WINDOW_BTN_ICON_STYLE } from '../../constants/iconStyles';

const CtrlWindowBtn = ({ Icon }) => {
	// Render ---------------------------------
	return (
		<button className="ctrl_window_btn">
			<Icon sx={CTRL_WINDOW_BTN_ICON_STYLE} className="ctrl_window_btn_icon" />
		</button>
	);
};

// PropTypes ---------------------------------
CtrlWindowBtn.propTypes = {
	Icon: PropTypes.elementType,
};

export default CtrlWindowBtn;
