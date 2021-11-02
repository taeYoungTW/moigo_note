import './CreateNote.scss';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddBtn from '../Common/AddBtn';
import { useAppAction } from '../../contexts/AppStateContext';
import { WRITE_NOTE_TEXT } from '../../constants/constants';
import useAddBlock from '../../hooks/useAddBlock';

const CreateNote = () => {
	// Global States & Actions --------------------------
	const { _changeIsOnCreateNoteForm, _addBlock } = useAppAction();

	// Event Handler --------------------------
	// hook을 사용한 Event Handler
	const handleAddBlockBtnOnClick = useAddBlock(_addBlock, () => {
		_changeIsOnCreateNoteForm(true);
	});

	// Render -----------------------
	return (
		<div className="create_note">
			<button
				className="add_text_btn"
				onClick={() => {
					handleAddBlockBtnOnClick('text');
				}}
			>
				{WRITE_NOTE_TEXT}
			</button>
			<AddBtn
				Icon={InsertPhotoIcon}
				eventHandler={() => {
					handleAddBlockBtnOnClick('image');
				}}
			/>
			<AddBtn
				Icon={FormatListBulletedIcon}
				eventHandler={() => {
					handleAddBlockBtnOnClick('checklist');
				}}
			/>
		</div>
	);
};

export default CreateNote;
