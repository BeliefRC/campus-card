import LocalStore from "./localStore";
import {hashHistory} from "react-router";

export default {
    /**
     *
     * @param menuKey redux中menuKey
     * @param menuKeyActions redux中操作menuKey的action
     * @param newMenuKey 改变后新的menuKey
     * @param isRoute 是否下需要跳转到newMenuKey页面下
     * @param state 路由中携带的参数
     */
    update(menuKey, menuKeyActions, newMenuKey, isRoute = true, state = {}) {
        menuKey.selectedKey = newMenuKey;
        //跟新redux中的状态
        menuKeyActions.update(menuKey);
        //跳转
        isRoute && hashHistory.push({pathname: newMenuKey, state: {...state}});
        //存储
        LocalStore.setItem('selectedKey', newMenuKey);
    }
}