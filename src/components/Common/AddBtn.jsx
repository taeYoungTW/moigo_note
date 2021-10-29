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

AddBtn.propTypes = {
	Icon: PropTypes.elementType,
	/*
	 * - elementType
	 * 식별자 명으로 prop 전달 O
	 * jsx 스타일 컴포넌트 표기법으로 prop 전달 X
	 * - element : elementType 반대
	 */
	eventHandler: PropTypes.func,
};

export default AddBtn;
