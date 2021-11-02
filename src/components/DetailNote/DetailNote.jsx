import './DetailNote.scss';
import CloseIcon from '@mui/icons-material/Close';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import { useCallback, useState } from 'react';
import PortalConfirm from '../Common/PortalConfirm';
import {
	DETAIL_NOTE_DELETE_ICON_COLOR,
	DETAIL_NOTE_DELETE_ICON_FONT_SIZE,
	DO_YOU_WANT_TO_DELETE_SLECTED_NOTES_TEXT,
	EDIT_TEXT,
	MODAL_NOTE_CLOSE_ICON_COLOR,
	MODAL_NOTE_CLOSE_ICON_FONT_SIZE,
} from '../../constants/constants';
import ReadContent from '../ReadContent/ReadContent';
import DeleteNoteBtn from '../Common/DeleteBtn';

const DetailNote = ({ setIsEdit }) => {
	// Global States, Actions ---------------------------------------
	const { _modalNote } = useAppState();
	const { _resetModalNote, _deleteNote } = useAppAction();

	// Hooks ---------------------------------

	// Local States ------------------------------------------------
	const [isConfirmOn, setIsConfrimOn] = useState(false);
	// Event Handler ----------------------------------------------
	const handleDeleteBtnOnClick = useCallback(() => {
		setIsConfrimOn(true);
	}, []);

	const handleSetEditBtnOnClick = useCallback(() => {
		setIsEdit(true);
	}, [setIsEdit]);

	const handleConfirmBtnOnClick = () => {
		const id = _modalNote.id;
		_deleteNote(id);
		_resetModalNote();
		setIsConfrimOn(false);
	};

	// Render -------------------------------------------------------
	return (
		<>
			<div className="detail_note">
				<div className="title_ctnr">
					<h1 className="title">{_modalNote.title}</h1>
					<button className="close_btn" onClick={_resetModalNote}>
						<CloseIcon
							sx={{
								fontSize: MODAL_NOTE_CLOSE_ICON_FONT_SIZE,
								color: MODAL_NOTE_CLOSE_ICON_COLOR,
							}}
						/>
					</button>
				</div>
				<ReadContent note={_modalNote} isDetailNote={true} />
				<div className="ctrl_bar">
					<DeleteNoteBtn
						className="delete_btn"
						handleDeleteBtnOnClick={handleDeleteBtnOnClick}
						fontSize={DETAIL_NOTE_DELETE_ICON_FONT_SIZE}
						color={DETAIL_NOTE_DELETE_ICON_COLOR}
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
				question={DO_YOU_WANT_TO_DELETE_SLECTED_NOTES_TEXT}
				isConfirmOn={isConfirmOn}
				setIsConfirmOn={setIsConfrimOn}
				confirmCallback={handleConfirmBtnOnClick}
			/>
		</>
	);
};

export default DetailNote;
