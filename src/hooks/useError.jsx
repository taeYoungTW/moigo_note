import { useEffect, useState } from 'react';

const useError = () => {
	const [error, setError] = useState({
		message: '',
		code: '',
		location: '',
	});

	useEffect(() => {
		if (error.message || error.code || error.location) {
			console.error(`Error: ${error.message} `, error);
		}
	}, [error]);

	return setError;
};

export default useError;
