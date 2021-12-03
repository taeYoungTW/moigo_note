export const handleBlockWithEnterKey = (
	e,
	defaultCallback,
	shiftKeyCallback
) => {
	if (e.keyCode !== 13) {
		return;
	}

	e.preventDefault();

	if (e.shiftKey) {
		defaultCallback();
	} else {
		shiftKeyCallback();
	}
};

export const handleBlockWithBackspaceKey = (e, content, callback) => {
	if (!content && e.keyCode === 8) {
		callback();
	}
};
