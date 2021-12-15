import { useEffect } from 'react';
import { BlockTypes } from '../constants/constants';

const useAddDefaultBlock = (blocksLength, useAppAction) => {
	const { _addTypeBlock } = useAppAction();
	useEffect(() => {
		if (blocksLength === 0) {
			_addTypeBlock(BlockTypes.TEXT);
		}
	}, [blocksLength, _addTypeBlock]);
};
export default useAddDefaultBlock;
