import './AddBtn.scss';
import PropTypes from 'prop-types';
import {
	ADD_BTN_ICON_COLOR,
	ADD_BTN_ICON_FONT_SIZE,
} from '../../constants/constants';

const AddBtn = ({ Icon, eventHandler, isImgBtn }) => {
	return isImgBtn ? (
		<Icon
			sx={{
				fontSize: ADD_BTN_ICON_FONT_SIZE,
				cursor: 'pointer',
				color: ADD_BTN_ICON_COLOR,
			}}
			className="addBtn_icon"
		/>
	) : (
		<button className="add_btn" type="button" onClick={eventHandler}>
			<Icon
				sx={{
					fontSize: ADD_BTN_ICON_FONT_SIZE,
					cursor: 'pointer',
					color: ADD_BTN_ICON_COLOR,
				}}
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
