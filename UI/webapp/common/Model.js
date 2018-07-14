/*!
 * ${copyright}
 */
//Provides Model Class to generate models
sap.ui.define([
	"sap/ui/base/Object",
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function (BaseObject, JSONModel, Device) {
	"use strict";
	/**
	 * Static class
	 *
	 * @class To generate models
	 *
	 * @extends sap.ui.base.Object
	 *
	 * @author SAP CD CSC i074174
	 * @since 1.0.0
	 *
	 * @constructor
	 * @public
	 * @alias sap.ems.ui.app.blockchain.common.Model
	 */
	var Model = BaseObject.extend("sap.ems.ui.app.blockchain.common.Model");

	/**
	 * Create Device Model
	 *
	 * @returns {sap.ui.model.json.JSONModel} oModel
	 *
	 * @since 1.0.0
	 * @public
	 */
	Model.createDeviceModel = function () {
		var oModel = new JSONModel(Device);
		oModel.setDefaultBindingMode(sap.ui.model.BindingMode.OneWay);
		return oModel;
	};

	return Model;
});