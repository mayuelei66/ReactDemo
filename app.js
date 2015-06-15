var React = require("react");
var Router = require("react-router");
var appRouter = require("./static/js/Router");

window.React = React;

Router.run(appRouter,Router.HistoryLocation, function (Handler) {
    React.render(<Handler/>, document.getElementById("main"));
});