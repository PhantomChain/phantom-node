'use strict';

var phantomjs = require('phantomjs');

function Crypto(scope){
	this.scope = scope;
	this.network = scope.config.network;
}

Crypto.prototype.makeKeypair = function (seed) {
	return phantomjs.crypto.getKeys(seed, this.network);
};

Crypto.prototype.sign = function (hash, keypair) {
	return keypair.sign(hash).toDER().toString("hex");
};

Crypto.prototype.verify = function (hash, signatureBuffer, publicKeyBuffer) {
	try {
		var ecsignature = phantomjs.ECSignature.fromDER(signatureBuffer);
		var ecpair = phantomjs.ECPair.fromPublicKeyBuffer(publicKeyBuffer, this.network);
		return ecpair.verify(hash, ecsignature);
	} catch (error){
		return false;
	}
};

module.exports = Crypto;
