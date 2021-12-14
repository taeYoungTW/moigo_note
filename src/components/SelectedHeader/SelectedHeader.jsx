import styles from './SelectedHeader.scss';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import {
	COUNT_OF_SELECTED_NOTE_TEXT,
	DO_YOU_WANT_TO_DELETE_SELECTED_NOTES_TEXT,
} from '../../constants/constants';
import {
	HEADER_ARROW_BACK_ICON_STYLE,
	HEADER_DELETE_ICON_STYLE,
} from '../../constants/iconStyles';
import PortalConfirm from '../PortalConfirm/PortalConfirm';
import DeleteBtn from '../DeleteBtn/DeleteBtn';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import { useCallback, useState } from 'react';

const SelectedHeader = () => {
	// Global States, Actions ---------------------------------------
	const { _selectedNoteIds } = useAppState();
	const { _deleteNotes, _resetSelectedNoteIds } = useAppAction();

	// Local States ------------------------------------------------
	const [isConfirmOn, setIsConfirmOn] = useState(false);

	// Event Handler ----------------------------------------------
	const handleDeleteBtnClick = useCallback(() => {
		setIsConfirmOn(true);
	}, []);

	const confirmCallback = useCallback(() => {
		_deleteNotes(_selectedNoteIds);
		_resetSelectedNoteIds();
	}, [_selectedNoteIds, _deleteNotes, _resetSelectedNoteIds]);

	// Render ------------------------------------------------------
	return (
		<div className={styles.selectedHeader}>
			<div className={styles.alignLeft}>
				<button className={styles.cancelBtn} onClick={_resetSelectedNoteIds}>
					<ArrowBackIcon sx={HEADER_ARROW_BACK_ICON_STYLE} />
				</button>
				<h2 className={styles.selectedNoteCount}>
					{_selectedNoteIds.length}
					{COUNT_OF_SELECTED_NOTE_TEXT}
				</h2>
			</div>
			<DeleteBtn
				className={styles.deleteBtn}
				onClick={handleDeleteBtnClick}
				style={HEADER_DELETE_ICON_STYLE}
			/>
			<PortalConfirm
				question={DO_YOU_WANT_TO_DELETE_SELECTED_NOTES_TEXT}
				isConfirmOn={isConfirmOn}
				setIsConfirmOn={setIsConfirmOn}
				confirmCallback={confirmCallback}
			/>
		</div>
	);
};

export default SelectedHeader;
