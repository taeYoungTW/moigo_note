import PropTypes from 'prop-types';
import './Confirm.scss';

/* 
Confirm On/Off 의 경우, 
특정 Action을 위한 값이 필요한 경우도 있기 때문에
String 또는 Boolean 이 들어올 수 있도록 했습니다.
*/

const Confirm = ({
	children,
	question,
	offConfirmBtnName,
	isConfirmOn,
	setIsConfirmOn,
}) => {
	return (
		isConfirmOn && (
			<div
				className="confirm_ctnr"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<div className="confirm">
					<h1 className="question">{question}</h1>
					<div className="btns">
						<button
							type="button"
							onClick={() => {
								setIsConfirmOn('');
							}}
						>
							{offConfirmBtnName}
						</button>
						{children}
					</div>
				</div>
			</div>
		)
	);
};

Confirm.propTypes = {
	question: PropTypes.string.isRequired,
	offConfirmBtnName: PropTypes.string.isRequired,
	children: PropTypes.element,
	isConfirmOn: PropTypes.oneOfType([
		PropTypes.string.isRequired,
		PropTypes.bool.isRequired,
	]),
	setIsConfirmOn: PropTypes.func.isRequired,
};

export default Confirm;
