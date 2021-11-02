import { useEffect } from 'react';

const useAutoHeightTextArea = (targetRef, text) => {
	useEffect(() => {
		targetRef.current.style.height = '';
		targetRef.current.style.height = targetRef.current.scrollHeight + 'px';
	}, [text, targetRef]);
};

export default useAutoHeightTextArea;
