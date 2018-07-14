sap.ui.define([
	"sap/ems/ui/common/BaseInputValidator",
	"sap/ems/ui/app/blockchain/common/Constants"
], function(BaseInputValidator, Constants) {
	"use strict";
	/**
	 * Utility functions for input validation
	 * 
	 * @class
	 * 
	 * @extends sap.ems.ui.app.int.interface.common.BaseInputValidator
	 *
	 * @author SAP CD CSC  
	 * @since 1.0.0
	 *
	 * @constructor
	 * @public
	 * @param {sap.ui.core.mvc.Controller} oController view controller
	 * 
	 * @alias sap.ems.ui.app.int.interface.common.BaseValidator
	 */
	return BaseInputValidator.extend("sap.ems.ui.app.int.interface.common.BaseValidator", {
		constructor: function(oController) {
			BaseInputValidator.apply(this, arguments);
		},
		
		isValid: function() {
			var bBaseValid = BaseInputValidator.prototype.isValid.apply(this);

			var that = this;
			var bValid = true;
			this._oView.findElements(true).filter(function(oControl) {
				return oControl instanceof sap.m.Select && oControl.getVisible() && oControl.getItems().length > 0;
			}).forEach(function(oSelect) {
				if (oSelect.getSelectedKey().length === 0) {
					oSelect.attachChange(function() {
						that.fireRequiredValidationSuccess(oSelect);
					});
					that.fireRequiredValidationError(oSelect);
					bValid = false;
				}
			});

			this._addLabelInPopover.call(this);

			return bBaseValid && bValid;
		},

		_addLabelInPopover: function() {
			// jQuery.sap.delayedCall(300, this, function() {
			// 	var sColumnName = "";
			// 	var aColumns = this._oView.byId(Constants.control.ELEMENTTABLEEDIT).getColumns();
			// 	var oMessageModel = this.getMessageModel();
			// 	oMessageModel.getData().forEach(function(oMessage) {
			// 		if (!oMessage.getAdditionalText()) {
			// 			var sTarget = oMessage.getTarget();
			// 			if (sTarget && sTarget.length > 0) {
			// 				if (sTarget.indexOf("id") > -1) {
			// 					sColumnName = sTarget;
			// 				} else {
			// 					var sId = sTarget.substring(0, sTarget.indexOf("/"));
			// 					var oControl = sap.ui.getCore().byId(sId);
			// 					var oRow = oControl.getParent();
			// 					var iColumnIndex = oRow.getParent().indexOfCell(oControl.getParent());
			// 					sColumnName = aColumns[iColumnIndex].getLabel().getText();
			// 				}
			// 				oMessage.setAdditionalText(sColumnName);
			// 			}
			// 		}
			// 	});
			// 	oMessageModel.refresh();
			// });
		},

		_TrimAllWhiteSpace: function(str, isGlobal) {
			var result;
			result = str.replace(/(^\s+)|(\s+$)/g, "_");
			if (isGlobal.toLowerCase() === "g") {
				result = result.replace(/\s/g, "_");
			}
			return result;
		}
	});
});