export const handleBlockWithEnterKey = (e, defaultCallback) => {
	if (e.code !== 'Enter') {
		return;
	}

	if (e.shiftKey) {
		//use New Line of Default feature
		return;
	} else {
		// prevent New Line
		e.preventDefault();
		defaultCallback();
		return;
	}
};

export const handleBlockWithBackspaceKey = (e, content, callback) => {
	if (e.code !== 'Backspace') {
		return;
	}

	if (!content) {
		e.preventDefault();
		callback();
		return;
	}
	return;
};

export const handleBlockWithArrowKey = (e, upCallback, downCallback) => {
	if (e.code === 'ArrowUp' && e.target.selectionStart === 0) {
		// ArrowUp
		upCallback();
		return;
	}

	if (
		e.code === 'ArrowDown' &&
		e.target.selectionStart === e.target.value.length
	) {
		//ArrowDown
		downCallback();
		return;
	}
};

export const handleBlockWithBrackets = (e, callback) => {
	if (e.target.value !== '[]') {
		return;
	}
	if (e.code === 'Space') {
		callback();
	}
};
