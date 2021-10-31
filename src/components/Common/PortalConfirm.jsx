import ReactDOM from 'react-dom';
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
	};

	const confirmLocation = document.querySelector('#confirm_root');

	return ReactDOM.createPortal(
		isConfirmOn ? (
			<div
				className="confirm_ctnr"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<div className="confirm">
					<h1 className="question">{question}</h1>
					<div className="btns">
						<button type="button" onClick={handleCancelBtnOnClick}>
							취소
						</button>
						<button type="button" onClick={handleConfirmBtnOnClick}>
							확인
						</button>
					</div>
				</div>
			</div>
		) : (
			<></>
		),
		confirmLocation
	);
};

export default PortalConfirm;
