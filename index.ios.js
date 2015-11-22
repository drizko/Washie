/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var SignUp = require('./SignUp')
var Login = require('./Login')

var {
  AppRegistry
} = React;

var Washie = React.createClass({
    getInitialState: function(){
        return {
            isLoggedIn: false,
            isSignUp: false,
        }
    },

    onSignUp: function(){
        this.setState({ isSignUp: true })
    },

    onRegister: function(){
        this.setState({ isLoggedIn: true })
    },

    render: function() {
        if (this.state.isLoggedIn) {
          return (
              <Map />
            )
        } else if (this.state.isSignUp){
            return (
              <SignUp onRegister={this.onRegister}/>
            );
        } else {
          return (
            <Login onLogin={this.onLogin} onSignUp={this.onSignUp}/>
          );
        }
    }
});

AppRegistry.registerComponent('Washie', () => Washie);
