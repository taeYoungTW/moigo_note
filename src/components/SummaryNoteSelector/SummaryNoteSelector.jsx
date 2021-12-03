import { useCallback, useEffect, useState } from 'react';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { SUMMARY_NOTE_CHECK_CIRCLE_ICON_STYLE } from '../../constants/iconStyles';
import hoverStyles from '../SummaryNote/SummaryNote.scss';

const SummaryNoteSelector = ({ noteId }) => {
	const { _selectedNoteIds } = useAppState();
	const { _addSelectedNoteId, _deleteSelectedNoteId } = useAppAction();

	const [isSelected, setIsSelected] = useState(
		_selectedNoteIds.includes(noteId)
	);

	const handleSelectBtnOnClick = useCallback(() => {
		setIsSelected(true);
		_addSelectedNoteId(noteId);
	}, [_addSelectedNoteId, noteId]);

	const handleUnselectBtnOnClick = useCallback(() => {
		setIsSelected(false);
		_deleteSelectedNoteId(noteId);
	}, [_deleteSelectedNoteId, noteId]);

	useEffect(() => {
		const newIsSelected = _selectedNoteIds.includes(noteId);
		if (newIsSelected !== isSelected) {
			setIsSelected(newIsSelected);
		}
	}, [_selectedNoteIds, noteId, isSelected]);

	return (
		<div
			className="summary-note-selector"
			onClick={(e) => {
				e.stopPropagation();
			}}
		>
			{isSelected ? (
				<>
					<button
						className={hoverStyles.unselectBtn}
						onClick={handleUnselectBtnOnClick}
					>
						<CheckCircleIcon sx={SUMMARY_NOTE_CHECK_CIRCLE_ICON_STYLE} />
					</button>
					<div className={hoverStyles.selectedOutline}></div>
					{/*
					 * outline을 border로 하지 않은 이유
					 * - border를 두껍게 하는 경우 content box가 작아져서 내용 표시가 변화됩니다.
					 * - select 되었을 경우 해당 요소를 클릭해도 detailNote가 떠서는 안됩니다.
					 * - 요소를 앞에 두어 막음으로서 css 만으로 제어할 수 있습니다.
					 */}
				</>
			) : (
				<button
					className={hoverStyles.selectBtn}
					onClick={handleSelectBtnOnClick}
				>
					<CheckCircleOutlineIcon sx={SUMMARY_NOTE_CHECK_CIRCLE_ICON_STYLE} />
				</button>
			)}
		</div>
	);
};

export default SummaryNoteSelector;
