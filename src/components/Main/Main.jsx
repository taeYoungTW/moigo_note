import { useAppAction } from '../../contexts/AppStateContext';
import CreateNote from '../CreateNote/CreateNote';
import ReadAllNotes from '../ReadAllNotes/ReadAllNotes';
import './Main.scss';
const Main = () => {
	const { changeIsOnCreateNote } = useAppAction();

	// SummaryNote 또는 외부 영역 클릭시, CreateNoteForm -> CreateNote 상태로 변경되게 함 (이벤트 버블링 사용)
	return (
		<main
			onClick={() => {
				changeIsOnCreateNote(false);
			}}
		>
			<CreateNote />
			<ReadAllNotes />
		</main>
	);
};

export default Main;
