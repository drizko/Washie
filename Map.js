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
                <TouchableHighlight style={styles.button}>
                    <Text style={styles.buttonText}>Request</Text>
                </TouchableHighlight>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
		backgroundColor: '#F5FCFF',
		flex: 1,
		paddingTop: 40,
		padding: 10
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
    map: {
        height: 250,
        margin: 10,
        borderWidth: 1,
        borderColor: '#000000',
    },
});

module.exports = Map;
