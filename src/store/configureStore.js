import {createStore} from 'redux'
import rootReducer from '../reducers/index'

export default function configureStore(initialState) {
    return createStore(rootReducer, initialState,
        // 触发 redux-devtools
        window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : undefined
    )
}