import * as actionTypes from '../constants/menuKey'

export function update(data) {
    return {
        type: actionTypes.MENU_KEY_UPDATE,
        data
    }
}