import './SummaryNote.scss';
import { useAppState } from '../../contexts/AppStateContext';
import PropTypes from 'prop-types';
import useSearch from '../../hooks/useSearch';
import SummaryNoteContent from '../SummaryNoteContent/SummaryNoteContent';
import SummaryNoteCtrl from '../SummaryNoteCtrl/SummaryNoteCtrl';
import { forwardRef, useState } from 'react';
import ModalNote from '../ModalNote/ModalNote';

const SummaryNote = forwardRef(({ note, isDragging }, dndRef) => {
	// Global States & Actions --------------
	const { _searchInput } = useAppState();

	// Hook --------------------------------------
	const isDisplay = useSearch(_searchInput, note);

	// Local State
	const [isModalOn, setIsModalOn] = useState(false);

	// Render -------------------------------------------
	return (
		<article
			className="summary-note"
			onClick={() => {
				setIsModalOn(true);
			}}
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
});

SummaryNote.propTypes = {
	note: PropTypes.object,
};

export default SummaryNote;
