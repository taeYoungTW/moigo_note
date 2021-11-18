import React, { useCallback } from 'react';
import AddBlockBtn from '../AddBlockBtn/AddBlockBtn';
import ImgInput from '../ImgInput/ImgInput';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { useAppAction } from '../../contexts/AppStateContext';
import './CreateCtrlBar.scss';

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
		<div className="ctrl-bar">
			<div className="add-btns">
				<ImgInput
					callback={(dataUrl) => {
						_addTypeBlock('image', dataUrl);
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
				<AddBlockBtn
					Icon={TextFieldsIcon}
					eventHandler={() => {
						handleAddBlockBtnOnClick('text');
					}}
				/>
			</div>
			<button
				type="button"
				onClick={handleSubmitBtnOnClick}
				className="submit-btn"
			>
				{submitBtnName}
			</button>
		</div>
	);
};

export default CreateCtrlBar;
