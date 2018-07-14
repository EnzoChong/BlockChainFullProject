/*!
 * ${copyright}
 */
sap.ui.define([
	"sap/ui/base/Object"
], function (BaseObject) {
	"use strict";
	/**
	 * Controller Helper class
	 *
	 * @class controller helper
	 *
	 * @extends sap.ui.base.Object
	 *
	 * @author SAP CD CSC i074174
	 * @since 1.0.0
	 *
	 * @constructor
	 * @public
	 * @alias sap.ems.ui.app.blockchain.controller.AppHelper
	 */
	var AppHelper = BaseObject.extend("sap.ems.ui.app.blockchain.controller.AppHelper", {

	});
	// test coverage
	AppHelper.testCoverage = function (bParam1, bParam2) {
		if (bParam1) {
			jQuery.sap.log.info(bParam1);
		} else {
			jQuery.sap.log.info(bParam1);
		}
		if (bParam2) {
			jQuery.sap.log.info(bParam1);
		} else {
			jQuery.sap.log.info(bParam1);
		}
	};

	return AppHelper;
});