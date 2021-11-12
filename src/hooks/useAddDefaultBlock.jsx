import { useEffect } from 'react';

const useAddDefaultBlock = (addTypeBlockAction, blocksLength) => {
	useEffect(() => {
		if (blocksLength === 0) {
			addTypeBlockAction('text');
		}
	}, [blocksLength, addTypeBlockAction]);
};
export default useAddDefaultBlock;
