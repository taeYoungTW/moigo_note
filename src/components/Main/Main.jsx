import { useCallback } from 'react';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import CreateNote from '../CreateNote/CreateNote';
import ReadAllNotes from '../ReadAllNotes/ReadAllNotes';
import './Main.scss';
const Main = () => {
	// Global States, Actions ---------------------------------------
	const { _changeIsOnCreateNoteForm } = useAppAction();
	const { _blocks } = useAppState();

	// Event Handler ----------------------------------------------
	/* - handleMainOnClick
	 * SummaryNote 또는 외부 영역 클릭시,
	 * CreateNoteForm -> CreateNote 상태로 변경되게 합니다.
	 * (이벤트 버블링 사용하여 CreateNoteForm Component Off)
	 * 조건: 블록의 개수가 1개 이면서, 해당 블럭의 text 또는 content의 내용이 없는 경우
	 */
	const handleMainOnClick = useCallback(() => {
		const firstBlock = _blocks[0];
		if (
			_blocks.length === 1 &&
			(firstBlock.text === '' || firstBlock.content === '')
		) {
			_changeIsOnCreateNoteForm(false);
		}
	}, [_blocks, _changeIsOnCreateNoteForm]);

	// Render -----------------------------------------------------
	return (
		<main onClick={handleMainOnClick}>
			<CreateNote />
			<ReadAllNotes />
			<div id="confirm_root"></div>
		</main>
	);
};

export default Main;
