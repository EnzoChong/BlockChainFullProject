sap.ui.define([
	"sap/ui/test/Opa5",
	"sap/ems/ui/app/blockchain/test/arrangement/Arrangement",
	// QUnit additions
	"sap/ui/qunit/qunit-css",
	"sap/ui/qunit/qunit-junit",
	"sap/ui/qunit/qunit-coverage"
], function (Opa5, Arrangement) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Arrangement(),
		actions: new Opa5({
			iLookAtTheScreen: function () {
				return this;
			}
		}),
		viewNamespace: "sap.ems.ui.app.blockchain.view.",
		autoWait: true
	});

});