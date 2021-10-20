import './CreateNote.scss';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AddBtn from '../Common/AddBtn';
import { useState } from 'react';
import CreateNoteForm from '../CreateNoteForm/CreateNoteForm';

const CreateNote = () => {
	const [isfocus, setIsfocus] = useState(false);
	function handleAdd(e) {
		e.preventDefault();
		setIsfocus(true);
	}
	return (
		<section className="create_note">
			{isfocus ? (
				<CreateNoteForm />
			) : (
				<div className="create_note_ctnr">
					<button className="add_text_btn" onClick={handleAdd}>
						노트 작성...
					</button>
					<AddBtn Icon={InsertPhotoIcon} onClick={handleAdd} />
					<AddBtn Icon={FormatListBulletedIcon} onClick={handleAdd} />
				</div>
			)}
		</section>
	);
};

export default CreateNote;
