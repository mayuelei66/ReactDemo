var React = require("react");
var Col = require("react-bootstrap").Col;
var Row = require("react-bootstrap").Row;
var Button = require("react-bootstrap").Button;
var ProgressBar = require("react-bootstrap").ProgressBar;
var _ = require("underscore");

function init(){
    var origin = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];
    var initMatrix = utils.fillMatrix(origin);
    return ({
        matrix : initMatrix,
        recall : false,
        history : [{"history":initMatrix}],
        display : false,
        percent : 0
    });
}

var Third = React.createClass({
    getInitialState : function(){
        return init();
    },
    handleKeyEvent : function(e){
        if(e.keyCode >= 37 && e.keyCode <= 40){
            var matrix = this.state.matrix;
            var after = utils.calculateMatrix(matrix,e.keyCode - 39);
            if(after.length == 0){
                console.log("无法移动");
                return;
            }
            after = utils.fillMatrix(after);

            var oldH = this.state.history;
            oldH.push({"history" : after});
            this.setState({
                matrix : after,
                history : oldH
            });
        }
    },
    componentDidMount: function () {
        window.addEventListener('keydown', this.handleKeyEvent);
    },
    componentWillUnmount: function () {
        window.removeEventListener('keydown', this.handleKeyEvent);
    },
    updateViews : function(){
        var recall = this.state.recall;
        var history = this.state.history;
        if(history.length == 1){
            window.addEventListener('keydown', this.handleKeyEvent);
            window.clearInterval(this.seq);
            this.setState({
                recall : false,
                matrix : history[0]["history"],
                history: history
            });
        }else{
            this.setState({
                recall : recall,
                matrix : history.pop()["history"],
                history: history
            });
        }
    },
    handleStop : function(){
        window.clearInterval(this.seq);
        window.addEventListener('keydown', this.handleKeyEvent);
        this.setState({
            recall : false
        });
    },
    handleClick : function(){
        var recall = !this.state.recall;
        if(recall){
            window.removeEventListener('keydown', this.handleKeyEvent);
            this.seq = setInterval(this.updateViews,1000);
        }else{
            window.addEventListener('keydown', this.handleKeyEvent);
            var matrix = this.state.matrix;
            var history = this.state.history;
            this.setState({
                recall : recall,
                matrix : matrix,
                history : history
            });
        }
    },
    initGame : function(){
        this.setState(init());
    },
    handleDisplay : function(){
        var that = this;
        var history = _.clone(this.state.history);
        var total = history.length;
        this.dis = setInterval(function(){
            if(history.length != 1){
                that.setState({
                    matrix : history.shift()["history"],
                    display : true,
                    percent : (total - history.length)/total*100
                });
            }else{
                that.stopDisplay();
            }
        },500);
    },
    stopDisplay : function(){
        var current = _.clone(this.state.history).pop()["history"];
        clearInterval(this.dis);
        this.setState({
            matrix : current,
            display : false
        });
    },
    render : function(){
        var blocks = utils.convertMatrixToArray(this.state.matrix).map(function(data){
            return <Block num={data} />
        });
        var display = this.state.display;
        var className = display ? "hidden" : "show";
        return (
            <Row className="content">
                <Col xs={12} md={6} mdOffset={3}>
                    <h1>React 2048(状态机)</h1>
                    <hr/>
                    <div className="text-center">
                        <div className={className}>
                            <button className="btn btn-primary btn-lg" disabled={display ? true : false} onClick={this.initGame}>
                                Start
                            </button>
                            <button style={{marginLeft:"50"}} disabled={this.state.history.length > 1 ? false : true} className="btn btn-success btn-lg" onClick={this.handleClick}>
                                Back
                            </button>
                            <button style={{marginLeft:"50"}} disabled={display ? true : false} className="btn btn-danger btn-lg" onClick={this.handleStop}>
                                Pause
                            </button>
                            <Button bsSize="large" bsStyle="info" style={{width:"65%",marginTop:"20"}} onClick={this.handleDisplay}>Display一下</Button>
                        </div>
                        <div className={!display ? "hidden" : "show"}>
                            <ProgressBar now={this.state.percent} label='%(percent)s%' />
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="game-box">
                            {blocks}
                        </div>
                    </div>
                </Col>
            </Row>
        );
    }
});

var Block = React.createClass({
    render : function(){
        var value = this.props.num,
            className = "box box-" + value;
        return (
            <div className={className}>
                {value ? value : ""}
            </div>
        );
    }
});


