/*!
 * ${copyright}
 */
sap.ui.define([
	"sap/ems/ui/app/blockchain/common/Constants",
	"sap/ui/base/Object"
], function (Constants, BaseObject) {
	"use strict";
	/**
	 * Utility class
	 *
	 * @class Utility functions
	 *
	 * @extends sap.ui.base.Object
	 *
	 * @author SAP CD CSC i074174
	 * @since 1.0.0
	 *
	 * @constructor
	 * @public
	 * @alias sap.ems.ui.app.blockchain.common.Utils
	 */
	var Utils = BaseObject.extend("sap.ems.ui.app.blockchain.common.Utils", {

	});

	/**
	 * @function
	 * @name getControllerId
	 * @param {string} sRouteName -- current route name.
	 * @description function to get controller id by specific route name.
	 * @return {string} return controller id.
	 *
	 * @public
	 */
	Utils.getControllerId = function (sRouteName) {
		var sCurrentControllerId = Constants.TargetName[sRouteName];
		return sCurrentControllerId ? Constants.Id.emsCOMPONENT + "---" + sCurrentControllerId : null;
	};

	/**
	 * Check if a string represents a valid Internet email address
	 * - This is a willful violation of RFC5322, please refer to the unit test for test-case coverage.
	 * - RFC 5322 cannot even be checked by a Regex and the Regex for RFC 822 is very long and complex.
	 * - Unicode characters are allowed.
	 *
	 * @function
	 * @param {string} sEmail - the email address to be checked
	 * @return {boolean} true if the string is a valid email address (doesn't necessarily exist), otherwise false
	 *
	 * @private
	 */
	Utils.isValidEmail = function (sEmail) {
		var re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
		return re.test(sEmail);
	};

	return Utils;
});