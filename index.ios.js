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
  StyleSheet,
  Text,
  View,
  TouchableHighlight
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

var styles = StyleSheet.create({
    container: {
		backgroundColor: '#F5FCFF',
		flex: 1,
		paddingTop: 40,
		padding: 10
	},
    title: {
  fontWeight: '500',
},
  button:{
      height: 50,
      backgroundColor: "#48bbEC",
      borderRadius: 5,
      alignSelf: "stretch",
      marginTop: 10,
      justifyContent: 'center'
  },
  buttonText: {
      fontSize: 22,
      color: "#FFF",
      alignSelf: "center"
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  map: {
    height: 250,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },
});

AppRegistry.registerComponent('Washie', () => Washie);
