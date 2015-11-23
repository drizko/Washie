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
      initialPosition: 'unknown',
      lastPosition: 'unknown'
    };
  },

  render() {
    return (
        <View style={styles.selector}>
            <SegmentedControlIOS
                values={this.state.values}
                onValueChange={this._onValueChange} />
        </View>
    );
  },

  _onValueChange(value) {
      navigator.geolocation.getCurrentPosition(
          (initialPosition) => this.setState({initialPosition}),
          (error) => alert(error.message),
          {enableHighAccuracy: true, timeout: 20000, maximumAge: 10000}
      );
      navigator.geolocation.watchPosition((lastPosition) => {
          console.log(this.state.lastPosition);
          this.setState({lastPosition});
          console.log("this.state");
          console.log(this.state.lastPosition.coords.longitude);
      });

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
        <View style={styles.selector}>
            <SegmentedControlIOS
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

		this.state = {
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
        var valueObj = {}

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
        // store.get('creds').then((creds) => {
        //     return fetch('http://localhost:8080/api/jobs',  {
        //         method: 'post',
        //         headers: {
        //             'Accept': 'application/json',
        //             'Content-Type': 'application/json'
        //         },
        //         body: JSON.stringify({
        //             user_email      : creds.user_email,
        //             status          : "open",
        //             vehicle_type    : "car",
        //             location        : "10020 W Meritage Ct. Sun Valley, CA 91352",
        //             zip_code        : "91352",
        //             wash_level      : "basic",
        //             price           : "$25"
        //         })
        //     })
        // })
        // .then( response => {
        //
        //     console.log(response);
        //
        //     if (response.status === 200) {
        //         this.setState({
        //             success: true,
        //             badCredentials: false,
        //             loggedIn: true,
        //             showProgress: false
        //         })
        //     } else {
        //         this.setState({
        //             success: false,
        //             badCredentials: true,
        //             showProgress: false
        //         })
        //     }
        // })
        // .catch( err => {
        //     console.log("err");
        //     console.log(err);
        // })

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
      fontSize: 24,
      textAlign: 'center',
      fontWeight: '500',
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
