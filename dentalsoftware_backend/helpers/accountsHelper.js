const sjcl = require('sjcl');

function sha256(message) {
    let myBitArray = sjcl.hash.sha256.hash(message)
    return sjcl.codec.hex.fromBits(myBitArray)
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

module.exports = {sha256, makeid}