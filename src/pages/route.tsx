import Index from './index'
import Game from './game'
import Error404 from './error/404'
import {RouteProps} from 'react-router-dom'


interface RoutePropsType extends RouteProps {
}
const routes: RoutePropsType[] = [
  {path: '/', component: Index, exact: true},
  {path: '/game', component: Game, exact: true},
  {path: '*', component: Error404}
];


export default routes