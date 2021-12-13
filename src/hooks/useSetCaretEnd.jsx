import { useEffect } from 'react';

const useSetCaretEnd = (ref) => {
	useEffect(() => {
		const DOM = ref.current;
		DOM.focus();
		DOM.setSelectionRange(DOM.value.length, DOM.value.length);
	}, [ref]);
};

export default useSetCaretEnd;

/**
 * hook으로 DOM을 설정하고자 하는 경우 ref.current 형식이 아닌 ref로 prop을 받아야 한다.
 * ref.current 형식으로 들고오는 경우 잘 인식하지 못함
 */
