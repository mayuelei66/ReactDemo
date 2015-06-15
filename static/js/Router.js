
var React = require("react");
var Router = require("react-router");
var Route = Router.Route;
var Link = Router.Link;
var Redirect = Router.Redirect;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var Index = require("./components/Index");
var First = require("./components/First");
var Second = require("./components/Second");
var Third = require("./components/Third");
var NavBar = require("react-bootstrap").Navbar;
var Row = require("react-bootstrap").Row;
var NavItem = require("react-bootstrap").NavItem;
var Glyphicon = require("react-bootstrap").Glyphicon;
var Nav = require("react-bootstrap").Nav;
var Col = require("react-bootstrap").Col;
var NavLi = require("./components/NavLi");

var App = React.createClass({
    render : function(){
        return (
            <div>
                <NavBar brand={<a href="/">React Demo</a>} inverse fluid fixedTop>
                    <Nav>
                        <NavLi to="first">Demo 1</NavLi>
                        <NavLi to="second">Demo 2</NavLi>
                        <NavLi to="third">Demo 3</NavLi>
                    </Nav>
                    <Nav right>
                        <NavItem href="#">美团MFE  马跃雷</NavItem>
                    </Nav>
                </NavBar>

                <RouteHandler />
            </div>
        );
    }
});

var routes = (
    <Route name="app" path="/" handler={App}>
        <DefaultRoute handler={Index}/>
        <Route name="first" handler={First} />
        <Route name="second" handler={Second}/>
        <Route name="third" handler={Third}/>
    </Route>
);

module.exports = routes;



