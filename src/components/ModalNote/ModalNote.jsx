import { useState } from 'react';
import UpdateNote from '../UpdateNote/UpdateNote';
import DetailNote from '../DetailNote/DetailNote';
import styles from './ModalNote.scss';
import ReactDOM from 'react-dom';

const ModalNote = ({ note, setIsModalOn }) => {
	// Local States ------------------------------------------------
	const [isEdit, setIsEdit] = useState(false);
	const modalRoot = document.querySelector('#modal-root');

	// Render -------------------------------------------------------
	return ReactDOM.createPortal(
		<div
			className={styles.modalNote}
			onClick={(e) => {
				e.stopPropagation();
			}}
		>
			{isEdit ? (
				<UpdateNote note={note} setIsModalOn={setIsModalOn} />
			) : (
				<DetailNote
					note={note}
					setIsEdit={setIsEdit}
					setIsModalOn={setIsModalOn}
				/>
			)}
		</div>,
		modalRoot
	);
};

export default ModalNote;
