/**
 * Created by mayuelei on 15/6/7.
 */
var React = require("react");
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;

var Index = React.createClass({
    render : function(){
        return (
            <Row className="content">
                <Col xs={12} md={6} mdOffset={3} >
                    <div>
                        <div>
                            <img src="https://facebook.github.io/react/img/logo.svg" alt="React Log" className="img-responsive img-circle react-logo"/>
                        </div>
                        <h1 className="text-center">React Demo</h1>
                    </div>
                    <hr/>
                    <h3>Demo使用技术方案:</h3>
                    <p>1 核心文件：React V0.13.3  React-Router React-Bootstrap</p>
                    <p>2 辅助文件：Gulp、Browserify、Reactify、Watchify 、Underscore</p>
                    <p>3 服务器环境：Node js</p>
                    <hr/>
                    <h3>Demo介绍</h3>
                    <p>Demo 1:React表单演示</p>
                    <p>Demo 2:React组件使用方式</p>
                    <p>Demo 3:React 2048</p>
                </Col>
            </Row>
        );
    }
});

module.exports = Index;