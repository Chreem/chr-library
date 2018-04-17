import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import DocumentTitle from 'react-document-title'
import {getChildrenRoutes, getRouteByPath} from '../route.js'
import './user.less'

export default class extends React.Component {
    getTitle() {
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

        return <DocumentTitle title={this.getTitle()}>
            <div id="user_layout">
                <div className="container">
                    <Switch>
                        {RoutesComponent}
                        <Redirect exact from="/user" to="/user/login"/>
                    </Switch>
                </div>
                <footer>footer</footer>
            </div>
        </DocumentTitle>
    }
}