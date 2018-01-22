import LocalStore from "./localStore";
import {hashHistory} from "react-router";

export default {
    update(menuKey, menuKeyActions, newMenuKey, isRoute = true, state={}) {
        menuKey.selectedKey = newMenuKey;
        //跟新redux中的状态
        menuKeyActions.update(menuKey);
        //跳转
        isRoute && hashHistory.push({pathname: newMenuKey, state: {...state}});
        //存储
        LocalStore.setItem('selectedKey', newMenuKey);
    }
}