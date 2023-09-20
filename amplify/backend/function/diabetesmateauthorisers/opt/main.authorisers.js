const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const jwksUri = `https://cognito-idp.${process.env.REGION}.amazonaws.com/${process.env.AUTH_DIABETESMATE_USERPOOLID}/.well-known/jwks.json`;

const client = jwksClient({
    jwksUri: jwksUri
});

function getKey(header, callback){
    client.getSigningKey(header.kid, function(err, key) {
      var signingKey = key.publicKey || key.rsaPublicKey;
      callback(null, signingKey);
    });
}

module.exports = {
    async authoriseRequest(token){
        if(!token){
            return null;
        }
        return new Promise((resolve, reject) => {
            jwt.verify(token, getKey, {
              algorithms: ['RS256']
            }, function(err, decoded) {
              if (err) {
                reject("Unauthorized");
              } else {
                resolve(decoded);
              }
            });
          })
          .then((decodedToken) => {
            return decodedToken;
          })
          .catch((err) => {
            console.log("User unauthorized:", err);
            return null;
          });
    }
};