/*!
 * ${copyright}
 */
//Provides static class for constants
sap.ui.define([
	"sap/ui/base/Object"
], function (BaseObject) {
	"use strict";
	/**
	 * Static class for constants
	 *
	 * @class
	 *
	 * @extends sap.ui.base.Object
	 *
	 * @author SAP CD CSC i074174
	 * @since 1.0.0
	 *
	 * @constructor
	 * @public
	 * @alias sap.ems.ui.app.blockchain.common.Constants
	 */
	var Constants = BaseObject.extend("sap.ems.ui.app.blockchain.common.Constants");
	// Set of controls' id
	Constants.control = {
		COMPANY: "idCompany"
	};
	// Set of models
	Constants.model = {
		// i18n multilanguage
		I18N: "i18n",
		DEVICE: "device",
		VIEW:"view",	
		MESSAGE_VIEW: "oMessageModel"
		
	};
	//Component Configruation
	Constants.config = {
		UI: "sap.ui",
		UI5: "sap.ui5",
		APP: "sap.app"
	};
	Constants.routeName = {
		EDIT: "orderEdit",
		CUSTOMERLIST: "customerlist",
		COPY: "orderCopy",
		CREATION: "orderCreation",
		DISPLAY: "order",
		LIST: "orders",
		COMPANYLIST: "display"
	};
	// Set of actions
	Constants.action = {};
	// Set of APIs
	Constants.api = {
		BASE_URL:"/dest/srv/rest/blockchain"
	};

	return Constants;
});