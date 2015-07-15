/**
 * Created by mayuelei on 15/6/7.
 */
var React = require("react");
var Row = require("react-bootstrap").Row;
var Table = require("react-bootstrap").Table;
var Button = require("react-bootstrap").Button;
var Col = require("react-bootstrap").Col;
var Input = require("react-bootstrap").Input;

var data = require("./data");

var Second = React.createClass({
    getInitialState : function(){
        return {
            searchValue : "",
            data : data
        }
    },
    handleInput : function(e){
        var text = e.target.value;
        var result = data.filter(function(single){
            // startWith
            return single.phone.toString().slice(0,text.length) == text;
        });
        this.setState({
            searchValue : text,
            data : result
        });
    },
    render : function(){
        return (
            <Row className="content">
                <Col xs={12} md={6} mdOffset={3}>
                    <h1>React 组件与单向数据流动</h1>
                    <hr/>
                    <form className='form-horizontal'>
                        <Input type='text' label="电话搜索:" labelClassName='col-xs-2' wrapperClassName='col-xs-8'
                               value={this.state.searchValue}
                               onChange={this.handleInput} placeholder="请输入手机号码"/>
                    </form>
                    <div>
                        <ResultTable data={this.state.data} />
                    </div>
                </Col>
            </Row>
        );
    }
});

var ResultTable = React.createClass({
    getInitialState : function(){
        var sorted = this.props.data.sort(function(a,b){
            return a["age"] - b["age"];
        });
        return {
            ageAsc : true,
            data : sorted
        }
    },
    handleSort : function(){
        this.setState({
            ageAsc : !this.state.ageAsc,
            data : this.state.data.reverse()
        });
    },
    componentWillReceiveProps : function(nextProps){
        var sorted = nextProps.data.sort(function(a,b){
            return a["age"] - b["age"];
        });
        if(!this.state.ageAsc){
            sorted = sorted.reverse();
        }
        this.setState({
            data : sorted
        });
    },
    render : function(){
        var data = this.state.data;
        var asc = this.state.ageAsc;
        var tfoot = "当前共筛选出" + data.length + "数据";
        return (
            <div>
                <h4>{tfoot}</h4>
                <hr/>
                <Table striped bordered condensed hover>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>姓名</th>
                            <th className={asc ? "dropup age" : "age"} onClick={this.handleSort}>
                                年龄<span className="caret"></span>
                            </th>
                            <th>电话</th>
                            <th>Email</th>
                            <th>操作</th>
                        </tr>
                    </thead>
                    <tfoot><tr><td colSpan="6">{tfoot}</td></tr></tfoot>
                    <tbody>
                        {this.renderTr(data)}
                    </tbody>
                </Table>
            </div>
        );
    },
    renderTr: function(data){
        if(data.length == 0){
            return (
              <NoDataTr length={6}><h2 className="text-center">暂无数据</h2></NoDataTr>
            );
        }else{
            var trs = data.map(function(single){
                return <Tr data={single}/>
            });
            return trs;
        }
    }
});

//
var NoDataTr = React.createClass({
    render : function(){
        return(
            <tr>
                <td colSpan={this.props.length}>{this.props.children}</td>
            </tr>
        );
    }
});

var Tr = React.createClass({
    shouldComponentUpdate: function(nextProps, nextState) {
        return nextProps.data.id !== this.props.data.id;
    },
    render : function(){
        var data = this.props.data;
        return(
            <tr>
                <td>{data.id.slice(19)}</td>
                <td>{data.name}</td>
                <td>{data.age}</td>
                <td>{data.phone}</td>
                <td>{data.email}</td>
                <td><DetailBtn id={data.id}>详细</DetailBtn></td>
            </tr>
        );
    }
});

var DetailBtn = React.createClass({
    handleClick : function(){
        alert("Id = " + this.props.id);
    },
    render : function(){
        return(
            <Button bsStyle="primary" onClick={this.handleClick}>
                {this.props.children}
            </Button>
        )
    }
});

module.exports = Second;