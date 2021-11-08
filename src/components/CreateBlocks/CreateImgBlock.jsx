import React, { useCallback } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppAction } from '../../contexts/AppStateContext';
import { CTRL_BLOCK_ICON_FONT_SIZE } from '../../constants/constants';

const CreateImgBlock = ({ block, isUpdate, children }) => {
	const { _deleteBlock } = useAppAction();

	const handleDeleteBtnOnClick = useCallback(() => {
		_deleteBlock(block.id);
	}, [_deleteBlock, block]);

	return (
		<div className="create_block">
			<img src={block.dataUrl} alt="img_block" className="img" />
			<div className="btns">
				<button type="button" onClick={handleDeleteBtnOnClick}>
					<DeleteIcon sx={{ fontSize: CTRL_BLOCK_ICON_FONT_SIZE }} />
				</button>
				{children}
			</div>
		</div>
	);
};

export default CreateImgBlock;
