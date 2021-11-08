import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { INVALID_BLOCK_TYPE_TEXT } from '../../constants/constants';
import { useAppAction, useAppState } from '../../contexts/AppStateContext';
import useError from '../../hooks/useError';
import DraggbleHOC from '../Common/DraggbleHOC';
import CreateChecklistBlock from '../CreateBlocks/CreateChecklistBlock';
import CreateTextBlock from '../CreateBlocks/CreateTextBlock';

const CreateContent = ({ blocks, isUpdateNote }) => {
	const { _blocks } = useAppState();
	const { _initBlocks } = useAppAction();
	const _setUseError = useError();
	const handleOnDragEnd = (res) => {
		if (!res.destination) {
			return;
		}
		const newBlocks = [..._blocks];
		const [movedItem] = newBlocks.splice(res.source.index, 1);
		newBlocks.splice(res.destination.index, 0, movedItem);
		_initBlocks(newBlocks);
	};
	return (
		<DragDropContext onDragEnd={handleOnDragEnd}>
			<Droppable
				droppableId={`${isUpdateNote ? 'update' : 'create'}_content_droppable`}
				direction="vertical"
			>
				{(provided) => (
					<div
						className="content"
						{...provided.droppableProps}
						ref={provided.innerRef}
					>
						{blocks?.map((block, index) => (
							<Draggable
								key={block.id}
								draggableId={`${
									isUpdateNote ? 'update_' : 'create_'
								}dragBlock_${block.id}`}
								index={index}
							>
								{(provided) => {
									switch (block.type) {
										case 'text':
											return (
												<DraggbleHOC
													provided={provided}
													Component={CreateTextBlock}
													componentProps={{ block: block }}
												/>
											);
										case 'checklist':
											return (
												<DraggbleHOC
													provided={provided}
													Component={CreateChecklistBlock}
													componentProps={{
														block: block,
														isUpdate: isUpdateNote,
													}}
												/>
											);
										default:
											_setUseError({
												message: INVALID_BLOCK_TYPE_TEXT,
												location: `${
													isUpdateNote ? 'UpdateNote' : 'CreateNoteForm'
												}/CreateContent/switch`,
											});
											return <></>;
									}
								}}
							</Draggable>
						))}
						{provided.placeholder}
					</div>
				)}
			</Droppable>
		</DragDropContext>
	);
};

export default CreateContent;
