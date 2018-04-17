import React from 'react'
import {Route, Redirect} from 'react-router-dom'
import {getAuthority} from "./authority";

export default class extends React.Component {
    render() {
        if (getAuthority()) return <Route {...this.props}>{this.props.children}</Route>
        else return <Redirect exact to={this.props.redirectPath}/>
    }
}