var utils = {
    convertMatrixToArray : function(matrix){
    var array = [];
    for(var i = 0; i < 4; i++){
        for(var j = 0; j < 4; j++){
            array.push(matrix[i][j]);
        }
    }
    return array;

    },
    reverseArrayToMatrix : function(arr){
        var matrix = [];
        matrix.push(arr.slice(0,4));
        matrix.push(arr.slice(4,8));
        matrix.push(arr.slice(8,12));
        matrix.push(arr.slice(12,16));
        return matrix;
    },
    /**
     * 2 或者 4
     * */
    generateNum : function(){
        var num = _.random(0,1);
        if(num){
            return 4;
        }
        return 2;
    },
    fillMatrix : function(matrix){
        var array = this.convertMatrixToArray(matrix);
        var num = this.generateNum();
        for(var i = 0; i < 256; i++){
            var index = _.random(0,15);
            if(array[index] == 0){
                array[index] = num;
                break;
            }
        }
        return this.reverseArrayToMatrix(array);
    },
    calculate : function(arr){
        var drop0 = arr.filter(function(value){
            return value != 0;
        });
        if(drop0.length == 0){
            return [0,0,0,0];
        }else if(drop0.length == 1){
            return [0,0,0,drop0[0]];
        }else if(drop0.length == 2){
            if(drop0[0] === drop0[1]){
                return [0,0,0,drop0[0]*2];
            }else{
                return [0,0].concat(drop0);
            }
        }else if(drop0.length == 3){
            var v0 = drop0[0];
            var v1 = drop0[1];
            var v2 = drop0[2];
            if(v2 === v1){
                return [0,0,v0,v2*2];
            }else if(v1 === v0){
                return [0,0,v0*2,v2];
            }else{
                return [0].concat(drop0);
            }
        }else {
            var v0 = drop0[0];
            var v1 = drop0[1];
            var v2 = drop0[2];
            var v3 = drop0[3];
            var newA = [];
            //**ee
            if(v3 === v2){
                newA[3] = v3 + v2;
                newA[0] = 0;

                //eeee
                if(v1 === v0){
                    newA[2] = v1 + v0;
                    newA[1] = 0;
                    //??ee
                }else{
                    newA[2] = v2;
                    newA[1] = v1;
                }

            }else if(v2 === v1){
                newA[3] = v3;
                newA[2] = v2 + v1;
                newA[1] = v0;
                newA[0] = 0;
            }else if(v1 === v0){
                newA[3] = v3;
                newA[2] = v2;
                newA[1] = v1 + v0;
                newA[0] = 0;
            }else{
                newA = arr;
            }
            return newA;
        }
    },
    calculateMatrix : function(martix,type){
        var that = this;
        var calculated = [];
        switch (type){
            case 0:
                calculated = martix.map(function(col){
                    return that.calculate(col);
                });

                break;
            case 1:
                calculated = that.downMatrix(martix).map(function(col){
                    return that.calculate(col);
                });

                calculated = that.rDownMatrix(calculated);
                break;

            case -1 :
                calculated = that.upMatrix(martix).map(function(col){
                    return that.calculate(col);
                });
                calculated = that.rUpMatrix(calculated);
                break;

            case -2 :
                calculated = that.leftMatrix(martix).map(function(col){
                    return that.calculate(col);
                });
                calculated = that.leftMatrix(calculated);
                break;
        }
        if(this.isEqual(martix,calculated)){
            console.log(martix);
            console.log(calculated);
            return [];
        }
        if(calculated.toString().indexOf("4096") != -1){
            alert("厉害，4096了");
        }
        return calculated;
    },
    downMatrix : function(matrix){
        var after = [];
        after[0] = [matrix[0][3],matrix[1][3],matrix[2][3],matrix[3][3]];
        after[1] = [matrix[0][2],matrix[1][2],matrix[2][2],matrix[3][2]];
        after[2] = [matrix[0][1],matrix[1][1],matrix[2][1],matrix[3][1]];
        after[3] = [matrix[0][0],matrix[1][0],matrix[2][0],matrix[3][0]];
        return after;
    },
    rDownMatrix : function(matrix){
        var after = [];
        after[0] = [matrix[3][0],matrix[2][0],matrix[1][0],matrix[0][0]];
        after[1] = [matrix[3][1],matrix[2][1],matrix[1][1],matrix[0][1]];
        after[2] = [matrix[3][2],matrix[2][2],matrix[1][2],matrix[0][2]];
        after[3] = [matrix[3][3],matrix[2][3],matrix[1][3],matrix[0][3]];
        return after;
    },
    upMatrix : function(matrix){
        var after = [];
        after[0] = [matrix[3][0],matrix[2][0],matrix[1][0],matrix[0][0]];
        after[1] = [matrix[3][1],matrix[2][1],matrix[1][1],matrix[0][1]];
        after[2] = [matrix[3][2],matrix[2][2],matrix[1][2],matrix[0][2]];
        after[3] = [matrix[3][3],matrix[2][3],matrix[1][3],matrix[0][3]];
        return after;
    },
    rUpMatrix : function(matrix){
        var after = [];
        after[0] = [matrix[0][3],matrix[1][3],matrix[2][3],matrix[3][3]];
        after[1] = [matrix[0][2],matrix[1][2],matrix[2][2],matrix[3][2]];
        after[2] = [matrix[0][1],matrix[1][1],matrix[2][1],matrix[3][1]];
        after[3] = [matrix[0][0],matrix[1][0],matrix[2][0],matrix[3][0]];
        return after;
    },
    leftMatrix : function(matrix){
        var after = [];
        after[0] = [matrix[0][3],matrix[0][2],matrix[0][1],matrix[0][0]];
        after[1] = [matrix[1][3],matrix[1][2],matrix[1][1],matrix[1][0]];
        after[2] = [matrix[2][3],matrix[2][2],matrix[2][1],matrix[2][0]];
        after[3] = [matrix[3][3],matrix[3][2],matrix[3][1],matrix[3][0]];
        return after;
    },
    isEqual : function(before,after){
        return before.toString() === after.toString();
    }
};

module.exports = Third;