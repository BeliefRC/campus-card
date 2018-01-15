import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Breadcrumb} from 'antd'
import menuData from '../../viewDatas/menu'


export default class HomeBreadcrumb extends React.Component {
    // 构造
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        // 初始状态
        this.state = {};
    }

    //根据路由的key找到菜单
    findTitleByKey(keyArr, menuArr) {
        {
            let {menuKey} = this.props;
            if (menuKey.selectedKey === '/') {
                return ['通知公告']
            }
        }
        //定义存放标题名称的数组
        let menuTitleArr = [];
        //arr代表菜单数组
        (function loop(arr) {
            //循环路由key数组
            for (let j = 0; j < keyArr.length; j++) {
                //避免非一级菜单时重复录入
                //menuTitleArr.length为菜单层级树，如当length为1时，keyArr的第一项就不必再次作比较
                if (menuTitleArr.length === (j + 1)) {
                    //跳出此次循环
                    continue;
                }
                //循环菜单数据数组
                for (let k = 0; k < arr.length; k++) {
                    //保证j的值，arr[k].key.split('/')[j]抛异常 当菜单key被'/'分割后的第j项和key数组的第j项相等时
                    if (j < arr[k].key.split('/').length && arr[k].key.split('/')[j] === keyArr[j]) {
                        //push菜单标题
                        menuTitleArr.push(arr[k].title);
                        //如果菜单对象含有children属相表明还有下级菜单，继续遍历
                        if (arr[k].children) {
                            loop(arr[k].children)
                        }
                        //终止循环 因为后面的数据不可能再匹配，
                        break;
                    }
                }
            }
        })(menuArr);
        return menuTitleArr
    }

    render() {
        let {menuKey} = this.props,
            keyArr = menuKey.selectedKey.split('/'),
            menuTitleArr = this.findTitleByKey(keyArr, menuData),
            BreadcrumbItems = menuTitleArr.map(item => (
                <Breadcrumb.Item key={item}>{item}</Breadcrumb.Item>
            ));
        return (
            <Breadcrumb style={{margin: '16px 0'}}>
                {BreadcrumbItems}
            </Breadcrumb>
        )
    }
}

