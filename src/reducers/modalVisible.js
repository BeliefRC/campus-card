import * as actionTypes from '../constants/modalVisible'

export default function modalVisible(state = {
    loginVisible: false,
    aboutUsVisible: false
}, action) {
    switch (action.type) {
        case actionTypes.MODAL_VISIBLE_UPDATE:
            return Object.assign({}, state, action.data);
        default:
            return Object.assign({}, state)
    }
}
//不直接去改变state的值，而是返回一个新的对象，保持state的唯一性