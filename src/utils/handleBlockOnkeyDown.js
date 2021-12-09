export const handleBlockWithEnterKey = (e, callback) => {
	if (e.code !== 'Enter') {
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

export const handleBlockWithArrowKey = (e, upCallback, downCallback, isImg) => {
	// ArrowUp
	if (e.code === 'ArrowUp') {
		if (isImg) {
			upCallback();
			return;
		}
		if (e.target.selectionStart === 0) {
			upCallback();
			return;
		}
		return;
	}

	//ArrowDown
	if (e.code === 'ArrowDown') {
		if (isImg) {
			downCallback();
			return;
		}
		if (e.target.selectionStart === e.target.value.length) {
			downCallback();
			return;
		}
		return;
	}
};

export const handleBlockWithBrackets = (e, callback) => {
	if (e.target.value !== '[]') {
		return;
	}
	if (e.code === 'Space') {
		e.preventDefault();
		callback();
	}
};
