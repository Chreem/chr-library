import * as React from 'react'
import {HashRouter as Router, Route, Switch} from 'react-router-dom'
import 'antd/dist/antd.css'
import routes from './routes'
import AuthorizedRoute from './utils/Authorized'

export default class extends React.Component {
    render() {
        const UserLayout = routes.filter(item => item.path === '/user')[0].component;
        const BaseLayout = routes.filter(item => item.path === '/')[0].component;

        return <Router>
            <Switch>
                <Route path="/user" component={UserLayout}/>
                <AuthorizedRoute
                    path="/"
                    render={props => <BaseLayout {...props}/>}
                    redirectPath="/user/login"
                />
            </Switch>
        </Router>
    }

    // render() {
    //     const UserLayout = routes.filter(item => item.path === '/user')[0].component;
    //     const BaseLayout = routes.filter(item => item.path === '/')[0].component;
    //
    //     return <Router>
    //         <Switch>
    //             <Route path="/user" component={UserLayout}/>
    //             <AuthorizedRoute
    //                 path="/"
    //                 render={props => <BaseLayout {...props}/>}
    //                 redirectPath="/user/login"
    //             />
    //         </Switch>
    //     </Router>
    // }
}
