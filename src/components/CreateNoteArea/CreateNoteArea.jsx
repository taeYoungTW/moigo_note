import { useAppState } from '../../contexts/AppStateContext';
import CreateNote from '../CreateNote/CreateNote';
import CreateNoteForm from '../CreateNoteForm/CreateNoteForm';
import './CreateNoteArea.scss';

const CreateNoteArea = () => {
	// Global States & Actions --------------------------
	const { _isOnCreateNoteForm } = useAppState();

	// Render -----------------------
	return (
		<section className="create_note_area">
			<div
				className="stopPropagation_el"
				onClick={(e) => {
					e.stopPropagation();
				}}
			>
				{_isOnCreateNoteForm ? <CreateNoteForm /> : <CreateNote />}
			</div>
		</section>
	);
};

export default CreateNoteArea;
