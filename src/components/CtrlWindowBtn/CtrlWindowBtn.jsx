import PropTypes from 'prop-types';
import { CTRL_WINDOW_BTN_ICON_STYLE } from '../../constants/iconStyles';
import './CtrlWindowBtn.scss';

const CtrlWindowBtn = ({ Icon }) => {
	// Render ---------------------------------
	return (
		<button className="ctrl-window-btn">
			<Icon sx={CTRL_WINDOW_BTN_ICON_STYLE} className="ctrl-window-btn-icon" />
		</button>
	);
};

// PropTypes ---------------------------------
CtrlWindowBtn.propTypes = {
	Icon: PropTypes.elementType,
};

export default CtrlWindowBtn;
