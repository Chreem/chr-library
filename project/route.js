import React, {Component} from 'react'
import Loadable from 'react-loadable'

class Loading extends Component {
    render() {
        return <div>
            loading...
        </div>
    }
}

export const routes = [
    {
        path: '/',
        component: require('./layout/BaseLayout').default
    },
    {
        path: '/user',
        component: require('./layout/UserLayout').default
    }, {
        path: '/user/login',
        name: 'Login',
        component: require('./routes/user/Login').default
    }, {
        path: '/user/register',
        name: 'Register',
        component: require('./routes/user/Register').default
    }, {
        path: '/user/register-result',
        name: 'Register-Result',
        component: require('./routes/user/RegisterResult').default
    }
];

// export const routes = [
//     {
//         path: '/',
//         component: Loadable({loader: () => import('./layout/BaseLayout'), loading: Loading})
//     },
//     {
//         path: '/user',
//         component: Loadable({loader: () => import('./layout/UserLayout'), loading: Loading})
//     }, {
//         path: '/user/login',
//         name: 'Login',
//         component: Loadable({loader: () => import('./routes/user/Login.jsx'), loading: Loading})
//     }, {
//         path: '/user/register',
//         name: 'Register',
//         component: Loadable({loader: () => import('./routes/user/Register.jsx'), loading: Loading})
//     }
// ];

export function getChildrenRoutes(path) {
    return routes.filter(item => {
        if (item.path === path) return false;
        return item.path.indexOf(path) >= 0;
    })
}

export function getRouteByPath(path) {
    return routes.filter(item => item.path === path)[0]
}

export default routes