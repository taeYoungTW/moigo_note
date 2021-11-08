import MoveBtn from './MoveBtn';

const DraggbleHOC = ({ provided, Component, componentProps }) => {
	return (
		<div
			ref={provided.innerRef}
			{...provided.draggableProps}
			style={{
				...provided.draggableProps.style,
				top: 'auto !important',
				left: 'auto !important',
			}}
		>
			<Component {...componentProps}>
				<MoveBtn dragHandleProps={provided.dragHandleProps} />
			</Component>
		</div>
	);
};

export default DraggbleHOC;
