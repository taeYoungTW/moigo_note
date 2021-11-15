import React, { useCallback } from 'react';
import AddBtn from '../Common/AddBtn';
import ImgInput from '../Common/ImgInput';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import { useAppAction } from '../../contexts/AppStateContext';

const CreateCtrlBar = ({ handleSubmitBtnOnClick, submitBtnName, isUpdate }) => {
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
		<div className="ctrl_bar">
			<div className="add_btns">
				<ImgInput
					callback={(dataUrl) => {
						_addTypeBlock('image', dataUrl);
					}}
					isUpdate={isUpdate}
				>
					<AddBtn Icon={InsertPhotoIcon} isImgBtn />
				</ImgInput>
				<AddBtn
					Icon={FormatListBulletedIcon}
					eventHandler={() => {
						handleAddBlockBtnOnClick('checklist');
					}}
				/>
				<AddBtn
					Icon={TextFieldsIcon}
					eventHandler={() => {
						handleAddBlockBtnOnClick('text');
					}}
				/>
			</div>
			<button
				type="button"
				onClick={handleSubmitBtnOnClick}
				className={`${isUpdate ? 'update' : 'create'}_submit_btn`}
			>
				{submitBtnName}
			</button>
		</div>
	);
};

export default CreateCtrlBar;
