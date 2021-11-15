import React, { useCallback } from 'react';
import { useAppAction } from '../../contexts/AppStateContext';
import DeleteBtn from '../Common/DeleteBtn';
import { CTRL_BLOCK_ICON_STYLE } from '../../constants/iconStyles';

const CreateImgBlock = ({ block, children }) => {
	const { _deleteBlock } = useAppAction();

	const handleDeleteBtnOnClick = useCallback(() => {
		_deleteBlock(block.id);
	}, [_deleteBlock, block]);

	return (
		<div className="create_block">
			<img src={block.dataUrl} alt="img_block" className="img" />
			<div className="btns">
				<DeleteBtn
					style={CTRL_BLOCK_ICON_STYLE}
					handleDeleteBtnOnClick={handleDeleteBtnOnClick}
				/>
				{children}
			</div>
		</div>
	);
};

export default CreateImgBlock;
