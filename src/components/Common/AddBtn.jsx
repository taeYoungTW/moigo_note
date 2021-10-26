import './AddBtn.scss';
import PropTypes from 'prop-types';

const AddBtn = ({ Icon, eventHandler }) => {
	return (
		<button className="add_btn" type="button" onClick={eventHandler}>
			<Icon
				sx={{ fontSize: 22, cursor: 'pointer', color: '#2A394B' }}
				className="addBtn_icon"
			/>
		</button>
	);
};

AddBtn.PropTyes = {
	Icon: PropTypes.element,
	eventHandler: PropTypes.func,
};

export default AddBtn;
