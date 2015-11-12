/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var SignUp = require('./SignUp')
var Map = require('./Map')
var Login = require('./Login')

var {
  AppRegistry,
} = React;

var Washie = React.createClass({
    getInitialState: function(){
        return {
            isLoggedIn: false,
            isSignUp: false
        }
    },

    onLogin: function(){
        this.setState({isLoggedIn: true})
        this.setState({showProgress: false})
    },

    onSignUp: function(){
        this.setState({isSignUp: true})
        this.setState({showProgress: false})
    },

    render: function() {
        if (this.state.isLoggedIn) {
          return (
              <Map />
            )
        } else if (this.state.isSignUp){
            return (
              <SignUp onLogin={this.onLogin}/>
            );
        } else {
          return (
            <Login onLogin={this.onLogin} onSignUp={this.onSignUp}/>
          );
        }
    }
});

AppRegistry.registerComponent('Washie', () => Washie);
