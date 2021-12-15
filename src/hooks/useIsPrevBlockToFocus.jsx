import { useCallback, useEffect } from 'react';

const IMG_TAG_NAME = 'IMG';

const useIsPrevBlockToFocus = (curIndex, ref, useAppAction) => {
	const { _indexToFocus, _setIndexToFocus } = useAppAction();
	useEffect(() => {
		const DOM = ref.current;
		if (curIndex === _indexToFocus) {
			DOM.focus();
			if (DOM.tagName === IMG_TAG_NAME) return;
			DOM.setSelectionRange(DOM.value.length, DOM.value.length);
		}
	}, [curIndex, _indexToFocus, ref]);

	/** initIndexToFocus For Solve Issue #5
	 *  Connect to onBlur Event
	 */
	const initIndexToFocus = useCallback(() => {
		if (_indexToFocus === -1) {
			return;
		}
		_setIndexToFocus(-1);
	}, [_indexToFocus, _setIndexToFocus]);

	return { initIndexToFocus };
};

export default useIsPrevBlockToFocus;
