/** @jsx React.DOM */

var React = require('react');
var $ = require('jquery');
var _ = require('lodash');
var sciencesCalc = require('../lib/sciences-calculator');

module.exports = MyApp = React.createClass({
  getInitialState: function () {
    return _.merge({
      sciences: {
        stones: {
          count: 0,
          label: "Stones"
        },
        wheels: {
          count: 0,
          label: "Wheels"
        },
        protractors: {
          count: 0,
          label: "Protractors"
        }
      },
      total: 0
    }, this.props);
  },
  handleMinusClick: function (key) {
    this.state.sciences[key].count--;
    this.state.total = sciencesCalc(this.state.sciences.stones.count, this.state.sciences.wheels.count, this.state.sciences.protractors.count);
    this.setState(this.state);
  },
  handlePlusClick: function (key) {
    this.state.sciences[key].count++;
    this.state.total = sciencesCalc(this.state.sciences.stones.count, this.state.sciences.wheels.count, this.state.sciences.protractors.count);
    this.setState(this.state);
  },
  render: function () {
    var self = this;
    return (
      <div className="container">

        <h2>{this.state.title}</h2>

        <div style={{width: '150px'}}>

          <div style={{'fontSize': '20px', 'textAlign': 'center'}} className="alert alert-info">
            Total: {this.state.total}
          </div>

          <div className="form-group">
            {_.map(this.state.sciences, function (science, key) {
              var isMinusDisabled = science.count === 0;
              return (
                <div>
                  <label>{science.label}</label>
                  <div className="input-group input-group-lg">
                    <span className="input-group-btn">
                      <button className="btn btn-default btn-primary" type="button" onClick={self.handleMinusClick.bind(self, key)} disabled={isMinusDisabled}>-</button>
                    </span>
                    <input type="text" className="form-control" value={science.count} />
                    <span className="input-group-btn">
                      <button className="btn btn-default btn-primary" type="button" onClick={self.handlePlusClick.bind(self, key)}>+</button>
                    </span>
                  </div>
                </div>
              )
            })}

          </div>

        </div>

      </div>
    )
  }
});
