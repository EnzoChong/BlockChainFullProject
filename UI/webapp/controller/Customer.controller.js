sap.ui.define([
	"sap/ems/ui/app/blockchain/common/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ems/ui/app/blockchain/common/Constants",
	"sap/ems/ui/app/blockchain/model/Blockchain",
	'sap/ems/ui/app/blockchain/common/BaseValidator',
	'sap/m/MessageToast'
], function(BaseController, JSONModel, Constants, Blockchain, BaseValidator, MessageToast) {
	"use strict";

	return BaseController.extend("sap.ems.ui.app.blockchain.controller.Customer", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sap.ems.ui.app.blockchain.view.Detail
		 */
		onInit: function() {

			var oView = this.getView();
			var oViewModel = new JSONModel({
				"quantity": 0,
				"companyKey": null,
				"entitlementGuid": null,
			});
			this._oValidator = new BaseValidator(this);
			this.getView().setModel(this._oValidator.getMessageModel(), "oMessageModel");
			this.setModel(oViewModel, Constants.model.VIEW);
			this.getRouter().getRoute("customer").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function() {
			this._oValidator.clearAllMessages();
			this._initModel();
		},

		_initModel: function() {
			this._oBlockchainModel = new Blockchain();
			this.executeModelAction(this._oBlockchainModel, "query", "status", "active", "all");
			this.setModel(this._oBlockchainModel);
		},

		onAfterRendering: function(oEvent) {
			var obj = this.getView().byId(Constants.control.ID_POPOVER);
			this._oMessagePopover = this.createMessagePopover(obj);
		},

		handleSavePress: function() {
			var that = this;
			if (this._oValidator.isValid()) {
				var oContextData = {
					"entitlementGuid": this.getView().getModel("view").getProperty("/entitlementGuid"),
					"quantity": this.getView().getModel("view").getProperty("/quantity"),
					"ownedById": this.getView().getModel("view").getProperty("/companyKey"),
				};
				this.executeModelAction(this._oBlockchainModel, "transaction", true, oContextData)
					.then(function() {
						var msg = 'Write block successfully';
						MessageToast.show(msg);
						that.navBack();
					});
			} else if (!this._oMessagePopover.isOpen()) {
				jQuery.sap.delayedCall(200, this, function() {
					this._openMessagePopover.call(this);
				});
			}

		},

		handleCancelPress: function() {
			this.navBack();
		}

	});

});