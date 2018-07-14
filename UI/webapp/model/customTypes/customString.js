sap.ui.define([
		"jquery.sap.global",
		"sap/ui/model/type/String",
		"sap/ui/model/FormatException",
		"sap/ui/model/ParseException",
		"sap/ui/model/ValidateException",
		'sap/ems/ui/app/blockchain/common/Model'
	],
	function(jQuery, String, FormatException, ParseException, ValidateException, Model) {
		"use strict";

		var customString = String.extend("sap.ems.ui.app.blockchain.model.customTypes.customString", {
			constructor: function() {
				String.apply(this, arguments);
				this.sName = "customString";
			}
		});

		customString.prototype.parseValue = function(oValue, sInternalType) {
			switch (this.getPrimitiveType(sInternalType)) {
				case "string":
					return oValue.toString();
				case "boolean":
					return typeof oValue === "number" ? oValue !== 0 : oValue === true;
				case "int":
					var iResult = parseInt(oValue, 10);
					if (isNaN(iResult)) {
						throw new ParseException(oValue + " is not a valid int value");
					}
					return iResult;
				case "float":
					var fResult = parseFloat(oValue);
					if (isNaN(fResult)) {
						throw new ParseException(oValue + " is not a valid float value");
					}
					return fResult;
				default:
					throw new ParseException("Don't know how to parse String from " + sInternalType);
			}
		};

		customString.prototype.validateValue = function(sValue) {
			var that = this;
			if (this.oConstraints) {
				var oBundle = Model.getTextBundle(),
					aViolatedConstraints = [],
					aMessages = [];

				jQuery.each(this.oConstraints, function(sName, oContent) {
					switch (sName) {
						case "maximum":
							if (sValue > oContent) {
								aViolatedConstraints.push("maximum");
								aMessages.push(oBundle.getText(that.oConstraints["text"]["maximum"], [oContent]));
							}
							break;
						case "minimum":
							if (sValue < oContent) {
								aViolatedConstraints.push("minimum");
								aMessages.push(oBundle.getText(that.oConstraints["text"]["minimum"], [oContent]));
							}
							break;
						case "maxLength": // expects int
							if (sValue.toString().length > oContent) {
								aViolatedConstraints.push("maxLength");
								aMessages.push(oBundle.getText(that.oConstraints["text"]["maxLength"]));
							}
							break;
						case "minLength": // expects int
							if (sValue.toString().length < oContent) {
								aViolatedConstraints.push("minLength");
								aMessages.push(oBundle.getText(that.oConstraints["text"]["minLength"]));
							}
							break;
						case "search": // expects regex
							if (!_.isEmpty(sValue) && sValue.toString().search(oContent) === -1) {
								aViolatedConstraints.push("search");
								aMessages.push(oBundle.getText(that.oConstraints["text"]["search"]));
							}
							break;
						default:
							break;
					}
				});
				if (aViolatedConstraints.length > 0) {
					throw new ValidateException(aMessages.join(" "), aViolatedConstraints);
				}
			}
		};

		return customString;

	});