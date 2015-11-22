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
  MapView
} = React;

class Map extends Component {
	constructor(props){
		super(props);

		this.state = {
		}
	}

    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.map} showsUserLocation={true} maxDelta={.009}
                    mapType={'hybrid'}/>
                <TouchableHighlight style={styles.button} onPress={this.onRequestPressed.bind(this)}>
                    <Text style={styles.buttonText}>Request Car Wash</Text>
                </TouchableHighlight>
            </View>
        );
    }
    onRequestPressed() {
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

            console.log(response);

            if (response.status === 200) {
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

}

var styles = StyleSheet.create({
    container: {
		backgroundColor: '#F5FCFF',
		flex: 1,
		paddingTop: 20
	},
    button:{
      height: 50,
      backgroundColor: "#48bbEC",
      borderRadius: 5,
      alignSelf: "stretch",
      marginTop: 5,
      marginRight: 5,
      marginLeft: 5,
      justifyContent: 'center'
    },
    buttonText: {
        fontSize: 22,
        color: "#FFF",
        alignSelf: "center"
    },
    map: {
        height: 400,
        margin: 0,
        borderWidth: 1,
        borderColor: '#000000'
    },
});

module.exports = Map;
