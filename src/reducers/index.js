import {combineReducers} from 'redux'
import userInfo from './userInfo'
import menuKey from './menuKey'
import modalVisible from './modalVisible'

export default combineReducers({
    userInfo,
    menuKey,
    modalVisible
})