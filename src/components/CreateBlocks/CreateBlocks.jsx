import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import useAddDefaultBlock from '../../hooks/useAddDefaultBlock';
import CreateBlock from '../CreateBlock/CreateBlock';
import styles from './CreateBlocks.scss';
import DragBlockLayer from '../DragBlockLayer/DragBlockLayer';

const CreateBlocks = () => {
	// Global States & Actions --------------------------
	const { _addTypeBlock } = useAppAction();
	const { _blocks } = useAppState();

	// Ref

	// Hooks -----------------------------------------
	useAddDefaultBlock(_addTypeBlock, _blocks.length);

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
