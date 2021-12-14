import ReactDOM from 'react-dom';
import { CANCEL_TEXT, CONFIRM_TEXT } from '../../constants/constants';
import styles from './PortalConfirm.scss';

const PortalConfirm = ({
	question,
	isConfirmOn,
	setIsConfirmOn,
	confirmCallback,
}) => {
	// Event Handler -----------------------
	const handleCancelBtnClick = () => {
		setIsConfirmOn(false);
	};

	const handleConfirmBtnClick = () => {
		confirmCallback();
		setIsConfirmOn(false);
	};

	const confirmRoot = document.querySelector('#confirm-root');

	return ReactDOM.createPortal(
		isConfirmOn ? (
			<div
				className={styles.confirmContainer}
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				<div className={styles.confirm}>
					<h1 className={styles.question}>{question}</h1>
					<div className={styles.btns}>
						<button type={styles.button} onClick={handleCancelBtnClick}>
							{CANCEL_TEXT}
						</button>
						<button type={styles.button} onClick={handleConfirmBtnClick}>
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
