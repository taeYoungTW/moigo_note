import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import CreateBlock from '../CreateBlock/CreateBlock';
import styles from './CreateBlocks.scss';
import DragBlockLayer from '../DragBlockLayer/DragBlockLayer';
import { useEffect } from 'react';
import useAddDefaultBlock from '../../hooks/useAddDefaultBlock';

const CreateBlocks = () => {
	// Global States & Actions --------------------------
	const { _setIndexToFocus, _resetBlocks } = useAppAction();
	const { _blocks } = useAppState();

	// useEffects ----------------------------------------
	/* "Focus prev block with backspace key" 기능 정보 CleanUp
	 */
	useEffect(() => {
		return () => {
			_setIndexToFocus(-1);
			_resetBlocks();
		};
	}, [_setIndexToFocus, _resetBlocks]);

	useAddDefaultBlock(_blocks.length, useAppAction);

	return (
		<div className={styles.createBlocks}>
			{_blocks?.map((block, i) => (
				<CreateBlock block={block} index={i} key={block.id} />
			))}
			<DragBlockLayer />
		</div>
	);
};

export default CreateBlocks;
