const jwt = require('jsonwebtoken');

module.exports = {
	decode: (token) => {
		return jwt.decode(token, {complete: true});
	}
}