import { useEffect } from 'react';

const useAddDefaultBlock = (handleAddBlockBtnOnClick, blocksLength) => {
	useEffect(() => {
		if (blocksLength === 0) {
			handleAddBlockBtnOnClick('text');
		}
	}, [blocksLength, handleAddBlockBtnOnClick]);
};
export default useAddDefaultBlock;
