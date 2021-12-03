import { useEffect } from 'react';

const useFocusPrevBlock = (curIndex, indexToFocus, targetDOM) => {
	useEffect(() => {
		if (!targetDOM) {
			return;
		}
		if (curIndex === indexToFocus) {
			targetDOM.focus();
		}
	}, [curIndex, indexToFocus, targetDOM]);
};

export default useFocusPrevBlock;
