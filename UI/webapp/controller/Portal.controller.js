sap.ui.define([
	"sap/ems/ui/app/blockchain/common/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ems/ui/app/blockchain/common/Constants"
], function(BaseController, JSONModel, Constants) {
	"use strict";

	return BaseController.extend("sap.ems.ui.app.blockchain.controller.Portal", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sap.ems.ui.app.blockchain.view.Detail
		 */
		onInit: function() {
			this.getRouter().getRoute("order").attachMatched(this._onRouteMatched, this);
		},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf sap.ems.ui.app.blockchain.view.Detail
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf sap.ems.ui.app.blockchain.view.Detail
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf sap.ems.ui.app.blockchain.view.Detail
		 */
		//	onExit: function() {
		//
		//	}
		onBlockChainPress: function() {
			this.navTo("display");
		},
		onCustomerAppPress: function() {
			this.navTo("customerlist");
		},
		onNewEntitlementPress:function(){
				this.navTo("newentitlement");
		},
		_onRouteMatched: function(oEvent) {
			this.setModel(new JSONModel({
				"OrderID": 10248
			}));
		},

		onEdit: function() {
			this.navTo(Constants.routeName.EDIT, {
				orderId: this.getModel().getData().OrderID
			});
		},

		onDelete: function() {
			this.navBack();
		},

		onCopy: function() {
			this.navTo(Constants.routeName.COPY, {
				orderId: this.getModel().getData().OrderID
			}, true);
		}

	});

});