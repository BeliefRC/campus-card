import * as actionTypes from '../constants/userInfo'

export default function userInfo(state = {
    user: '',
    isLogin: false,
    isAdmin: false,
    code: ''
}, action) {
    switch (action.type) {
        case actionTypes.USER_INFO_UPDATE:
            return Object.assign({}, state, action.data);
        default:
            return Object.assign({}, state)
    }
}
//不直接去改变state的值，而是返回一个新的对象，保持state的唯一性