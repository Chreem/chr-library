process.env.NODE_ENV === 'development'
    ? require('react-hot-loader/patch')
    : void 0;

import React from 'react'
import ReactDom from 'react-dom'
import Root from './app.jsx'

/**
 * some adapter for hot-loader
 */
if (process.env.NODE_ENV === 'development') {
    const {AppContainer} = require('react-hot-loader');
    const render = Component => {
        ReactDom.render(
            <AppContainer>
                <Component/>
            </AppContainer>,
            document.getElementById('app')
        );
    };

    render(Root);

    if (module.hot) {
        module.hot.accept('./app.jsx', () => {
            const NextRoot = require('./app.jsx').default;
            render(NextRoot)
        })
    }
} else {
    ReactDom.render(<Root/>, document.getElementById('app'));
}
