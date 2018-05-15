import * as React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {getAuthority} from './authority';
import {RouteProps} from "react-router";

interface AuthorizedPropsType extends RouteProps{
    redirectPath:string;
}

export default class extends React.Component<AuthorizedPropsType> {
    render() {
        if (getAuthority()) return <Route {...this.props}>{this.props.children}</Route>;
        else return <Redirect exact to={this.props.redirectPath}/>
    }
}