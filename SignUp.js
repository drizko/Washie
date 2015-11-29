'use strict';

var React = require('react-native');
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
  AsyncStorage
} = React;


class SignUp extends Component {
	constructor(props){
		super(props);

		this.state = {
            emailValid: true,
            mobileValid: true,
            passValid: true,
            confirmValid: true,
            success: false,
            badCredentials: false,
            loggedIn: false,
            showProgress: false
		}
	}

	render() {
        var errorCtrl = <View />;

        if(this.state.loggedIn){
            return (
                <Map />
            )
        }

        if(!this.state.emailValid){
			errorCtrl = <Text style={styles.error}>
                E-Mail needs to be valid
            </Text>
		}

        if(!this.state.mobileValid){
            errorCtrl = <Text style={styles.error}>
                10 digit mobile number required
            </Text>
        }

        if(!this.state.passValid){
            errorCtrl = <Text style={styles.error}>
                Password must be at 8-20 characters long with at least 1 numberic digit and one captial letter
            </Text>
        }

        if(!this.state.confirmValid){
            errorCtrl = <Text style={styles.error}>
                Passwords must match
            </Text>
        }

        if(this.state.loggedIn){
            return (
                <Map />
            )
        }

        return(
            <View style={styles.container}>
                <Text style={styles.heading}>
                    Washie
                </Text>

                <TextInput style={styles.input}
                    autoCapitalize='words'
                    onChangeText={ (text) => this.setState({'firstName': text}) }
                    placeholder="Firstname" />
                <TextInput style={styles.input}
                    autoCapitalize='words'
                    onChangeText={ (text) => this.setState({'lastName': text}) }
                    placeholder="Lastname" />
                <TextInput style={styles.input}
                    autoCapitalize="none"
                    onChangeText={ (text) => this.setState({'email': text}) }
                    placeholder="E-Mail" />
                <TextInput style={styles.input}
                    keyboardType='numeric'
                    onChangeText={ (text) => this.setState({'mobile': text}) }
                    placeholder="Mobile Number" />
                <TextInput style={styles.input}
                    onChangeText={ (text) => this.setState({'password': text}) }
                    placeholder="Password"
                    secureTextEntry={true}/>
                <TextInput style={styles.input}
                    onChangeText={ (text) => this.setState({'confirmPass': text}) }
                    placeholder="Confirm Password"
                    secureTextEntry={true} />
                <TouchableHighlight
                    onPress={this.onRegisterPressed.bind(this)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableHighlight>
                {errorCtrl}
            </View>
        )
    }

    // Need to fill this in for Register button
    onRegisterPressed(){

        this.setState({ showProgress: true }, () => {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(this.state.email)){
                this.setState({emailValid: false})
                this.setState({mobileValid: true})
                return "EMail address must be valid"
            } else {
                this.setState({emailValid: true})
            }

            var re = /^\d{10}$/;
            if(!re.test(this.state.mobile)){
                this.setState({mobileValid: false})
                return "Mobile number must be 10 digits"
            } else {
                this.setState({'mobileValid': true})
            }

            var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
            if(!re.test(this.state.password)){
                this.setState({passValid: false})
                this.setState({confirmValid: true})
                return "Password must be at 8-20 characters long with at least 1 numberic digit and one captial letter"
            } else {
                this.setState({'passValid': true})
            }

            if(this.state.password !== this.state.confirmPass){
                this.setState({'confirmValid': false})
                this.setState({'passValid': true})
                return "Passwords must match"
            } else {
                this.setState({'confirmValid': true})
            }

            return fetch('http://localhost:8080/api/users',  {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName   : this.state.firstName,
                    lastName    : this.state.lastName,
                    email       : this.state.email,
                    mobile      : this.state.mobile,
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
                    throw "Something went bad"
                }
            }).
            catch( err => {
                console.log("err");
                console.log(err);
            })
        })
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
    error: {
        color: 'red',
        paddingTop: 10
    }
})

module.exports = SignUp;
