import './CreateNote.scss';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useAppAction } from '../../contexts/AppStateContext';
import { WRITE_NOTE_TEXT } from '../../constants/constants';
import AddBlockBtn from '../AddBlockBtn/AddBlockBtn';
import ImgInput from '../ImgInput/ImgInput';

const CreateNote = () => {
	// Global States & Actions --------------------------
	const { _setIsCreateNoteFormOn, _addTypeBlock } = useAppAction();

	// Event Handler --------------------------

	const handleAddBlockBtnOnClick = (type, dataUrl) => {
		_addTypeBlock(type, dataUrl);
		_setIsCreateNoteFormOn(true);
	};

	// Render -----------------------
	return (
		<div className="create-note">
			<button
				className="add-text-btn"
				onClick={() => {
					handleAddBlockBtnOnClick('text');
				}}
			>
				{WRITE_NOTE_TEXT}
			</button>
			<ImgInput
				callback={(dataUrl) => {
					handleAddBlockBtnOnClick('image', dataUrl);
				}}
			>
				<AddBlockBtn Icon={InsertPhotoIcon} />
			</ImgInput>
			<AddBlockBtn
				Icon={FormatListBulletedIcon}
				eventHandler={() => {
					handleAddBlockBtnOnClick('checklist');
				}}
			/>
		</div>
	);
};

export default CreateNote;
