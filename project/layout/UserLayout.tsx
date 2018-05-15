import * as React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import {getChildrenRoutes, getRouteByPath} from '../routes'
import './user.less'
import {RouteComponentProps} from "react-router";

interface UserPropsType extends RouteComponentProps<any> {
}

export default class extends React.Component<UserPropsType> {
    constructor(props: any) {
        super(props);
        this.getTitle = this.getTitle.bind(this);
    }

    private getTitle() {
        const {location} = this.props;
        const route = getRouteByPath(location.pathname);
        const title = 'Chreem Blog CMS';
        return !!route ? (route.name + ' - ' + title) : title;
    }

    render() {
        const {match} = this.props;
        const RoutesComponent = getChildrenRoutes(match.path).map(item => <Route
            key={item.path}
            path={item.path}
            component={item.component}
        />);
        document.title = this.getTitle();

        return <div id="user_layout">
            <div className="container">
                <Switch>
                    {RoutesComponent}
                    <Redirect exact from="/user" to="/user/login"/>
                </Switch>
            </div>
            <footer>
                <div className="link">Find me</div>
                <div className="copyright">
                    <span>Copyright</span>
                    <a href="mailto:chreem@qq.com" className="author">Chreem</a>
                </div>
            </footer>
        </div>
    }
}