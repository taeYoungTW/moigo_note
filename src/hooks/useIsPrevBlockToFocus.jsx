import { useEffect } from 'react';

const useIsPrevBlockToFocus = (curIndex, indexToFocus, targetDOM) => {
	useEffect(() => {
		if (!targetDOM) {
			return;
		}
		if (curIndex === indexToFocus) {
			targetDOM.focus();
			targetDOM.setSelectionRange(
				targetDOM.value.length,
				targetDOM.value.length
			);
		}
	}, [curIndex, indexToFocus, targetDOM]);
};

export default useIsPrevBlockToFocus;
