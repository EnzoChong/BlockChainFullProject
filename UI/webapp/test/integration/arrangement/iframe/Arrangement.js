sap.ui.define([
	"sap/ui/test/Opa5"
], function (Opa5) {
	"use strict";

	function getFrameUrl(sHash, sUrlParameters) {
		var sUrl = jQuery.sap.getResourcePath("sap/ems/ui/app/blockchain/app", ".html");
		sHash = sHash || "";
		sUrlParameters = sUrlParameters ? "?" + sUrlParameters : "";

		if (sHash) {
			sHash = "#App-display&/" + (sHash.indexOf("/") === 0 ? sHash.substring(1) : sHash);
		} else {
			sHash = "#App-display";
		}

		return sUrl + sUrlParameters + sHash;
	}

	return Opa5.extend("sap.ems.ui.app.blockchain.test.arrangement.Arrangement", {

		iStartTheApp: function (oOptions) {
			var sUrlParameters;
			oOptions = oOptions || {
				delay: 0
			};

			// Start the app with a minimal delay to make tests run fast but still async to discover basic timing issues
			var iDelay = oOptions.delay || 50;

			sUrlParameters = "serverDelay=" + iDelay;
			this.iStartMyAppInAFrame(getFrameUrl(oOptions.hash, sUrlParameters));
		}

	});
});