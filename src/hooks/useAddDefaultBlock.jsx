import { useEffect } from 'react';
import { BlockTypes } from '../constants/constants';

const useAddDefaultBlock = (addTypeBlockAction, blocksLength) => {
	useEffect(() => {
		if (blocksLength === 0) {
			addTypeBlockAction(BlockTypes.TEXT);
		}
	}, [blocksLength, addTypeBlockAction]);
};
export default useAddDefaultBlock;
