import { useState } from 'react';
import UpdateNote from '../UpdateNote/UpdateNote';
import DetailNote from '../DetailNote/DetailNote';
import './ModalNote.scss';

const ModalNote = () => {
	// Local States ------------------------------------------------
	const [isEdit, setIsEdit] = useState(false);

	// Render -------------------------------------------------------
	return (
		<div className="modal_note">
			{isEdit ? <UpdateNote /> : <DetailNote setIsEdit={setIsEdit} />}
		</div>
	);
};

export default ModalNote;
