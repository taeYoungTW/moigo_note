const CtrlBtn = ({ Icon }) => {
	return (
		<button className="ctrl_btn">
			<Icon sx={{ fontSize: 17, cursor: 'pointer' }} className="ctrlBtn_icon" />
		</button>
	);
};

export default CtrlBtn;
