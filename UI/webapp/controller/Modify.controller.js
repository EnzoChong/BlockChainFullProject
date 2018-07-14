sap.ui.define([
	"sap/ems/ui/app/blockchain/common/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ems/ui/app/blockchain/common/Constants"
], function (BaseController, JSONModel, Constants) {
	"use strict";

	var oViewModeType = {
		edit: Constants.routeName.EDIT,
		copy: Constants.routeName.COPY,
		creation: Constants.routeName.CREATION
	};
	var oDefaultSettings = {
		edit: {
			OrderID: {
				editable: false
			}
		},
		copy: {
			OrderID: {
				editable: true
			}
		},
		creation: {
			OrderID: {
				editable: true
			}
		}
	};

	return BaseController.extend("sap.ems.ui.app.blockchain.controller.Modify", {
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sap.ems.ui.app.blockchain.view.Modify
		 */
		onInit: function () {
			jQuery.each(oViewModeType, function (sKey, sValue) {
				this.getRouter().getRoute(sValue).attachMatched(this._onRouteMatched, this);
			}.bind(this));

			this._sViewMode = "";
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf sap.ems.ui.app.blockchain.view.Modify
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf sap.ems.ui.app.blockchain.view.Modify
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf sap.ems.ui.app.blockchain.view.Modify
		 */
		//	onExit: function() {
		//
		//	}

		_onRouteMatched: function (oEvent) {

			switch (oEvent.getParameters().name) {
				case oViewModeType.edit:
					this._sViewMode = oViewModeType.edit;
					break;
				case oViewModeType.copy:
					this._sViewMode = oViewModeType.copy;
					break;
				case oViewModeType.creation:
					this._sViewMode = oViewModeType.creation;
					break;
				default:
			}
			this.setModel(new JSONModel(oDefaultSettings[this._sViewMode]), "ModifyViewModel");
			this.setModel(new JSONModel({
				"OrderID": 10248
			}));
		},

		onSave: function () {
			var that = this;
			if (that._sViewMode === oViewModeType.copy) {
				that.navTo(Constants.routeName.DISPLAY, {
					orderId: that.getModel().getData().OrderID
				}, true);
			} else {
				that.navBack();
			}
		},
		onCancel: function () {
			this.navBack();
		}
	});

});