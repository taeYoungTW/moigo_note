import './AddBtn.scss';

const AddBtn = ({ Icon, onClick }) => {
	return (
		<button className="add_btn" onClick={onClick}>
			<Icon
				sx={{ fontSize: 22, cursor: 'pointer', color: '#2A394B' }}
				className="addBtn_icon"
			/>
		</button>
	);
};

export default AddBtn;
