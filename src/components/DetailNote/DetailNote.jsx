import './DetailNote.scss';
import CloseIcon from '@mui/icons-material/Close';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import { useCallback, useState } from 'react';
import {
	DO_YOU_WANT_TO_DELETE_SELECTED_NOTES_TEXT,
	EDIT_TEXT,
} from '../../constants/constants';
import ReadContent from '../ReadContent/ReadContent';
import DeleteBtn from '../Common/DeleteBtn';
import {
	DETAIL_NOTE_DELETE_ICON_STYLE,
	MODAL_NOTE_CLOSE_ICON_STYLE,
} from '../../constants/iconStyles';
import PortalConfirm from '../PortalConfirm/PortalConfirm';

const DetailNote = ({ setIsEdit }) => {
	// Global States, Actions ---------------------------------------
	const { _modalNote } = useAppState();
	const { _resetModalNote, _deleteNote, _setIsCreateNoteFormOn } =
		useAppAction();

	// Hooks ---------------------------------

	// Local States ------------------------------------------------
	const [isConfirmOn, setIsConfrimOn] = useState(false);
	// Event Handler ----------------------------------------------
	const handleDeleteBtnOnClick = useCallback(() => {
		setIsConfrimOn(true);
	}, []);

	const handleSetEditBtnOnClick = useCallback(() => {
		setIsEdit(true);
		_setIsCreateNoteFormOn(false); // _blocks를 같이 쓰기 때문에, 수정시 CreateNoteForm을 닫아 연동하여 표시될 _blocks를 막습니다.
	}, [setIsEdit, _setIsCreateNoteFormOn]);

	const confirmCallback = () => {
		const id = _modalNote.id;
		_deleteNote(id);
		_resetModalNote();
	};

	// Render -------------------------------------------------------
	return (
		<>
			<div className="detail_note">
				<div className="title_container">
					<h1 className="title">{_modalNote.title}</h1>
					<button className="close_btn" onClick={_resetModalNote}>
						<CloseIcon sx={MODAL_NOTE_CLOSE_ICON_STYLE} />
					</button>
				</div>
				<ReadContent
					blocks={_modalNote.blocks}
					noteId={_modalNote.id}
					isDetailNote={true}
				/>
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
				setIsConfirmOn={setIsConfrimOn}
				confirmCallback={confirmCallback}
			/>
		</>
	);
};

export default DetailNote;
