import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { BlockTypes } from '../constants/constants';
import getImgDataUrlFromFileAsync from '../utils/getImgDataUrlFromFileAsync';

const useDnDImgFile = (blockIndex, useAppAction) => {
	const { _addTypeBlock } = useAppAction();

	const [, drop] = useDrop(() => ({
		accept: [NativeTypes.FILE],
		async drop(item) {
			const file = item.files[0];
			const result = await getImgDataUrlFromFileAsync(file);
			if (!result) {
				return;
			}
			_addTypeBlock(BlockTypes.IMAGE, result, blockIndex + 1);
		},
	}));
	return drop;
};

export default useDnDImgFile;
