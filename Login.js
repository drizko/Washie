'use strict'

var React = require('react-native');
var buffer = require('buffer');
var authService = require('./AuthService');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  Component,
  ActivityIndicatorIOS
} = React;


class Login extends Component {
	constructor(props){
		super(props);

		this.state = {
			showProgress: false
		}
	}

	render() {
		var errorCtrl = <View />;

		if(!this.state.success && this.state.badCredentials){
			errorCtrl = <Text style={styles.error}>
                Username or Password is incorrect
            </Text>
		}

		if(!this.state.success && this.state.unknownError){
			errorCtrl = <Text style={styles.error}>
							Unknown Error
					</Text>
		}
		return (
				<View style={styles.container}>
					<Text style={styles.heading}>
						Github Browser
					</Text>

					<TextInput style={styles.input}
						onChangeText={ (text) => this.setState( {userName: text} ) }
						placeholder="Github Username" />


					<TextInput style={styles.input}
						onChangeText={ (text) => this.setState( {password: text} ) }
						placeholder="Github Password"
						secureTextEntry={true}/>

					<TouchableHighlight
						onPress={this.onLoginPressed.bind(this)}
						style={styles.button}>
						<Text style={styles.buttonText}>Log In</Text>
					</TouchableHighlight>
                    <TouchableHighlight
						onPress={this.onSignUpPressed.bind(this)}
						style={styles.button}>
						<Text style={styles.buttonText}>Sign Up</Text>
					</TouchableHighlight>

					{errorCtrl}

					<ActivityIndicatorIOS
						animating={this.state.showProgress}
						size="large"
						style={styles.loader}
						/>


				</View>
			);
	}

	onLoginPressed() {
		console.log("Attempting to login with "+ this.state.userName);
		this.setState({showProgress: true});
        this.props.onLogin();
	}
    onSignUpPressed() {
        console.log(this);
        this.setState({showProgress: true});
        this.props.onSignUp();
    }
};

var styles = StyleSheet.create({
	container: {
		backgroundColor: '#F5FCFF',
		flex: 1,
		paddingTop: 40,
		alignItems: 'center',
		padding: 10
	},
	logo: {
		width: 66,
		height: 55
	},
	heading: {
		fontSize: 30,
		marginTop: 10
	},
	input:{
		height: 50,
		marginTop: 10,
		padding: 4,
		fontSize: 18,
		borderWidth: 1,
		borderColor: "#48bbEC"
	},
	button:{
		height: 50,
		backgroundColor: "#48bbEC",
		alignSelf: "stretch",
		marginTop: 10,
		justifyContent: 'center'
	},
	buttonText: {
		fontSize: 22,
		color: "#FFF",
		alignSelf: "center"
	},

	loader: {
		marginTop: 20
	},

	error: {
		color: 'red',
		paddingTop: 10
	}
})

// var GithubBrowser = React.createClass({
// 	var messsage = "hello there";
// 	render: function(){
// 		<Text>Hello From Login.js</Text>
// 	}
// })

// var styles = StyleSheet.create({
// 	container: {
// 		backgroundColor : '#F5FCFF',
// 		flex : 1
// 	}
// })

module.exports = Login;
