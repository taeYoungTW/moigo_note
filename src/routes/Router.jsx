import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';

/* 
Router Component
- 화면 전체가 바뀌는 부분이 없어, Home만 사용될 예정
*/
const Router = () => {
	return (
		<DndProvider backend={HTML5Backend}>
			<BrowserRouter>
				<Switch>
					<Route exact path="/" component={Home} />
				</Switch>
			</BrowserRouter>
		</DndProvider>
	);
};

export default Router;
