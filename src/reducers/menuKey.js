import * as actionTypes from '../constants/menuKey'

export default function userInfo(state = {
    selectedKey: '/'
}, action) {
    switch (action.type) {
        case actionTypes.MENU_KEY_UPDATE:
            return Object.assign({}, state, action.data);
        default:
            return Object.assign({}, state)
    }
}
//不直接去改变state的值，而是返回一个新的对象，保持state的唯一性