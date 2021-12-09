import React, { useCallback } from 'react';
import AddBlockBtn from '../AddBlockBtn/AddBlockBtn';
import ImgInput from '../ImgInput/ImgInput';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { useAppAction } from '../../contexts/AppStateContext';
import styles from './CreateCtrlBar.scss';
import { BlockTypes } from '../../constants/constants';

const CreateCtrlBar = ({ handleSubmitBtnOnClick, submitBtnName }) => {
	// Global States & Actions --------------------------
	const { _addTypeBlock } = useAppAction();

	// Event Handler ----------------------------------
	const handleAddBlockBtnOnClick = useCallback(
		(type, dataUrl) => {
			_addTypeBlock(type, dataUrl);
		},
		[_addTypeBlock]
	);

	// Render ----------------------------------------
	return (
		<div className={styles.ctrlBar}>
			<div className={styles.addBtns}>
				<ImgInput
					handleImgUrlCallback={(dataUrl) => {
						_addTypeBlock(BlockTypes.IMAGE, dataUrl);
					}}
				>
					<AddBlockBtn Icon={InsertPhotoIcon} />
				</ImgInput>
				<AddBlockBtn
					Icon={FormatListBulletedIcon}
					eventHandler={() => {
						handleAddBlockBtnOnClick(BlockTypes.CHECKLIST);
					}}
				/>
				<AddBlockBtn
					Icon={TextFieldsIcon}
					eventHandler={() => {
						handleAddBlockBtnOnClick(BlockTypes.TEXT);
					}}
				/>
			</div>
			<button
				type="button"
				onClick={handleSubmitBtnOnClick}
				className={styles.submitBtn}
			>
				{submitBtnName}
			</button>
		</div>
	);
};

export default CreateCtrlBar;
