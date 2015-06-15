/**
 * Created by mayuelei on 15/5/20.
 */

var React = require("react");
var Link = require("react-router").Link;
var router = require("react-router").Route;

/**
 * 原生react router 将active 类加在Link的a上面。拓展之后
 * 满足当前业务需求，将active添加到a的上一级元素 li 上
 *
 **/

var NavLi = React.createClass({
    render : function(){
        var props = this.props,
            isActive = this.context.router.isActive(props.to);
        return (
            <li className={isActive ? "active" : ""}>
                <Link to={props.to}>
                    {props.children}
                </Link>
            </li>
        );
    }
});
NavLi.contextTypes = {
    router: router
};

module.exports = NavLi;