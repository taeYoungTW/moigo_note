import CloseIcon from '@mui/icons-material/Close';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import AddBtn from '../Common/AddBtn';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import './UpdateNote.scss';
import { useState } from 'react';
const UpdateNote = () => {
	const { detailNote } = useAppState();
	const { offDetailNote, updateNote } = useAppAction();

	const [note, setNote] = useState(detailNote);
	function updateNoteSubmit(e) {
		e.preventDefault();
		updateNote(note);
	}
	return (
		<div className="update_note_ctnr">
			<div className="update_note">
				<div className="title">
					<input
						type="text"
						className="title_input"
						value={note.title}
						onChange={(e) => {
							const { value } = e.target;
							setNote((note) => ({ ...note, title: value }));
						}}
					/>
					<button className="close_btn" onClick={offDetailNote}>
						<CloseIcon sx={{ fontSize: 25, color: '#767676' }} />
					</button>
				</div>
				<div className="content">Area for Block</div>
				<div className="ctrl_bar">
					<div className="add_btns">
						<AddBtn Icon={InsertPhotoIcon} />
						<AddBtn Icon={FormatListBulletedIcon} />
						<AddBtn Icon={TextFieldsIcon} />
					</div>
					<button
						type="button"
						onClick={updateNoteSubmit}
						className="update_submit_btn"
					>
						완료
					</button>
				</div>
			</div>
		</div>
	);
};

export default UpdateNote;
