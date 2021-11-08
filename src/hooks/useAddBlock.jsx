import { useCallback } from 'react';
import { v4 as uuid } from 'uuid';

const useAddBlock = (_addBlockAction, callback = () => '') => {
	const handleAddBlockBtnOnClick = useCallback(
		(type, dataUrl) => {
			switch (type) {
				case 'text':
					_addBlockAction({ id: uuid(), type, text: '' });
					break;
				case 'checklist':
					_addBlockAction({
						id: uuid(),
						type,
						content: '',
						isDone: false,
					});
					break;
				case 'image':
					_addBlockAction({ id: uuid(), type, dataUrl });
					break;
				default:
					break;
			}
			callback();
		},
		[_addBlockAction, callback]
	);

	return handleAddBlockBtnOnClick;
};
export default useAddBlock;
