import React, { forwardRef, useCallback } from 'react';
import { CTRL_BLOCK_ICON_STYLE } from '../../constants/iconStyles';
import { useAppAction } from '../../contexts/AppStateContext';
import DeleteBtn from '../Common/DeleteBtn';
import MenuIcon from '@mui/icons-material/Menu';
import './BlockCtrlBtns.scss';

const BlockCtrlBtns = forwardRef(({ blockId }, ref) => {
	const { _deleteBlock } = useAppAction();

	const handleDeleteBtnOnClick = useCallback(() => {
		_deleteBlock(blockId);
	}, [_deleteBlock, blockId]);

	return (
		<div className="block-ctrl-btns">
			<DeleteBtn
				style={CTRL_BLOCK_ICON_STYLE}
				handleDeleteBtnOnClick={handleDeleteBtnOnClick}
			/>
			<button type="button" ref={ref}>
				<MenuIcon sx={CTRL_BLOCK_ICON_STYLE} />
			</button>
		</div>
	);
}, []);

export default BlockCtrlBtns;
