'use strict';

var phantomjs = require('phantomjscore');
var network = phantomjs.networks.phantom;
var ed = {};

ed.makeKeypair = function (seed) {
	return phantomjs.crypto.getKeys(seed);
};

ed.sign = function (hash, keypair) {
	return keypair.sign(hash).toDER().toString("hex");
};

ed.verify = function (hash, signatureBuffer, publicKeyBuffer) {
	try {
		var ecsignature = phantomjs.ECSignature.fromDER(signatureBuffer);
		var ecpair = phantomjs.ECPair.fromPublicKeyBuffer(publicKeyBuffer, network);
		return ecpair.verify(hash, ecsignature);
	} catch (error){
		return false;
	}
};

module.exports = ed;