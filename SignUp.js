'use strict';

var React = require('react-native');

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
		}
	}

	render() {
        var errorCtrl = <View />;

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

        return(
            <View style={styles.container}>
                <Text style={styles.heading}>
                    Washie
                </Text>

                <TextInput style={styles.input}
                    autoCapitalize='words'
                    onChangeText={ (text) => AsyncStorage.setItem('firstName', text) }
                    placeholder="Firstname" />
                <TextInput style={styles.input}
                    autoCapitalize='words'
                    onChangeText={ (text) => AsyncStorage.setItem('lastName', text) }
                    placeholder="Lastname" />
                <TextInput style={styles.input}
                    autoCapitalize="none"
                    onChangeText={ (text) => AsyncStorage.setItem('email', text) }
                    placeholder="E-Mail" />
                <TextInput style={styles.input}
                    keyboardType='numeric'
                    onChangeText={ (text) => AsyncStorage.setItem('mobile', text) }
                    placeholder="Mobile Number" />
                <TextInput style={styles.input}
                    onChangeText={ (text) => AsyncStorage.setItem('password', text) }
                    placeholder="Password"
                    secureTextEntry={true}/>
                <TextInput style={styles.input}
                    onChangeText={ (text) => AsyncStorage.setItem('confirmPass', text) }
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
        var valueObj = {};
        AsyncStorage.getItem('firstName')
        .then( value => {
            valueObj.firstName = value;
            return AsyncStorage.getItem('lastName')
        })
        .then( value => {
            valueObj.lastName = value;
            this.setState({emailValid: true})
            return AsyncStorage.getItem('email')
        })
        .then( value => {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if(!re.test(value)){
                this.setState({emailValid: false})
                this.setState({mobileValid: true})
                throw "e-mail must be valid"
            }
            this.setState({emailValid: true})
            valueObj.email = value;
            return AsyncStorage.getItem('mobile')
        })
        .then( value => {
            var re = /^\d{10}$/;
            if(!re.test(value)){
                this.setState({mobileValid: false})
                throw "Mobile number must be 10 digits"
            }
            this.setState({mobileValid: true})
            valueObj.mobile = value;
            return AsyncStorage.getItem('password')
        })
        .then( value => {
            var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
            if(!re.test(value)){
                this.setState({passValid: false})
                this.setItem({confirmValid: true})
                throw "Password must be at 8-20 characters long with at least 1 numberic digit and one captial letter"
            }
            this.setState({passValid: true})
            valueObj.password = value;
            return AsyncStorage.getItem('confirmPass')
        })
        .then( value => {
            if(value !== valueObj.password){
                this.setState({'confirmValid': false})
                this.setState({'passValid': true})
                throw "Passwords must match"
            }
            this.setState({'confirmValid': true})
            return fetch('http://localhost:8080/api/users/', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName   : valueObj.firstName,
                    lastName    : valueObj.lastName,
                    email       : valueObj.email,
                    mobile      : valueObj.mobile,
                    password    : valueObj.password
                })
            })
        })
        .then( response => {
            console.log(response)
        })
        .catch( err => {
            console.log(err);
        });
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
