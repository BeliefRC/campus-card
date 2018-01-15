import * as actionTypes from '../constants/modalVisible'

export function update(data) {
    return {
        type: actionTypes.MODAL_VISIBLE_UPDATE,
        data
    }
}