import React, { useCallback } from 'react';
import AddBlockBtn from '../AddBlockBtn/AddBlockBtn';
import ImgInput from '../ImgInput/ImgInput';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { useAppAction } from '../../contexts/AppStateContext';
import styles from './CreateCtrlBar.scss';
import { BlockTypes } from '../../constants/constants';

const CreateCtrlBar = ({ onSubmitBtnClick, submitBtnName }) => {
	// Global States & Actions --------------------------
	const { _addTypeBlock } = useAppAction();

	// Event Handler ----------------------------------
	const handleAddBlockBtnClick = useCallback(
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
					onClick={() => {
						handleAddBlockBtnClick(BlockTypes.CHECKLIST);
					}}
				/>
				<AddBlockBtn
					Icon={TextFieldsIcon}
					onClick={() => {
						handleAddBlockBtnClick(BlockTypes.TEXT);
					}}
				/>
			</div>
			<button
				type="button"
				onClick={onSubmitBtnClick}
				className={styles.submitBtn}
			>
				{submitBtnName}
			</button>
		</div>
	);
};

export default CreateCtrlBar;
