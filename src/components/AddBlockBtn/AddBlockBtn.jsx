import './AddBlockBtn.scss';
import PropTypes from 'prop-types';
import { ADD_BLOCK_BTN_ICON_STYLE } from '../../constants/iconStyles';

const AddBlockBtn = ({ Icon, eventHandler }) => {
	return (
		<div className="add_btn_icon_container">
			<Icon sx={ADD_BLOCK_BTN_ICON_STYLE} onClick={eventHandler} />
		</div>
	);
};

AddBlockBtn.propTypes = {
	Icon: PropTypes.elementType,
	/*
	 * - elementType
	 * 식별자 명으로 prop 전달 O
	 * jsx 스타일 컴포넌트 표기법으로 prop 전달 X
	 * - element : elementType 반대
	 */
	eventHandler: PropTypes.func,
};

export default AddBlockBtn;
