import { useCallback } from 'react';

const codeTypes = {
	ENTER: 'Enter',
	BACKSPACE: 'Backspace',
	ARROW_UP: 'ArrowUp',
	ARROW_DOWN: 'ArrowDown',
	SPACE: 'Space',
};
const valueTypes = { BRACKETS: '[]' };

const useShortcuts = () => {
	const handleEnterKey = useCallback((e, callback) => {
		if (e.code !== codeTypes.ENTER) {
			return;
		}

		if (e.shiftKey) {
			//use New Line of Default feature
			return;
		} else {
			// prevent New Line
			e.preventDefault();
			callback();
			return;
		}
	}, []);

	const handleBackspaceKey = useCallback((e, content, callback) => {
		if (e.code !== codeTypes.BACKSPACE) {
			return;
		}

		if (!content) {
			e.preventDefault();
			callback();
			return;
		}
		return;
	}, []);

	const handleArrowKey = useCallback((e, upCallback, downCallback, isImg) => {
		// ArrowUp
		if (e.code === codeTypes.ARROW_UP) {
			if (isImg) {
				upCallback();
				return;
			}
			if (e.target.selectionStart === 0) {
				upCallback();
			}
			return;
		}

		//ArrowDown
		if (e.code === codeTypes.ARROW_DOWN) {
			if (isImg) {
				downCallback();
				return;
			}
			if (e.target.selectionStart === e.target.value.length) {
				downCallback();
			}
			return;
		}

		return;
	}, []);

	const handleBracketsKey = useCallback((e, callback) => {
		if (e.target.value !== valueTypes.BRACKETS) {
			return;
		}

		if (e.code === codeTypes.SPACE) {
			e.preventDefault();
			callback();
		}
	}, []);

	return {
		handleEnterKey,
		handleBackspaceKey,
		handleBracketsKey,
		handleArrowKey,
	};
};
export default useShortcuts;
