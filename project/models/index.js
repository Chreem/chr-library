import {createStore, combineReducers} from 'redux'

// store的示例状态
const tempStore = {
    user: {}
};

const ctx = require.context('./', false, /\.js$/);
const reducers = {};
ctx.keys()
    .filter(item => item !== './index.js')
    .map(key => {
        reducers[key.slice(
            key.indexOf('./') + 2,
            key.indexOf('.js'),
        )] = ctx(key).default
    });
console.log(reducers);
const store = createStore(combineReducers(reducers));
export default store;
