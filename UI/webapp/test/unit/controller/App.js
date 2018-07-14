sap.ui.require([
	"sap/ui/model/resource/ResourceModel",
	"sap/ems/ui/app/blockchain/controller/App.controller",
	"sap/ui/thirdparty/sinon",
	"sap/ui/thirdparty/sinon-qunit"
], function (ResourceModel) {
	"use strict";

	// Module template, simple example
	QUnit.module("Object - functionality under test ", {
		beforeEach: function () {
			// prepare something before each test
		},
		afterEach: function () {
			// clean up after each test
		},
		before: function () {
			// prepare something once for all tests
			this._oResourceModel = new ResourceModel({
				bundleUrl: jQuery.sap.getModulePath("sap.ems.ui.app.blockchain", "/i18n/i18n.properties")
			});
		},
		after: function () {
			// clean up once after all tests are done
			this._oResourceModel.destroy();
		}
	});
	// Should test description
	QUnit.test("Should all assertions are true", function (assert) {
		// Arrange

		// Act(System under test)

		// Assert
		assert.ok(1, "1 should have been truthy");
		assert.ok(!false, "!false should have been truthy");
		assert.equal(1 + 1, 2, "1+1 should have equaled 2");
		assert.equal(1, true, "1 should have been converted to true");
		assert.strictEqual("there", "there");
		assert.notEqual(Math.PI, 3.1415);
		assert.notEqual({}, {});
		assert.notStrictEqual(1, "1");
		assert.deepEqual({}, {});
		assert.deepEqual([1, 2], [1, 2]);
		assert.notDeepEqual({
			f: "this"
		}, {
				f: "that"
			});
		assert.throws(function () {
			"anna".reverse();
		}, TypeError, "function should have thrown TypeError");
	});
});