sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ems/ui/common/RestService",
	"sap/ems/ui/common/MessageParser",
	"sap/ems/ui/app/blockchain/common/Constants",
], function(JSONModel, RestService, MessageParser, Constants) {
	"use strict";
	return JSONModel.extend("sap.ems.ui.app.blockchain.model.CustomerBlockchain", {
		constructor: function() {
			JSONModel.apply(this, []);
			this._BOConfig = this._initConfig();
			this._metadata = {};
			this.getMetadata();
			this._oMessageParser = new MessageParser();
			this._oMessageParser.setProcessor(this);

		},
		_initConfig: function() {
			this.setProperty("/data", [{
				"entitlementGuid": "guid1",
				"id": "id",
				"entitlementNo": "EntitlementNo",
				"quantity": "Quantity",
				"validFrom": "ValidFrom",
				"validTo": "ValidTo",
				"status": "Status",
				"customerId": "CustomerID",
				"ownedById": "Customer A",
			}, {
				"entitlementGuid": "guid1",
				"id": "id",
				"entitlementNo": "EntitlementNo",
				"quantity": "Quantity",
				"validFrom": "ValidFrom",
				"validTo": "ValidTo",
				"status": "Status",
				"customerId": "CustomerID",
				"ownedById": "Customer A",
			}, {
				"entitlementGuid": "guid1",
				"id": "id",
				"entitlementNo": "EntitlementNo",
				"quantity": "Quantity",
				"validFrom": "ValidFrom",
				"validTo": "ValidTo",
				"status": "Status",
				"customerId": "CustomerID",
				"ownedById": "Customer A",
			}]);
			this.setProperty("/customers", [{
				"text": "Company A",
				"key": "Company A",
			}, {
				"text": "Company B",
				"key": "Company B",
			}, {
				"text": "Company C",
				"key": "Company C",
			}, {
				"text": "Company D",
				"key": "Company D",
			}]);
			this.setProperty("/transaction", [{
				"newEntitlementGuid": "Company A",
				"newOwnedBy": "Company A",
				"oldEntitlementGuid": "Company A",
				"oldOwnedBy": "Company B",
				"entitlementNo": "Company A",
				"customerId": "Company A",
				"quantity": "2",
				"type": "Company A",
				"userId": "Company A"
			}, {
				"newEntitlementGuid": "Company A",
				"newOwnedBy": "Company A",
				"oldEntitlementGuid": "Company A",
				"oldOwnedBy": "Company B",
				"entitlementNo": "Company A",
				"customerId": "Company A",
				"quantity": "1",
				"type": "Company A",
				"userId": "Company A"
			}, {
				"newEntitlementGuid": "Company A",
				"newOwnedBy": "Company A",
				"oldEntitlementGuid": "Company A",
				"oldOwnedBy": "Company B",
				"entitlementNo": "Company A",
				"customerId": "Company A",
				"quantity": "3",
				"type": "Company A",
				"userId": "Company A"
			}, {
				"newEntitlementGuid": "Company A",
				"newOwnedBy": "Company A",
				"oldEntitlementGuid": "Company A",
				"oldOwnedBy": "Company A",
				"entitlementNo": "Company A",
				"customerId": "Company A",
				"quantity": "4",
				"type": "Company A",
				"userId": "Company A"
			}]);
			return {
				getAll: Constants.api.BASE_URL + "/entitlements",
				getCustomer: Constants.api.BASE_URL + "/entitlement/customers",
				publish: Constants.api.BASE_URL + "/entitlement/publish",
				transactionUser: Constants.api.BASE_URL + "/entitlement/transaction/user",
				transactionCompany: Constants.api.BASE_URL + "/entitlement/transaction/company",
				validation: Constants.api.BASE_URL + "/entitlement/validation",
				transactionDetail: Constants.api.BASE_URL + "/entitlement/transaction",
			};
		},
		query: function(sKey, sValue, sType) {
			var that = this;
			var data = this.getFilters(sKey, sValue, sType);
			return RestService.post(this._BOConfig.getAll, JSON.stringify(data))
				.then(function(oDataJSON) {
					that.setProperty("/data", oDataJSON.data);
				})
				.catch(function(oXHR) {
					that._oMessageParser.parse(oXHR);

				});
		},
		getCustomer: function() {
			var that = this;
			return RestService.get(this._BOConfig.getCustomer)
				.then(function(oDataJSON) {
					that.setProperty("/customers", oDataJSON.data);
				})
				.catch(function(oXHR) {
					that._oMessageParser.parse(oXHR);

				});
		},
		public: function(oContext) {
			var that = this;
			return RestService.post(this._BOConfig.publish, JSON.stringify(oContext))
				.then(function(oDataJSON) {
					// that.setProperty("/data", oDataJSON.data);
				})
				.catch(function(oXHR) {
					that._oMessageParser.parse(oXHR);

				});
		},
		getFilters: function(sKey, sValue, sType) {
			return {
				type: sType ? sType : 'user',
				filters: [{
					key: sKey,
					value: sValue
				}]
			};
		},
		readTransaction: function(sGuid) {
			var that = this;
			return RestService.get(this._BOConfig.transactionDetail + "/" + sGuid)
				.then(function(oDataJSON) {
					that.setProperty("/transaction", oDataJSON.data);
				})
				.catch(function(oXHR) {
					that._oMessageParser.parse(oXHR);

				});
		},
	});
});