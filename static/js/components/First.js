/**
 * Created by mayuelei on 15/6/7.
 */
var React = require("react");
var Row = require("react-bootstrap").Row;
var Col = require("react-bootstrap").Col;
var Input = require("react-bootstrap").Input;
var Button = require("react-bootstrap").Button;


var MyInput = React.createClass({
    handleInput : function(e){
        this.props.handleInput(e.target.value);
    },
    render :function(){
        return (
            <div>
                <h3>Text</h3>
                <Input type="text" value={this.props.inputText} placeholder="请输入内容..." ref="inputText" onInput={this.handleInput} />
                输出: <span className="red-style">{this.props.inputText}</span>
            </div>
        );
    }
});

var MyRadios = React.createClass({
    handleRadio : function(e){
        this.props.handleRadio(e.target.value);
    },
    render : function(){
        return (
            <div>
                <h3>Radio</h3>
                <Col md={4} xs={4}>
                    <Input type="radio" label="小明" name="radioValue" value="ming"
                           checked={this.props.radioValue === "ming" ? true : false} onClick={this.handleRadio}/>
                </Col>
                <Col md={4} xs={4}>
                    <Input type="radio" label="小李" name="radioValue" value="li"
                           checked={this.props.radioValue === "li" ? true : false} onClick={this.handleRadio}/>
                </Col>
                <Col md={4} xs={4}>
                    <Input type="radio" label="小马" name="radioValue" value="ma"
                           checked={this.props.radioValue === "ma" ? true : false} onClick={this.handleRadio}/>
                </Col>
                Radio已选中:<span className="red-style">{this.props.radioValue}</span>
            </div>
        );
    }

});

var MySelect = React.createClass({
    handleSelect : function(e){
        this.props.handleSelect(e.target.value);
    },
    render : function(){
        return (
            <div>
                <h3>Select</h3>
                <select className="form-control" value={this.props.selectValue} onChange={this.handleSelect}>
                    <option value="apple">苹果</option>
                    <option value="banana">香蕉</option>
                    <option value="pear">梨</option>
                </select>
                当前Select选中: <span className="red-style">{this.props.selectValue}</span>
            </div>
        );
    }
});

var First = React.createClass({
    getInitialState: function(){
        return {
            inputText : "",
            radioValue : "ming",
            selectValue : "apple"
        }
    },
    handleInput : function(value){
        this.setState({
            inputText : value
        });
    },
    handleRadio : function(value){
        this.setState({
            radioValue : value
        });
    },
    handleSelect : function(value){
        this.setState({
            selectValue : value
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
                            <h1>React 组件与表单</h1>
                            <hr/>
                            <MyInput handleInput={this.handleInput} inputText={this.state.inputText}/>
                            <MyRadios handleRadio={this.handleRadio} radioValue={this.state.radioValue}/>
                            <MySelect handleSelect={this.handleSelect} selectValue={this.state.selectValue}/>

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