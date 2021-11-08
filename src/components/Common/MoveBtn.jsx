import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import { CTRL_BLOCK_ICON_FONT_SIZE } from '../../constants/constants';

const MoveBtn = ({ dragHandleProps }) => {
	return (
		<button type="button" {...dragHandleProps}>
			<MenuIcon sx={{ fontSize: CTRL_BLOCK_ICON_FONT_SIZE }} />
		</button>
	);
};

export default MoveBtn;
