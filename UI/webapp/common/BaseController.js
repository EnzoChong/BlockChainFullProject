/*!
 * ${copyright}
 */
sap.ui.define([
	"sap/ems/ui/common/BaseController",
	"sap/ems/ui/app/blockchain/common/Formatter"
], function(Controller, Formatter) {
	"use strict";
	/**
	 * Constructor for (MVC-style) controller as EMS base controller
	 *
	 * @class This class is EMS base controller, all the controllers should extend this class.
	 *
	 * @extends sap.ui.core.mvc.Controller
	 *
	 * @author SAP CD CSC i074174
	 * @since 1.0.0
	 *
	 * @constructor
	 * @public
	 * @param {string|object[]} sName The name of the controller to instantiate. If a controller is defined as real sub-class,
	 *                                the "arguments" of the sub-class constructor should be given instead.
	 *
	 * @alias sap.ems.ui.app.blockchain.common.Controller
	 */
	return Controller.extend("sap.ems.ui.app.blockchain.common.BaseController", {
		constructor: function(sName) {
			Controller.apply(this, arguments);

			// Init and document members here
			/**
			 * The common formatter .
			 *
			 * @since 1.0.0
			 * @public
			 */
			this.formatter = Formatter;
			/**
			 * Which fragments are used in this view
			 *
			 * @since 1.0.0
			 * @private
			 */
			this._Fragments = {};

			// Init others
		},
		_onMessageShow: function() {
			if(this.getView().byId("idBtnMsgPopover")){
				this.getView().byId("idBtnMsgPopover").firePress();
			}
		},
		onMessagePopoverPress: function(oEvent) {
			this._oMessagePopover.openBy(oEvent.getSource());
		},
		showMessagePopover: function(iDelayTime) {
			jQuery.sap.delayedCall(iDelayTime || 100, this, "_onMessageShow");
		},
			clearMessages: function() {
			sap.ui.getCore().getMessageManager().removeAllMessages();
		},
		executeModelAction: function(oModel, sAction) {
			var that = this;
			var oStaticParams = Array.prototype.slice.call(arguments, 2) || null;
			var oRequestPromise;
			this.clearMessages();
			this.getView().setBusy(true);
			oRequestPromise = oModel[sAction].apply(oModel, oStaticParams);
			return oRequestPromise.then(function(oDataJSON) {
				that.getView().setBusy(false)
				return oDataJSON;
			}, function(oError) {
				that.getView().setBusy(false)
				if (oError instanceof Error) {
					throw Error;
				} else {
					oModel._oMessageParser.parse(oError);
					that.showMessagePopover();
					return oError;
				}
			});

		},
	});
});