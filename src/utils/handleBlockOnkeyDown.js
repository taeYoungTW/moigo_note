export const handleBlockWithEnterKey = (e, defaultCallback) => {
	if (e.keyCode !== 13) {
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
	if (!content && e.keyCode === 8) {
		callback();
	}
};
