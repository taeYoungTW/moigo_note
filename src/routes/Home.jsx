import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import HeaderArea from '../components/HeaderArea/HeaderArea';
import Main from '../components/Main/Main';

const Home = () => {
	return (
		<DndProvider backend={HTML5Backend}>
			<div className="note_app">
				<HeaderArea />
				<Main />
			</div>
		</DndProvider>
	);
};

export default Home;
