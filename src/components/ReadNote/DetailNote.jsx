import './DetailNote.scss';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import { useState } from 'react';
import UpdateNote from '../UpdateNote/UpdateNote';
const DetailNote = () => {
	const {
		detailNote: { title, id },
	} = useAppState();
	const { offDetailNote, setConfirmNoteIdtoDelete } = useAppAction();

	const [isEdit, setIsEdit] = useState(false);

	return isEdit ? (
		<UpdateNote />
	) : (
		<div className="detail_note_ctnr">
			<div className="detail_note">
				<div className="title_ctnr">
					<h1 className="title">{title}</h1>
					<button className="close_btn" onClick={offDetailNote}>
						<CloseIcon sx={{ fontSize: 25, color: '#767676' }} />
					</button>
				</div>
				<div className="content">Area for Block</div>
				<div className="ctrl_bar">
					<button
						className="delete_btn"
						onClick={() => {
							setConfirmNoteIdtoDelete(id);
						}}
					>
						<DeleteIcon sx={{ fontSize: 23, color: '#2a394b' }} />
					</button>
					<button
						onClick={() => {
							setIsEdit(true);
						}}
						className="edit_btn"
					>
						수정
					</button>
				</div>
			</div>
		</div>
	);
};

export default DetailNote;
