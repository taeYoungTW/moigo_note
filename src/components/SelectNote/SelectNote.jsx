import { useCallback, useEffect, useState } from 'react';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
	SUMMARY_NOTE_CHECKCIRCLE_ICON_COLOR,
	SUMMARY_NOTE_CHECKCIRCLE_ICON_FONT_SIZE,
} from '../../constants/constants';

const SelectNote = ({ noteId }) => {
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
		setIsSelected(_selectedNoteIds.includes(noteId));
	}, [_selectedNoteIds, noteId]);

	return (
		<div
			className="select_note"
			onClick={(e) => {
				e.stopPropagation();
			}}
		>
			{isSelected ? (
				<>
					<button
						className="now_select_on_btn"
						onClick={handleUnselectBtnOnClick}
					>
						<CheckCircleIcon
							sx={{
								fontSize: SUMMARY_NOTE_CHECKCIRCLE_ICON_FONT_SIZE,
								color: SUMMARY_NOTE_CHECKCIRCLE_ICON_COLOR,
							}}
						/>
					</button>
					<div className="now_select_on_outline"></div>
					{/*
					 * outline을 border로 하지 않은 이유
					 * - border를 두껍게 하는 경우 content box가 작아져서 내용 표시가 변화됩니다.
					 * - select 되었을 경우 해당 요소를 클릭해도 detailNote가 떠서는 안됩니다.
					 * - 요소를 앞에 두어 막음으로서 css 만으로 제어할 수 있습니다.
					 */}
				</>
			) : (
				<button className="now_select_off_btn" onClick={handleSelectBtnOnClick}>
					<CheckCircleOutlineIcon
						sx={{
							fontSize: SUMMARY_NOTE_CHECKCIRCLE_ICON_FONT_SIZE,
							color: SUMMARY_NOTE_CHECKCIRCLE_ICON_COLOR,
						}}
					/>
				</button>
			)}
		</div>
	);
};

export default SelectNote;
