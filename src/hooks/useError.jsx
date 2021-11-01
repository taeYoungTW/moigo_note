import { useCallback, useEffect, useState } from 'react';

const useError = () => {
	const [_errorState, setErrorState] = useState({
		message: '',
		code: '',
		location: '',
	});

	const _setUseError = useCallback((error) => {
		setErrorState(error);
	}, []);

	useEffect(() => {
		if (_errorState.message || _errorState.code || _errorState.location) {
			console.error('Error: ', _errorState);
		}
	}, [_errorState]);

	return _setUseError;
};

export default useError;
