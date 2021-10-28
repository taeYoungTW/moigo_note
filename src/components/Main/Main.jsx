import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import CreateNote from '../CreateNote/CreateNote';
import ReadAllNotes from '../ReadAllNotes/ReadAllNotes';
import './Main.scss';
const Main = () => {
	const { _changeIsOnCreateNoteForm } = useAppAction();
	const { _blocks } = useAppState();

	// SummaryNote 또는 외부 영역 클릭시, CreateNoteForm -> CreateNote 상태로 변경되게 함 (이벤트 버블링 사용)
	return (
		<main
			onClick={() => {
				const firstBlock = _blocks[0];
				if (_blocks.length === 1 && !firstBlock.text) {
					_changeIsOnCreateNoteForm(false);
				}
			}}
		>
			<CreateNote />
			<ReadAllNotes />
		</main>
	);
};

export default Main;
