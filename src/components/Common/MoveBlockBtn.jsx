import React from 'react';
import MenuIcon from '@mui/icons-material/Menu';
import {
	BLOCK_TYPE,
	CTRL_BLOCK_ICON_FONT_SIZE,
} from '../../constants/constants';
import { useDrag } from 'react-dnd';

const MoveBlockBtn = ({ index, id }) => {
	const [, drag] = useDrag({
		type: BLOCK_TYPE,
		item: () => ({ dragId: id, dragIndex: index }),
		collect: (monitor) => {
			return {
				isDragging: monitor.isDragging(),
			};
		},
	});
	return (
		<button type="button" ref={drag}>
			<MenuIcon sx={{ fontSize: CTRL_BLOCK_ICON_FONT_SIZE }} />
		</button>
	);
};

export default MoveBlockBtn;
