import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './Home';

/* 
Router Component
- 화면 전체가 바뀌는 부분이 없어, Home만 사용될 예정
*/
const Router = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Home} />
			</Switch>
		</BrowserRouter>
	);
};

export default Router;
