import { useCallback } from 'react';
import { useAppAction } from '../../contexts/AppStateContext';
import PropTypes from 'prop-types';
import CheckBoxInput from '../CheckBoxInput/CheckBoxInput';
import ChecklistTextarea from '../ChecklistTextarea/ChecklistTextarea';
import './CreateChecklistBlock.scss';

const CreateChecklistBlock = ({ block, blockIndex }) => {
	// Global States, Actions ------------------------------------
	const { _updateBlock, _moveBlockToBottom } = useAppAction();

	// Event Handler --------------------------------------------
	/* handleCheckBoxOnChange가 외부에서 전달하는 이유
	 * CheckBoxInput의 경우 Read와 Create 모두 사용하기 때문에 onChange에 대한 이벤트 핸들러 로직이 다릅니다.
	 */
	const handleCheckBoxOnChange = useCallback(
		(e) => {
			const {
				target: { checked },
			} = e;
			if (checked) {
				_moveBlockToBottom(blockIndex);
			}
			_updateBlock({ ...block, isDone: checked });
		},
		[_updateBlock, block, _moveBlockToBottom, blockIndex]
	);

	// Render ------------------------------------------
	return (
		<div className="checklist">
			<CheckBoxInput
				isDone={block.isDone}
				handleCheckBoxOnChange={handleCheckBoxOnChange}
			/>
			<ChecklistTextarea block={block} />
		</div>
	);
};

// PropTypes ------------------------------------------------------
CreateChecklistBlock.propTypes = {
	block: PropTypes.object,
};

export default CreateChecklistBlock;
