import './AddBtn.scss';
import PropTypes from 'prop-types';
import {
	ADD_BTN_ICON_COLOR,
	ADD_BTN_ICON_FONT_SIZE,
} from '../../constants/constants';

const AddBtn = ({ Icon, eventHandler, isImgBtn }) => {
	/*
	 * isImgBtn의 경우, AddBtn을 InputImage에서 template로 활용하기 위해서 사용되었습다.
	 * - ImgInput의 label에 button의 onClick의 버블링이 감지 되지 않기 때문입니다.
	 * - html에서는 label 안에 button을 넣는 것을 하지 말라고 권장하고 있습니다. (MDN)
	 */
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
	isImgBtn: PropTypes.bool,
};

export default AddBtn;
