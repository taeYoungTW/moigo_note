import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { getEmptyImage } from 'react-dnd-html5-backend';
import { ItemTypes } from '../constants/constants';

const useDnDListBlock = (index, block, moveBlock) => {
	const currentRef = useRef(null);

	// React-Dnd Hooks
	const [, drop] = useDrop({
		accept: ItemTypes.BLOCK,
		collect: (monitor) => {
			return { isOver: monitor.isOver() };
		},
		hover(dragItem, monitor) {
			const { dragIndex, blockHeight } = dragItem;

			if (dragIndex === index) {
				return;
			}

			if (!currentRef.current) {
				return;
			}

			const hoverBoundingRect = currentRef.current?.getBoundingClientRect();

			const { bottom: dropBottom, top: dropTop } = hoverBoundingRect;
			const cursorClientY = monitor.getClientOffset().y;

			// 아래에서 위로 이동하는 경우
			if (dragIndex > index) {
				if (cursorClientY > dropTop + blockHeight) {
					return;
				}
			}
			// 위에서 아래로 이동하는 경우
			if (dragIndex < index) {
				if (cursorClientY < dropBottom - blockHeight) {
					return;
				}
			}

			moveBlock(dragIndex, index);
			dragItem.dragIndex = index;
		},
	});

	const [{ isDragging }, drag, preview] = useDrag({
		type: ItemTypes.BLOCK,
		item: () => ({
			dragIndex: index,
			block,
			blockHeight: currentRef?.current?.clientHeight,
		}),
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});

	preview(getEmptyImage());
	return { dropRef: drop(currentRef), dragRef: drag, isDragging };
};

export default useDnDListBlock;
