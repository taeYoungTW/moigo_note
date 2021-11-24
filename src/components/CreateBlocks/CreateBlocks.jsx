import DnDListBlockHOC from '../DnDListBlockHOC/DnDListBlockHOC';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import useAddDefaultBlock from '../../hooks/useAddDefaultBlock';
import CreateBlock from '../CreateBlock/CreateBlock';
import './CreateBlocks.scss';
import DragBlockLayer from '../DragBlockLayer/DragBlockLayer';

const CreateBlocks = () => {
	// Global States & Actions --------------------------
	const { _addTypeBlock } = useAppAction();
	const { _blocks } = useAppState();

	// Ref

	// Hooks -----------------------------------------
	useAddDefaultBlock(_addTypeBlock, _blocks.length);

	return (
		<div className="create-blocks">
			{_blocks?.map((block, i) => (
				<DnDListBlockHOC
					Component={CreateBlock}
					ComponentProp={{ block, blockIndex: i }}
					key={block.id}
					blockIndex={i}
					block={block}
				/>
			))}
			<DragBlockLayer />
		</div>
	);
};

export default CreateBlocks;
