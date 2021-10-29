import PropTypes from 'prop-types';

const CtrlBtn = ({ Icon }) => {
	// Render ---------------------------------
	return (
		<button className="ctrl_btn">
			<Icon sx={{ fontSize: 17, cursor: 'pointer' }} className="ctrlBtn_icon" />
		</button>
	);
};

// PropTypes ---------------------------------
CtrlBtn.propTypes = {
	Icon: PropTypes.elementType,
};

export default CtrlBtn;
