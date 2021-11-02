import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import './NotesHeader.scss';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import { useCallback, useState } from 'react';
import PortalConfirm from '../Common/PortalConfirm';
import {
	COUNT_OF_SELECTED_NOTE_TEXT,
	DO_YOU_WANT_TO_DELETE_SLECTED_NOTES_TEXT,
	HEADER_ARROWBACK_ICON_COLOR,
	HEADER_ARROWBACK_ICON_FONT_SIZE,
	HEADER_DELETE_ICON_COLOR,
	HEADER_DELETE_ICON_FONT_SIZE,
} from '../../constants/constants';
import DeleteNoteBtn from '../Common/DeleteBtn';

const NotesHeader = () => {
	// Global States, Actions ---------------------------------------
	const { _selectedNoteIds } = useAppState();
	const { _deleteNotes, _resetSelectedNoteIds } = useAppAction();

	// Local States ------------------------------------------------
	const [isConfirmOn, setIsConfirmOn] = useState(false);

	// Event Handler ----------------------------------------------
	const handleDeleteConfirmBtnOnClick = useCallback(() => {
		_deleteNotes(_selectedNoteIds);
		_resetSelectedNoteIds();
		setIsConfirmOn(false);
	}, [_selectedNoteIds, _deleteNotes, _resetSelectedNoteIds]);

	const handleDeleteBtnOnClick = useCallback(() => {
		setIsConfirmOn(true);
	}, []);

	// Render ------------------------------------------------------
	return (
		<>
			<div className="align_left">
				<button className="cancel_btn" onClick={_resetSelectedNoteIds}>
					<ArrowBackIcon
						sx={{
							fontSize: HEADER_ARROWBACK_ICON_FONT_SIZE,
							color: HEADER_ARROWBACK_ICON_COLOR,
						}}
					/>
				</button>
				<h2 className="selected_note_count">
					{_selectedNoteIds.length}
					{COUNT_OF_SELECTED_NOTE_TEXT}
				</h2>
			</div>
			<DeleteNoteBtn
				className="delete_btn"
				handleDeleteBtnOnClick={handleDeleteBtnOnClick}
				fontSize={HEADER_DELETE_ICON_FONT_SIZE}
				color={HEADER_DELETE_ICON_COLOR}
			/>
			<PortalConfirm
				question={DO_YOU_WANT_TO_DELETE_SLECTED_NOTES_TEXT}
				isConfirmOn={isConfirmOn}
				setIsConfirmOn={setIsConfirmOn}
				confirmCallback={handleDeleteConfirmBtnOnClick}
			/>
		</>
	);
};

export default NotesHeader;
