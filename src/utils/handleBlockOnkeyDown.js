export const handleBlockWithEnterKey = (e, defaultCallback) => {
	if (e.code !== 'Enter') {
		return;
	}
	console.log('Enter', e);

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
	if (!content && e.code === 'Backspace') {
		e.preventDefault();
		callback();
		return;
	}
	return;
};

export const handleBlockWithArrowKey = (e, upCallback, downCallback) => {
	if (e.code === 'ArrowUp') {
		// ArrowUp
		e.preventDefault();
		upCallback();
		return;
	}

	if (e.code === 'ArrowDown') {
		//ArrowDown
		e.preventDefault();
		downCallback();
		return;
	}
};
