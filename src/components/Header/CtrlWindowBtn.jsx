import PropTypes from 'prop-types';
import { CTRL_HEADER_BTN_FONT_SIZE } from '../../constants/constants';

const CtrlWindowBtn = ({ Icon }) => {
	// Render ---------------------------------
	return (
		<button className="ctrl_window_btn">
			<Icon
				sx={{ fontSize: CTRL_HEADER_BTN_FONT_SIZE, cursor: 'pointer' }}
				className="ctrl_window_btn_icon"
			/>
		</button>
	);
};

// PropTypes ---------------------------------
CtrlWindowBtn.propTypes = {
	Icon: PropTypes.elementType,
};

export default CtrlWindowBtn;
