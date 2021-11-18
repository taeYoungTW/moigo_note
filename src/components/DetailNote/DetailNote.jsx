import './DetailNote.scss';
import CloseIcon from '@mui/icons-material/Close';
import { useAppAction } from '../../contexts/AppStateContext';
import { useCallback, useState } from 'react';
import {
	DO_YOU_WANT_TO_DELETE_SELECTED_NOTES_TEXT,
	EDIT_TEXT,
} from '../../constants/constants';
import ReadBlocks from '../ReadBlocks/ReadBlocks';
import DeleteBtn from '../DeleteBtn/DeleteBtn';
import {
	DETAIL_NOTE_DELETE_ICON_STYLE,
	MODAL_NOTE_CLOSE_ICON_STYLE,
} from '../../constants/iconStyles';
import PortalConfirm from '../PortalConfirm/PortalConfirm';

const DetailNote = ({ setIsEdit, note, setIsModalOn }) => {
	// Global States, Actions ---------------------------------------
	const { _deleteNote, _setIsCreateNoteFormOn } = useAppAction();

	// Hooks ---------------------------------

	// Local States ------------------------------------------------
	const [isConfirmOn, setIsConfirmOn] = useState(false);

	// Event Handler ----------------------------------------------
	const handleDeleteBtnOnClick = useCallback(() => {
		setIsConfirmOn(true);
	}, []);

	const handleSetEditBtnOnClick = useCallback(() => {
		setIsEdit(true);
		_setIsCreateNoteFormOn(false); // _blocks를 같이 쓰기 때문에, 수정시 CreateNoteForm을 닫아 연동하여 표시될 _blocks를 막습니다.
	}, [setIsEdit, _setIsCreateNoteFormOn]);

	const handleCloseBtnOnClick = useCallback(() => {
		setIsModalOn(false);
	}, [setIsModalOn]);

	const confirmCallback = () => {
		const noteId = note.id;
		_deleteNote(noteId);
	};

	// Render -------------------------------------------------------
	return (
		<>
			<div className="detail_note">
				<div className="title_container">
					<h1 className="title">{note.title}</h1>
					<button className="close_btn" onClick={handleCloseBtnOnClick}>
						<CloseIcon sx={MODAL_NOTE_CLOSE_ICON_STYLE} />
					</button>
				</div>
				<ReadBlocks blocks={note.blocks} noteId={note.id} isDetailNote={true} />
				<div className="ctrl_bar">
					<DeleteBtn
						className="delete_btn"
						handleDeleteBtnOnClick={handleDeleteBtnOnClick}
						style={DETAIL_NOTE_DELETE_ICON_STYLE}
					/>
					<button
						type="button"
						onClick={handleSetEditBtnOnClick}
						className="edit_btn"
					>
						{EDIT_TEXT}
					</button>
				</div>
			</div>
			<PortalConfirm
				question={DO_YOU_WANT_TO_DELETE_SELECTED_NOTES_TEXT}
				isConfirmOn={isConfirmOn}
				setIsConfirmOn={setIsConfirmOn}
				confirmCallback={confirmCallback}
			/>
		</>
	);
};

export default DetailNote;
