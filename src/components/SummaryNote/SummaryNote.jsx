import './SummaryNote.scss';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import PortalConfirm from '../Common/PortalConfirm';
import {
	DO_YOU_WANT_TO_DELETE_SLECTED_NOTES_TEXT,
	SUMMARY_NOTE_DELETE_ICON_FONT_SIZE,
} from '../../constants/constants';
import ReadContent from '../ReadContent/ReadContent';
import SelectNote from '../SelectNote/SelectNote';
import DeleteNoteBtn from '../Common/DeleteBtn';
import useSearch from '../../hooks/useSearch';

const SummaryNote = ({ note, isDragging }) => {
	// Global States & Actions --------------
	const { _deleteSelectedNoteId, _setModalNote, _deleteNote } = useAppAction();
	const { _selectedNoteIds, _searchInput } = useAppState();

	// Hook --------------------------------------
	const isDisplay = useSearch(_searchInput, note);

	// Local States --------------------------
	const [isConfirmOn, setIsConfirmOn] = useState(false);

	// Event Handler ----------------------------------------------
	const handleDeleteBtnOnClick = useCallback((e) => {
		e.stopPropagation();
		setIsConfirmOn(true);
	}, []);

	const handleDeleteConfirmBtnOnClick = () => {
		const id = note.id;
		setIsConfirmOn(false);
		_deleteNote(id);
		const isSelected = _selectedNoteIds.includes(id);
		if (isSelected) {
			_deleteSelectedNoteId(id);
		}
	};

	// Render -------------------------------------------
	return isDisplay ? (
		<article
			className="summary_note"
			onClick={() => {
				_setModalNote(note);
			}}
			style={{ opacity: isDragging ? 0 : 1 }}
		>
			<div className="summary_area">
				{note.title && <h1 className="summary_title">{note.title}</h1>}
				<ReadContent note={note} isDetailNote={false} />
			</div>
			<div className="ctrl_area">
				<DeleteNoteBtn
					className="del_summary_note_btn"
					handleDeleteBtnOnClick={handleDeleteBtnOnClick}
					fontSize={SUMMARY_NOTE_DELETE_ICON_FONT_SIZE}
				/>
				<SelectNote noteId={note.id} />
			</div>
			<PortalConfirm
				question={DO_YOU_WANT_TO_DELETE_SLECTED_NOTES_TEXT}
				isConfirmOn={isConfirmOn}
				setIsConfirmOn={setIsConfirmOn}
				confirmCallback={handleDeleteConfirmBtnOnClick}
			/>
		</article>
	) : (
		<></>
	);
};

SummaryNote.propTypes = {
	note: PropTypes.object,
};

export default SummaryNote;
