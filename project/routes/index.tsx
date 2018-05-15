import * as React from 'react'
import * as Loadable from 'react-loadable'

class Loading extends React.Component {
    render() {
        return <div>Loading...</div>
    }
}

export const routes = [
    {
        path: '/',
        component: require('../layout/BaseLayout').default
    },
    {
        path: '/user',
        component: require('../layout/UserLayout').default
    }, {
        path: '/user/login',
        name: 'Login',
        component: require('./user/Login').default
    }, {
        path: '/user/register',
        name: 'Register',
        component: require('./user/Register').default
    }, {
        path: '/user/register-result',
        name: 'Register-Result',
        component: require('./user/RegisterResult').default
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

export function getChildrenRoutes(path: string) {
    return routes.filter(item => {
        if (item.path === path) return false;
        return item.path.indexOf(path) >= 0;
    })
}

export function getRouteByPath(path: string) {
    return routes.filter(item => item.path === path)[0]
}

export default routes