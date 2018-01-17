import LocalStore from "./localStore";
import {hashHistory} from "react-router";

export default {
    update(menuKey, menuKeyActions, newMenuKey,isRoute=true) {
        //跟新redux中的状态
        menuKey.selectedKey = newMenuKey;
        menuKeyActions.update(menuKey);
        //跳转
        isRoute&&hashHistory.push(newMenuKey);
        //存储
        LocalStore.setItem('selectedKey', newMenuKey);
    }
}