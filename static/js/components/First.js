/**
 * Created by mayuelei on 15/6/7.
 */
var React = require("react");
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Input = require("react-bootstrap").Input;
var Button = require("react-bootstrap").Button;

var First = React.createClass({
    getInitialState: function(){
        return {
            inputText : "",
            radioValue : "ming",
            selectValue : "apple"
        }
    },
    handleInput : function(e){
        this.setState({
            inputText : e.target.value
        });
    },
    handleRadio : function(e){
        this.setState({
            radioValue : e.target.value
        });
    },
    handleSelect : function(e){
        this.setState({
            selectValue : e.target.value
        });
    },
    handleSubmit : function(e){
        e.preventDefault();
        var text = this.state.inputText ? this.state.inputText : "空";
        var radioValue = this.state.radioValue;
        var selectValue = this.state.selectValue;

        alert("文本为：" + text + "\nRadio为:" + radioValue + "\nSelect为:" + selectValue);
    },
    render : function(){
            return (
               <Row className="content">
                    <Col xs={12} md={6} mdOffset={3}>
                        <form onSubmit={this.handleSubmit}>
                            <h1>React 表单Demo</h1>
                            <hr/>
                            <div>
                                <h3>Text</h3>
                                <Input type="text" value={this.state.inputText} placeholder="请输入内容..." ref="inputText" onInput={this.handleInput} />
                                输出: <span className="red-style">{this.state.inputText}</span>
                            </div>
                            <div>
                                <h3>Radio</h3>
                                <Col md={4} xs={4}>
                                    <Input type="radio" label="小明" name="radioValue" value="ming"
                                           checked={this.state.radioValue === "ming" ? true : false} onClick={this.handleRadio}/>
                                </Col>
                                <Col md={4} xs={4}>
                                    <Input type="radio" label="小李" name="radioValue" value="li"
                                           checked={this.state.radioValue === "li" ? true : false} onClick={this.handleRadio}/>
                                </Col>
                                <Col md={4} xs={4}>
                                    <Input type="radio" label="小马" name="radioValue" value="ma"
                                           checked={this.state.radioValue === "ma" ? true : false} onClick={this.handleRadio}/>
                                </Col>
                                Radio已选中:<span className="red-style">{this.state.radioValue}</span>
                            </div>
                            <div>
                                <h3>Select</h3>
                                <select className="form-control" value={this.state.selectValue} onChange={this.handleSelect}>
                                    <option value="apple">苹果</option>
                                    <option value="banana">香蕉</option>
                                    <option value="pear">梨</option>
                                </select>
                                当前Select选中: <span className="red-style">{this.state.selectValue}</span>
                            </div>
                            <br/>
                            <div className="pull-right">
                                <Button type="submit" bsStyle='success'>提交</Button>
                            </div>
                        </form>
                    </Col>
               </Row>
            );
        }
});

module.exports = First;