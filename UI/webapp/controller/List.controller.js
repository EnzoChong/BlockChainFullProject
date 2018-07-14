sap.ui.define([
	"sap/ems/ui/app/blockchain/common/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/ems/ui/app/blockchain/common/Constants",
	"sap/ems/ui/app/blockchain/model/Blockchain",
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
], function(BaseController, JSONModel, Constants, Blockchain, Button, Dialog, List, StandardListItem, Label, MessageToast, Text, Input,
	Select, BaseValidator, Item) {
	"use strict";

	return BaseController.extend("sap.ems.ui.app.blockchain.controller.List", {

		onInit: function() {
			var that = this;
			var oView = this.getView();
			var oViewModel = new JSONModel({
				"quantity": 0,
				"companyKey": null,
				"ENABLED_SUBMIT": false,
				"ENABLED_SPLIT": false,
			});
			this._oValidator = new BaseValidator(this);
			this.getView().setModel(this._oValidator.getMessageModel(), "oMessageModel");
			this.setModel(oViewModel, Constants.model.VIEW);
			this.getRouter().getRoute(Constants.routeName.COMPANYLIST).attachMatched(this._onRouteMatched, this);
		},

		_onRouteMatched: function(oEvent) {
			this._oValidator.clearAllMessages();
			this._initModel();
		},

		_initModel: function() {
			var that = this;
			this._oBlockchainModel = new Blockchain();
			this.executeModelAction(this._oBlockchainModel, "query");
			this.executeModelAction(this._oBlockchainModel, "getCompany")
				.then(function() {
					that.addEmptySelectItem();
				});
			this.setModel(this._oBlockchainModel);
		},
		addEmptySelectItem: function() {
			var oModel = this.getModel(),
				aCompanies = oModel.getProperty("/companies");
			aCompanies.unshift({
				"key": "",
				"text": ""
			});
			oModel.setProperty("/companies", aCompanies);
		},

		onAfterRendering: function(oEvent) {
			var obj = this.getView().byId(Constants.control.ID_POPOVER);
			this._oMessagePopover = this.createMessagePopover(obj);
		},

		onSearch: function() {
			var oView = this.getView();
			this._sCompanyKey = oView.byId("idCompany").getSelectedKey();
			this.executeModelAction(this._oBlockchainModel, "query", "ownedById", this._sCompanyKey);
		},

		onFilterClear: function() {
			var oSelect = this.getView().byId(Constants.control.COMPANY);
			oSelect.setSelectedKey("");
		},

		onShowTransaction: function(oEvent) {
			var oBingObject = oEvent.getSource().getParent().getBindingContext().getObject();
			var that = this;
			this._oBlockchainModel.readTransaction(oBingObject.entitlementGuid).then(function() {
				if (!that.pressTransactionDialog) {
					that.pressTransactionDialog = new Dialog({
						title: 'Transaction Detail',
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

		},
		onSplitLiveChange: function(oChangeEvent) {

			var sText = oChangeEvent.getParameter('value');
			var parent = oChangeEvent.getSource().getParent();
			if (this._transactionValidate) {
				parent.getBeginButton().setEnabled(true);
			}
			if (sText.length > 0) {
				this._transactionValidate = true;
				this.getView().getModel("view").setProperty("/quantity", sText);

			} else {
				this._transactionValidate = false;
			}
		},
		onSplitSelectChange: function(oChangeEvent) {
			var sKey = oChangeEvent.getSource().getSelectedKey();
			var parent = oChangeEvent.getSource().getParent();
			if (this._transactionValidate) {
				parent.getBeginButton().setEnabled(true);
			}
			if (sKey.length > 0) {
				this._transactionValidate = true;
				this.getView().getModel("view").setProperty("/companyKey", sKey);

			} else {
				this._transactionValidate = false;
			}
		},
		onSplitSubmit: function() {
			var that = this;

			var oContextData = {
				"entitlementGuid": this.getView().getModel("view").getProperty("/entitlementGuid"),
				"quantity": this.getView().getModel("view").getProperty("/quantity"),
				"ownedById": this.getView().getModel("view").getProperty("/companyKey"),
			};
			this.getView().getModel("view").setProperty("/ENABLED_SUBMIT", false);

			if (!oContextData.entitlementGuid) {
				return that.pressSplitDialog.close();
			}
			this.executeModelAction(this._oBlockchainModel, "transaction", false, oContextData)
				.then(function() {
					that.pressSplitDialog.close();
					var msg = 'Write block successfully';
					MessageToast.show(msg);
					that._oBlockchainModel.query("ownedById", that._sCompanyKey);
					that.byId("idListTable").setSelectedIndex(-1);
					that.getView().getModel("view").setProperty("/ENABLED_SUBMIT", true);

				});
		},
		onSplitCancel: function(oEvent) {
			oEvent.getSource().getParent().close();
		},
		onTransaction: function(oEvent) {
			var oTable = this.byId("idListTable");
			var iSelectedIndex = oTable.getSelectedIndex();
			if (iSelectedIndex < 0) {
				return;
			}
			var oContext = oTable.getContextByIndex(iSelectedIndex).getObject();
			this._transactionValidate = false;
			this.getView().getModel("view").setProperty("/companyKey", null);
			this.getView().getModel("view").setProperty("/quantity", 0);
			this.getView().getModel("view").setProperty("/entitlementGuid", oContext.entitlementGuid);
			var that = this;
			if (!this.pressSplitDialog) {
				this.pressSplitDialog = sap.ui.xmlfragment("sap.ems.ui.app.blockchain.view.SplitDialog",
					this);
				that.pressSplitDialog.setModel(that.getModel());
				this.getView().addDependent(this.pressSplitDialog);

			}
			this.pressSplitDialog.open();
		},
		selectItemFactory: function() {
			return new sap.ui.core.Item({
				key: "{key}",
				text: "{text}"
			});
		},
		onPublish: function() {
			var oTable = this.byId("idListTable");
			var iSelectedIndex = oTable.getSelectedIndex();

			//none selected
			if (!iSelectedIndex == -1) {
				return;
			}
			var sPath = oTable.getContextByIndex(iSelectedIndex).sPath;
			var oParameters = {
				"entitlementGuid": this.getModel().getProperty(sPath).entitlementGuid,
			};
			var that = this;
			this.executeModelAction(this._oBlockchainModel, "public", oParameters)
				.then(function() {
					var msg = 'Write block successfully';
					MessageToast.show(msg);
					that._oBlockchainModel.query("ownedById", that._sCompanyKey);
					that.byId("idListTable").setSelectedIndex(-1);
				});
		},
		onSelectTableColumn: function(oEvent) {
			var oTable = oEvent.getSource();
			var that =this;
			var aSelectedIndex = oTable.getSelectedIndices();
			this.getView().getModel("view").setProperty("/ENABLED_PUBLISH", true);	
			this.getView().getModel("view").setProperty("/ENABLED_SPLIT", false);	
			oTable.getSelectedIndices().forEach(function(o, i) {
				var sNodeType = oTable.getContextByIndex(o).getModel().getProperty(oTable.getContextByIndex(o).sPath).status;
				if (sNodeType === "active") {
					that.getView().getModel("view").setProperty("/ENABLED_PUBLISH", false);	
					that.getView().getModel("view").setProperty("/ENABLED_SPLIT", true);	
				}
			});
		}

	});

});