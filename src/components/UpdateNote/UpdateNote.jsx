import CloseIcon from '@mui/icons-material/Close';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import styles from './UpdateNote.scss';
import { useCallback, useEffect, useState } from 'react';
import { COMPLETE_TEXT, TITLE_TEXT } from '../../constants/constants';
import { emptyTextBlockFilter } from '../../utils/emptyTextBlockFilter';
import CreateBlocks from '../CreateBlocks/CreateBlocks';
import { MODAL_NOTE_CLOSE_ICON_STYLE } from '../../constants/iconStyles';
import CreateCtrlBar from '../CreateCtrlBar/CreateCtrlBar';

const UpdateNote = ({ note, setIsModalOn }) => {
	// Global States, Actions ---------------------------------------
	const { _blocks } = useAppState();
	const { _updateNote, _initBlocks, _resetBlocks } = useAppAction();

	// Local States ------------------------------------------------
	const [updateNote, setUpdateNote] = useState(note);

	// Event Handler ----------------------------------------------
	const handleUpdateNoteBtnOnClick = useCallback(() => {
		const filteredBlocks = emptyTextBlockFilter(_blocks);
		_updateNote({ ...updateNote, blocks: [...filteredBlocks] });
		setIsModalOn(false);
	}, [_updateNote, updateNote, _blocks, setIsModalOn]);

	const handleTitleInputOnChange = useCallback((e) => {
		const { value } = e.target;
		setUpdateNote((note) => ({ ...note, title: value }));
	}, []);

	const handleCloseBtnOnClick = useCallback(() => {
		setIsModalOn(false);
	}, [setIsModalOn]);

	// useEffects ------------------------------------------------------

	useEffect(() => {
		_initBlocks([...note.blocks]);
		return () => {
			_resetBlocks();
		};
	}, [note, _initBlocks, _resetBlocks]);

	return (
		<>
			<div className={styles.updateNote}>
				<div className={styles.titleBox}>
					<input
						type="text"
						className={styles.titleInput}
						value={updateNote.title}
						placeholder={TITLE_TEXT}
						onChange={handleTitleInputOnChange}
					/>
					<button className={styles.closeBtn} onClick={handleCloseBtnOnClick}>
						<CloseIcon sx={MODAL_NOTE_CLOSE_ICON_STYLE} />
					</button>
				</div>
				<CreateBlocks />
				<CreateCtrlBar
					handleSubmitBtnOnClick={handleUpdateNoteBtnOnClick}
					submitBtnName={COMPLETE_TEXT}
				/>
			</div>
		</>
	);
};

export default UpdateNote;
