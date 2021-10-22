import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './NotesHeader.scss';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
const NotesHeader = () => {
	const { selectedNoteIds } = useAppState();
	const { deleteNotes, cancelSelect } = useAppAction();
	return (
		<header className="note_header">
			<div className="header_fixed">
				<div className="align_left">
					<button className="cancel_btn" onClick={cancelSelect}>
						<ArrowBackIcon sx={{ fontSize: 19, color: '#767676' }} />
					</button>
					<h2 className="selected_note_count">
						{selectedNoteIds.length}개 선택됨
					</h2>
				</div>
				<button className="delete_btn" onClick={deleteNotes}>
					<DeleteIcon sx={{ fontSize: 19, color: '#767676' }} />
				</button>
			</div>
		</header>
	);
};

export default NotesHeader;
