'use strict';

var React = require('react-native');
var Login = require('./Login')

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight,
  SegmentedControlIOS,
  Component,
  AsyncStorage,
  MapView,
  AlertIOS
} = React;

var WashSelector = React.createClass({
  getInitialState() {
    return {
      values: ['Basic', 'Extra', 'Detail'],
      value: 'Not selected',
    };
  },

  render() {
    return (
        <View>
            <SegmentedControlIOS
                style={styles.selector}
                values={this.state.values}
                onValueChange={this._onValueChange} />
        </View>
    );
  },

  _onValueChange(value) {
      AsyncStorage.setItem('wash_level', value)
      this.setState({
          value: value,
      });
    }
});

var VehicleSelector = React.createClass({
  getInitialState() {
    return {
      values: ['Car', 'Truck / SUV'],
      value: 'Not selected',
    };
  },

  render() {
    return (
        <View>
            <SegmentedControlIOS
                style={styles.selector}
                values={this.state.values}
                onValueChange={this._onValueChange} />
        </View>
    );
  },

  _onValueChange(value) {
      AsyncStorage.setItem('vehicle_type', value)
      this.setState({
      value: value,
    });
  }
});

class Map extends Component {
	constructor(props){
		super(props);

        navigator.geolocation.getCurrentPosition(
            (initialPosition) => this.setState({initialPosition}),
            (error) => alert(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000}
        );
        navigator.geolocation.watchPosition((lastPosition) => {
            this.setState({lastPosition});
            AsyncStorage.setItem('longitude', this.state.lastPosition.coords.longitude.toString());
            AsyncStorage.setItem('latitude', this.state.lastPosition.coords.latitude.toString());
        });

        this.state = {
            initialPosition: 'unknown',
            lastPosition: 'unknown',
		}
	}

    render() {
        return (
            <View style={styles.container}>
                <MapView style={styles.map} showsUserLocation={true} maxDelta={1}
                    mapType={'hybrid'}/>
                <WashSelector />
                <VehicleSelector />
                <TouchableHighlight style={styles.button} onPress={this.onRequestPressed.bind(this)}>
                    <Text style={styles.buttonText}>Request Car Wash</Text>
                </TouchableHighlight>
            </View>
        );
    }

    onRequestPressed() {

        var valueObj = {};
        var locationObj = {};

        var googleAPI = 'https://maps.googleapis.com/maps/api/geocode/json'



        AsyncStorage.getItem('wash_level')
        .then( value => {
            valueObj.wash_level = value;
            return AsyncStorage.getItem('vehicle_type')
        })
        .then( value => {
            valueObj.vehicle_type = value;
            return AsyncStorage.getItem('creds')
        })
        .then( value => {
            valueObj.user_email = value;
                return fetch('http://localhost:8080/api/jobs',  {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        user_email      : valueObj.user_email,
                        status          : "Open",
                        vehicle_type    : valueObj.vehicle_type,
                        location        : "10020 W Meritage Ct. Sun Valley, CA 91352",
                        zip_code        : "91352",
                        wash_level      : valueObj.wash_level,
                        price           : "$125"
                    })
                })
            })
            .catch( err => {
                console.log("err");
                console.log(err);
            })

        console.log(valueObj);
        this.setState({ showProgress: true })
	}
}

var styles = StyleSheet.create({
    container: {
		backgroundColor: '#F5FCFF',
		flex: 1,
		paddingTop: 25
	},
    button:{
      height: 50,
      backgroundColor: "#48bbEC",
      borderRadius: 5,
      alignSelf: "stretch",
      margin: 10,
      justifyContent: 'center'
    },
    selector: {
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
  },
    buttonText: {
        fontSize: 22,
        color: "#FFF",
        alignSelf: "center"
    },
    map: {
        flex: 1,
        margin: 0,
        borderWidth: 1,
        borderColor: '#000000'
    },
});

module.exports = Map;
