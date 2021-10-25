import './AddBtn.scss';
import PropTypes from 'prop-types';

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

AddBtn.PropTyes = {
	Icon: PropTypes.element,
	// eventHandler: PropTypes.func.isRequired,
};

export default AddBtn;
