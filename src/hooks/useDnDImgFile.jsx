import { useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import getImgDataUrlFromFileAsync from '../utils/getImgDataUrlFromFileAsync';

const useDnDImgFile = (handleImgUrlCallback) => {
	const [, drop] = useDrop(() => ({
		accept: [NativeTypes.FILE],
		async drop(item) {
			const file = item.files[0];
			const result = await getImgDataUrlFromFileAsync(file);
			handleImgUrlCallback(result);
		},
	}));
	return drop;
};

export default useDnDImgFile;
