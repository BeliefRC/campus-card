import * as actionTypes from '../constants/userInfo'

export function update(data) {
    return {
        type: actionTypes.USER_INFO_UPDATE,
        data
    }
}