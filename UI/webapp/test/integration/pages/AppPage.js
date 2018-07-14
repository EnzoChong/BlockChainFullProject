sap.ui.define([
	'sap/ui/test/Opa5',
	'sap/ui/test/matchers/AggregationFilled',
	'sap/ui/test/matchers/AggregationEmpty',
	'sap/ui/test/matchers/Properties',
	'sap/ui/test/matchers/AggregationContainsPropertyEqual',
	'sap/ui/test/matchers/AggregationLengthEquals',
	'sap/ui/test/matchers/BindingPath',
	'sap/ui/test/matchers/Ancestor',
	'sap/ui/test/actions/Press',
	'sap/ui/test/actions/EnterText'
], function (
	Opa5,
	AggregationFilled,
	AggregationEmpty,
	Properties,
	AggregationContainsPropertyEqual,
	AggregationLengthEquals,
	BindingPath,
	Ancestor,
	Press,
	EnterText) {
		"use strict";

		Opa5.createPageObjects({
			onMyPageUnderTest: {
				actions: {
					iDoMyAction: function () {
						return this.waitFor({
							id: "ControlId",
							viewName: "ViewName",
							actions: new Press(),
							errorMessage: "Was not able to find the control with the id ControlId"
						});
					}
				},
				assertions: {
					iDoMyAssertion: function () {
						return this.waitFor({
							id: "ControlId2",
							viewName: "ViewName",
							success: function () {
								Opa5.assert.ok(false, "Implement me");
							},
							errorMessage: "Was not able to find the control with the id ControlId2"
						});
					}
				}
			}
		});
	});