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
  Component
} = React;


class SignUp extends Component {
	constructor(props){
		super(props);

		this.state = {
		}
	}

	render() {
        return(
            <View style={styles.container}>
                <Text style={styles.heading}>
                    Washie
                </Text>

                <TextInput style={styles.input}
                    onChangeText={ (text) => this.setState( {firstName: text} ) }
                    placeholder="Firstname" />
                <TextInput style={styles.input}
                    onChangeText={ (text) => this.setState( {lastName: text} ) }
                    placeholder="Lastname" />
                <TextInput style={styles.input}
                    autoCapitalize="none"
                    onChangeText={ (text) => this.setState( {email: text} ) }
                    placeholder="E-Mail" />
                <TextInput style={styles.input}
                    onChangeText={ (text) => this.setState({password: text}) }
                    placeholder="Password"
                    secureTextEntry={true}/>
                <TextInput style={styles.input}
                    onChangeText={ (text) => {
                        this.setState({confirmPass: text})
                        if(this.state.password === this.state.confirmPass){
                        }
                    }}
                    placeholder="Confirm Password"
                    secureTextEntry={true} />
                <TouchableHighlight
                    onPress={this.onRegisterPressed.bind(this)}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Register</Text>
                </TouchableHighlight>
            </View>
        )
    }
    onRegisterPressed(){
        this.setState({showProgress: true});
        this.props.onLogin();
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
		width: 16,
		height: 16
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
    verified:{
		height: 50,
		marginTop: 10,
		padding: 4,
		fontSize: 18,
		borderWidth: 1,
        borderRadius: 5,
		borderColor: "#66FF33"
	},
    wrong:{
        height: 50,
        marginTop: 10,
        padding: 4,
        fontSize: 18,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "#CC0000"
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

module.exports = SignUp;
