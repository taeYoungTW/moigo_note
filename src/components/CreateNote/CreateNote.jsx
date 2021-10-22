import './CreateNote.scss';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddBtn from '../Common/AddBtn';
import CreateNoteForm from './CreateNoteForm';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';

const CreateNote = () => {
	const { isOnCreateNote } = useAppState();
	const { changeIsOnCreateNote } = useAppAction();
	function handleAdd(e) {
		e.preventDefault();
		changeIsOnCreateNote(true);
	}
	return (
		<section className="create_note">
			{isOnCreateNote ? (
				<CreateNoteForm />
			) : (
				<div
					className="create_note_ctnr"
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					<button className="add_text_btn" onClick={handleAdd}>
						노트 작성...
					</button>
					<AddBtn Icon={InsertPhotoIcon} eventHandler={handleAdd} />
					<AddBtn Icon={FormatListBulletedIcon} eventHandler={handleAdd} />
				</div>
			)}
		</section>
	);
};

export default CreateNote;
