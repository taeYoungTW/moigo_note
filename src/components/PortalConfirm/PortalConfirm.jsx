import ReactDOM from 'react-dom';
import { CANCEL_TEXT, CONFIRM_TEXT } from '../../constants/constants';
import './PortalConfirm.scss';

const PortalConfirm = ({
	question,
	isConfirmOn,
	setIsConfirmOn,
	confirmCallback,
}) => {
	// Event Handler -----------------------
	const handleCancelBtnOnClick = () => {
		setIsConfirmOn(false);
	};

	const handleConfirmBtnOnClick = () => {
		confirmCallback();
		setIsConfirmOn(false);
	};

	const confirmRoot = document.querySelector('#confirm-root');

	return ReactDOM.createPortal(
		isConfirmOn ? (
			<div
				className="confirm_container"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<div className="confirm">
					<h1 className="question">{question}</h1>
					<div className="btns">
						<button type="button" onClick={handleCancelBtnOnClick}>
							{CANCEL_TEXT}
						</button>
						<button type="button" onClick={handleConfirmBtnOnClick}>
							{CONFIRM_TEXT}
						</button>
					</div>
				</div>
			</div>
		) : (
			<></>
		),
		confirmRoot
	);
};

export default PortalConfirm;
