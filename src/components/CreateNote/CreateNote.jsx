import styles from './CreateNote.scss';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { useAppAction } from '../../contexts/AppStateContext';
import { BlockTypes, WRITE_NOTE_TEXT } from '../../constants/constants';
import AddBlockBtn from '../AddBlockBtn/AddBlockBtn';
import ImgInput from '../ImgInput/ImgInput';

const CreateNote = () => {
	// Global States & Actions --------------------------
	const { _setIsCreateNoteFormOn, _addTypeBlock } = useAppAction();

	// Event Handler --------------------------

	const handleAddBlockBtnClick = (type, dataUrl) => {
		_addTypeBlock(type, dataUrl);
		_setIsCreateNoteFormOn(true);
	};

	// Render -----------------------
	return (
		<div className={styles.createNote}>
			<button
				className={styles.addTextBtn}
				onClick={() => {
					handleAddBlockBtnClick(BlockTypes.TEXT);
				}}
			>
				{WRITE_NOTE_TEXT}
			</button>
			<ImgInput
				handleImgUrlCallback={(dataUrl) => {
					handleAddBlockBtnClick(BlockTypes.IMAGE, dataUrl);
				}}
			>
				<AddBlockBtn Icon={InsertPhotoIcon} />
			</ImgInput>
			<AddBlockBtn
				Icon={FormatListBulletedIcon}
				onClick={() => {
					handleAddBlockBtnClick(BlockTypes.CHECKLIST);
				}}
			/>
		</div>
	);
};

export default CreateNote;
