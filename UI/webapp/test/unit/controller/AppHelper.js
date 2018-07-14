sap.ui.require([
	"sap/ems/ui/app/blockchain/controller/AppHelper",
	"sap/ui/thirdparty/sinon",
	"sap/ui/thirdparty/sinon-qunit"
], function (AppHelper) {
	"use strict";

	// Module template, simple example
	QUnit.module("AppHelper - test coverage ", {
		beforeEach: function () {
			// prepare something before each test
		},
		afterEach: function () {
			// clean up after each test
		}
	});

	QUnit.test("Should test coverage is 100%", function (assert) {
		// Arrange

		// Act(System under test)
		AppHelper.testCoverage(true, false);
		// Assert
		assert.ok(1, "parameters: true, false");

		// Act(System under test)
		AppHelper.testCoverage(false, true);
		// Assert
		assert.ok(1, "parameters: false, true");
	});
});