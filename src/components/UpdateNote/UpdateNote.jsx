import CloseIcon from '@mui/icons-material/Close';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import styles from './UpdateNote.scss';
import { useCallback, useState } from 'react';
import { COMPLETE_TEXT, TITLE_TEXT } from '../../constants/constants';
import { emptyTextBlockFilter } from '../../utils/emptyTextBlockFilter';
import CreateBlocks from '../CreateBlocks/CreateBlocks';
import { MODAL_NOTE_CLOSE_ICON_STYLE } from '../../constants/iconStyles';
import CreateCtrlBar from '../CreateCtrlBar/CreateCtrlBar';

const UpdateNote = ({ note, setIsModalOn }) => {
	// Global States, Actions ---------------------------------------
	const { _blocks } = useAppState();
	const { _updateNote } = useAppAction();

	// Local States ------------------------------------------------
	const [updateNote, setUpdateNote] = useState(note);

	// Event Handler ----------------------------------------------
	const handleUpdateNoteBtnClick = useCallback(() => {
		const filteredBlocks = emptyTextBlockFilter(_blocks);
		_updateNote({ ...updateNote, blocks: [...filteredBlocks] });
		setIsModalOn(false);
	}, [_updateNote, updateNote, _blocks, setIsModalOn]);

	const handleTitleInputChange = useCallback((e) => {
		const { value } = e.target;
		setUpdateNote((note) => ({ ...note, title: value }));
	}, []);

	const handleCloseBtnClick = useCallback(() => {
		setIsModalOn(false);
	}, [setIsModalOn]);

	return (
		<>
			<div className={styles.updateNote}>
				<div className={styles.titleBox}>
					<input
						type="text"
						className={styles.titleInput}
						value={updateNote.title}
						placeholder={TITLE_TEXT}
						onChange={handleTitleInputChange}
					/>
					<button className={styles.closeBtn} onClick={handleCloseBtnClick}>
						<CloseIcon sx={MODAL_NOTE_CLOSE_ICON_STYLE} />
					</button>
				</div>
				<CreateBlocks />
				<CreateCtrlBar
					onSubmitBtnClick={handleUpdateNoteBtnClick}
					submitBtnName={COMPLETE_TEXT}
				/>
			</div>
		</>
	);
};

export default UpdateNote;
