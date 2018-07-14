sap.ui.define([
	'sap/ui/test/Opa5',
	"sap/ui/thirdparty/sinon"
], function (Opa5) {
	"use strict";

	function addSafeForLater() {
		var sStateToAdd;
		if (window.location.search) {
			sStateToAdd = "&";
		} else {
			sStateToAdd = "?";
		}

		sStateToAdd += "safeForLater=true";

		window.history.replaceState("dummy", {}, window.location.pathname + window.location.search + sStateToAdd + window.location.hash);
	}

	return Opa5.extend("sap.ems.ui.app.blockchain.test.arrangement.Arrangement", {
		iStartTheApp: function (oOptions) {
			oOptions = oOptions || {
				hash: "",
				timeout: 15
			};

			return this.iStartMyUIComponent({
				componentConfig: {
					name: "sap.ems.ui.app.blockchain"
				},
				hash: oOptions.hash,
				timeout: oOptions.timeout
			});
		},

		// feature toggle tests
		iStartTheAppSafeForLaterActivated: function () {
			if (!jQuery.sap.getUriParameters().get("safeForLater")) {
				addSafeForLater();
			}
			return this.iStartMyApp();
		}
	});
});