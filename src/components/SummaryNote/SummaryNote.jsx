import './SummaryNote.scss';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import PropTypes from 'prop-types';
import useSearch from '../../hooks/useSearch';
import SummaryNoteContent from '../SummaryNoteContent/SummaryNoteContent';
import SummaryNoteCtrl from '../SummaryNoteCtrl/SummaryNoteCtrl';
import { forwardRef } from 'react';

const SummaryNote = forwardRef(({ note, isDragging }, dndRef) => {
	// Global States & Actions --------------
	const { _setModalNote } = useAppAction();
	const { _searchInput } = useAppState();

	// Hook --------------------------------------
	const isDisplay = useSearch(_searchInput, note);

	// Render -------------------------------------------
	return (
		<article
			className="summary_note"
			onClick={() => {
				_setModalNote(note);
			}}
			style={{ opacity: isDragging ? 0 : 1, display: isDisplay ? '' : 'none' }}
			ref={dndRef}
		>
			<SummaryNoteContent note={note} />
			<SummaryNoteCtrl note={note} />
		</article>
	);
});

SummaryNote.propTypes = {
	note: PropTypes.object,
};

export default SummaryNote;
