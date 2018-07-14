sap.ui.define([
	"sap/ems/ui/app/blockchain/common/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ems/ui/app/blockchain/common/Constants",
	"sap/ems/ui/app/blockchain/model/CustomerBlockchain",
	'sap/m/Button',
	'sap/m/Dialog',
	'sap/m/List',
	'sap/m/StandardListItem',
	'sap/m/Label',
	'sap/m/MessageToast',
	'sap/m/Text',
	'sap/m/Input',
	'sap/m/Select',
	'sap/ems/ui/app/blockchain/common/BaseValidator',
	'sap/ui/core/Item'
], function(BaseController, JSONModel, Constants, CustomerBlockchain, Button, Dialog, List, StandardListItem, Label, MessageToast, Text,
	Input,
	Select, BaseValidator, Item) {
	"use strict";

	return BaseController.extend("sap.ems.ui.app.blockchain.controller.CustomerList", {

		onInit: function() {
			var that = this;

			var oView = this.getView();
			var oViewModel = new JSONModel({
				"quantity": 0
			});
			this._oValidator = new BaseValidator(this);
			//Sync message model with message manager
			this.getView().setModel(this._oValidator.getMessageModel(), "oMessageModel");
			this.setModel(oViewModel, Constants.model.VIEW);

			this.getRouter().getRoute(Constants.routeName.CUSTOMERLIST).attachMatched(this._onRouteMatched, this);

		},

		_onRouteMatched: function(oEvent) {
			this._oValidator.clearAllMessages();
			this._initModel();
		},

		_initModel: function() {
			var that = this;
			this._oBlockchainModel = new CustomerBlockchain();
			this.executeModelAction(this._oBlockchainModel, "query");

			//to be changed
			this.executeModelAction(this._oBlockchainModel, "getCustomer")
				.then(function() {
					that.addEmptySelectItem();
				});
			this.setModel(this._oBlockchainModel);
		},

		addEmptySelectItem: function() {
			var oModel = this.getModel(),
				aCustomers = oModel.getProperty("/customers");
			aCustomers.unshift({
				"key": "",
				"text": ""
			});
			oModel.setProperty("/customers", aCustomers);
		},

		onAfterRendering: function(oEvent) {
			var obj = this.getView().byId(Constants.control.ID_POPOVER);
			this._oMessagePopover = this.createMessagePopover(obj);
		},

		onSearch: function() {
			var oView = this.getView();
			this._sCompanyKey = oView.byId("idCustomer").getSelectedKey();
			this.executeModelAction(this._oBlockchainModel, "query", "ownedById", this._sCompanyKey);
		},

		onFilterClear: function() {
			var oSelect = this.getView().byId(Constants.control.COMPANY);
			oSelect.setSelectedKey("");
		},

		onPurchaseButtonPress: function() {
			this.navTo("customer");
		},

		onShowTransaction: function(oEvent) {
			var oBingObject = oEvent.getSource().getParent().getBindingContext().getObject();
			var that = this;
			this._oBlockchainModel.readTransaction(oBingObject.entitlementGuid).then(function() {
				if (!that.pressTransactionDialog) {
					that.pressTransactionDialog = new Dialog({
						title: '{i18n>TITLE_TRANSACTION_DETAIL}',
						contentWidth: "550px",
						contentHeight: "300px",
						resizable: true,
						content: new List({
							items: {
								path: '/transaction',
								template: new StandardListItem({
									title: "Transaction {entitlementNo} from {oldOwnedBy} to {newOwnedBy} ,Quantity is {quantity}",

								})
							}
						}),
						beginButton: new Button({
							text: '{i18n>TRANSACTION_BUTTON_CLOSE}',
							press: function() {
								that.pressTransactionDialog.close();
							}.bind(that)
						})
					});
					//to get access to the global model
					that.getView().addDependent(that.pressTransactionDialog);
				}
				that.pressTransactionDialog.open();
			});

		}
	});

});