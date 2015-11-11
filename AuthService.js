
var buffer = require('buffer');
var AsyncStorage = require('react-native').AsyncStorage;
var _ = require('lodash')

const authKey = 'auth';
const userKey = 'user';

class AuthService{

	getAuthInfo(cb){
		// AsyncStorage.multiSet([
		// 			[authKey, ''],
		// 			[userKey, '']
		// 		], (err) => {
		// 			if(err){
		// 				throw err;
		// 			}

		// 			//return cb({success: true});
		// 		});

		AsyncStorage.multiGet([authKey,userKey], (err, val) => {
			if(err){
				return cb(err);
			}

			if(!val){
				return cb();
			}

			var zippedObj = _.zipObject(val);
			if(!zippedObj[authKey]){
				return cb();
			}

			var authInfo = {
				header: {
					Authorization: 'Basic ' + zippedObj[authKey]
				},
				user: JSON.parse(zippedObj[userKey])
			}

			return cb(null, authInfo);
		})
	}

	login(creds, cb){
		var b = new buffer.Buffer(creds.userName +
				':' + creds.password
			);

		var encodedAuth = b.toString('base64');
		console.log(encodedAuth);

		fetch('https://api.github.com/user', {
			headers: {
				Authorization: 'Basic ' + encodedAuth
			}
		})
		.then( (response) => {
			if(response.status >=200 && response.status < 300){
				return response;
			}

			throw {
				badCredentials: response.status == 401,
				unknownError: response.status != 401
			}

		})
		.then( (response) => {
			return response.json();
		})
		.then( (results) => {

			//this.setState({success: true});

			AsyncStorage.multiSet([
					[authKey, encodedAuth],
					[userKey, JSON.stringify(results) ]
				], (err) => {
					if(err){
						throw err;
					}

					return cb({success: true});
				});


			cb({success: true})
			console.log(results);


			// this.setState({showProgress:false});
		})
		.catch( (err) => {
			console.log('Login failed ' + err);
			//this.setState(err);
			return cb(err);
		})
		// .finally( ()=>{
		// 	this.setState({showProgress:false});
		// })

	}
}

module.exports = new AuthService();
