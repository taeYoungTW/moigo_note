import { useEffect } from 'react';

const useIsPrevBlockToFocus = (curIndex, indexToFocus, targetDOM) => {
	useEffect(() => {
		if (!targetDOM) {
			console.log('no DOM');
			return;
		}
		if (curIndex === indexToFocus) {
			console.log(curIndex, 'focus & selectionEnd');
			targetDOM.focus();
			targetDOM.setSelectionRange(
				targetDOM.value.length,
				targetDOM.value.length
			);
		}
	}, [curIndex, indexToFocus, targetDOM]);
};

export default useIsPrevBlockToFocus;
