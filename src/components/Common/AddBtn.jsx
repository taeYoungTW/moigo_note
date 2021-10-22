import './AddBtn.scss';

const AddBtn = ({ Icon, eventHandler }) => {
	return (
		<button className="add_btn" type="button" onClickCapture={eventHandler}>
			<Icon
				sx={{ fontSize: 22, cursor: 'pointer', color: '#2A394B' }}
				className="addBtn_icon"
			/>
		</button>
	);
};

export default AddBtn;
