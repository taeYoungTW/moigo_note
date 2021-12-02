import { useCallback } from 'react';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import CreateNoteArea from '../CreateNoteArea/CreateNoteArea';
import ReadAllNotes from '../ReadAllNotes/ReadAllNotes';
import styles from './Main.scss';
const Main = () => {
	// Global States, Actions ---------------------------------------
	const { _setIsCreateNoteFormOn } = useAppAction();
	const { _isCreateNoteFormOn, _blocks } = useAppState();

	// Event Handler ----------------------------------------------

	const handleMainOnClick = useCallback(() => {
		if (!_isCreateNoteFormOn) {
			return;
		}

		const firstBlock = _blocks[0];
		if (
			_blocks.length === 1 &&
			(firstBlock.text === '' || firstBlock.content === '')
		) {
			_setIsCreateNoteFormOn(false);
		}
	}, [_blocks, _setIsCreateNoteFormOn, _isCreateNoteFormOn]);

	// Render -----------------------------------------------------
	return (
		<main className={styles.main} onClick={handleMainOnClick}>
			<CreateNoteArea />
			<ReadAllNotes />
		</main>
	);
};

export default Main;
