import styles from './SummaryNote.scss';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import PropTypes from 'prop-types';
import useSearch from '../../hooks/useSearch';
import SummaryNoteContent from '../SummaryNoteContent/SummaryNoteContent';
import SummaryNoteCtrl from '../SummaryNoteCtrl/SummaryNoteCtrl';
import { useCallback, useState } from 'react';
import ModalNote from '../ModalNote/ModalNote';
import useDnDGridNote from '../../hooks/useDnDGridNote';

const SummaryNote = ({ note, index }) => {
	// Global States & Actions --------------
	const { _searchInput, _allNotes } = useAppState();
	const { _setNotes } = useAppAction();

	// Function for useDnDGridNote ----------------------
	const moveNote = useCallback(
		(dragIndex, hoverIndex) => {
			const newNotes = [..._allNotes];
			const [draggedNote] = newNotes.splice(dragIndex, 1);
			newNotes.splice(hoverIndex, 0, draggedNote);
			_setNotes(newNotes);
		},
		[_allNotes, _setNotes]
	);

	// Hook --------------------------------------
	const isDisplay = useSearch(_searchInput, note);
	const { dndRef, isDragging } = useDnDGridNote(index, note, moveNote);

	// Local State
	const [isModalOn, setIsModalOn] = useState(false);

	/* ---- Event Handler ------------------------------ */

	const handleSummaryNoteClick = () => {
		setIsModalOn(true);
	};

	// Render -------------------------------------------
	return (
		<article
			className={styles.summaryNote}
			onClick={handleSummaryNoteClick}
			style={{ opacity: isDragging ? 0 : 1, display: isDisplay ? '' : 'none' }}
			ref={dndRef}
		>
			<SummaryNoteContent note={note} />
			<SummaryNoteCtrl note={note} />
			{isModalOn ? (
				<ModalNote note={note} setIsModalOn={setIsModalOn} />
			) : (
				<></>
			)}
		</article>
	);
};

SummaryNote.propTypes = {
	note: PropTypes.object,
};

export default SummaryNote;
