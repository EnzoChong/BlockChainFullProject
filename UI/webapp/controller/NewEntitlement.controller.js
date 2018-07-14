sap.ui.define([
	"sap/ems/ui/app/blockchain/common/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ems/ui/app/blockchain/common/Constants",
	"sap/ems/ui/app/blockchain/model/Blockchain",
	'sap/ems/ui/app/blockchain/common/BaseValidator',
	'sap/m/MessageToast'
], function(BaseController, JSONModel, Constants, Blockchain, BaseValidator, MessageToast) {
	"use strict";

	return BaseController.extend("sap.ems.ui.app.blockchain.controller.NewEntitlement", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf sap.ems.ui.app.blockchain.view.Detail
		 */
		onInit: function() {

			var oView = this.getView();

			this._oValidator = new BaseValidator(this);
			this.getView().setModel(this._oValidator.getMessageModel(), "oMessageModel");
			this._initViewModel();

			this.getRouter().getRoute("newentitlement").attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function() {
			this._oValidator.clearAllMessages();
			this._initModel();
		},
		_initViewModel: function() {
			var oViewModel = new JSONModel({
				"quantity": 0,
				"id": null,
				"validFrom": null,
				"validTo": null,
				"description": null
			});
			this.setModel(oViewModel, Constants.model.VIEW);
		},
		_initModel: function() {
			this._oBlockchainModel = new Blockchain();
			// this.executeModelAction(this._oBlockchainModel, "query", "status", "active", "all");
			this.setModel(this._oBlockchainModel);
		},

		onAfterRendering: function(oEvent) {
			var obj = this.getView().byId(Constants.control.ID_POPOVER);
			this._oMessagePopover = this.createMessagePopover(obj);
		},
		handleSaveNewPress: function() {
			var that = this;
			if (this._oValidator.isValid()) {
				var oContextData = {
					"id": this.getView().getModel("view").getProperty("/id"),
					"validFrom": this.getView().getModel("view").getProperty("/validFrom"),
					"validTo": this.getView().getModel("view").getProperty("/validTo"),
					"quantity": this.getView().getModel("view").getProperty("/quantity"),
					"description": this.getView().getModel("view").getProperty("/description"),
				};
				this.executeModelAction(this._oBlockchainModel, "newEntitlement", oContextData)
					.then(function() {
						var msg = 'New Entitlement Successfully';
						MessageToast.show(msg);
						that._oValidator.clearAllMessages();
						that._initViewModel();
					});
			} else if (!this._oMessagePopover.isOpen()) {
				jQuery.sap.delayedCall(200, this, function() {
					this._openMessagePopover.call(this);
				});
			}
		},
		handleSavePress: function() {
			var that = this;
			if (this._oValidator.isValid()) {
				var oContextData = {
					"id": this.getView().getModel("view").getProperty("/id"),
					"validFrom": this.getView().getModel("view").getProperty("/validFrom"),
					"validTo": this.getView().getModel("view").getProperty("/validTo"),
					"quantity": this.getView().getModel("view").getProperty("/quantity"),
					"description": this.getView().getModel("view").getProperty("/description"),
				};
				this.executeModelAction(this._oBlockchainModel, "newEntitlement", oContextData)
					.then(function() {
						var msg = 'New Entitlement Successfully';
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