/*!
 * ${copyright}
 */
sap.ui.define([
	"sap/ems/ui/app/blockchain/common/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ems/ui/lib/moment-with-locales.min",
	"sap/ems/ui/lib/lodash.min"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("sap.ems.ui.app.blockchain.controller.App", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sap.ems.ui.app.blockchain.view.App
		 */
		onInit: function () {
			BaseController.apply(this, arguments);

		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf sap.ems.ui.app.blockchain.view.App
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf sap.ems.ui.app.blockchain.view.App
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf sap.ems.ui.app.blockchain.view.App
		 */
		//	onExit: function() {
		//
		//	}

		// event-focused name pattern:on[Control Name][Event Name]
		// onSaveButtonPress: function() {

		// },
	});
});