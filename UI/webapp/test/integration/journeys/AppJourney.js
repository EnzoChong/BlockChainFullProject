sap.ui.define([
	"sap/ui/test/opaQunit"
], function (opaTest) {
	"use strict";

	QUnit.module("moduleName");

	opaTest("Should TestDesctiption", function (Given, When, Then) {
		//Arrangements
		Given.iStartTheApp();

		//Actions
		When.onMyPageUnderTest.iDoMyAction();

		//Assertions
		Then.onMyPageUnderTest.iDoMyAssertion();
	});

});