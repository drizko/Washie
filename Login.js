'use strict'

var React = require('react-native');
var buffer = require('buffer');
var Map = require('./Map')

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  Component,
  Activity,
  ActivityIndicatorIOS,
  AsyncStorage
} = React;

class Login extends Component {
	constructor(props){
		super(props);

		this.state = {
            success: false,
            badCredentials: false,
            loggedIn: false,
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

        if(this.state.loggedIn){
            return (
                <Map />
            )
        }
		return (
			<View style={styles.container}>
				<Text style={styles.heading}>
					Washie
				</Text>

				<TextInput style={styles.input}
					onChangeText={ (text) => this.setState( {email: text} ) }
					placeholder="E-Mail" />


				<TextInput style={styles.input}
					onChangeText={ (text) => this.setState( {password: text} ) }
					placeholder="Password"
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
        this.setState({ showProgress: true })
        fetch('http://localhost:8080/api/login',  {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email       : this.state.email,
                password    : this.state.password
            })
        }).
        then( response => {

            if (response.status === 200) {
                AsyncStorage.setItem('creds', this.state.email)
                this.setState({
                    success: true,
                    badCredentials: false,
                    loggedIn: true,
                    showProgress: false
                })
            } else {
                this.setState({
                    success: false,
                    badCredentials: true,
                    showProgress: false
                })
            }
        }).
        catch( err => {
            console.log("err");
            console.log(err);
        })
	}
    onSignUpPressed() {
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
        borderRadius: 5,
		borderColor: "#48bbEC"
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
	loader: {
		marginTop: 20
	},
	error: {
		color: 'red',
		paddingTop: 10
	}
})

module.exports = Login;
