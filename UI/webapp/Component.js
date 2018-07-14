/*!
 * ${copyright}
 */
sap.ui.define([
	"sap/ui/core/UIComponent",
	"sap/ui/Device",
	"sap/ems/ui/app/blockchain/common/Model",
	"sap/ems/ui/app/blockchain/common/Constants"
], function (UIComponent, Device, Model, Constants) {
	"use strict";
	jQuery.sap.registerModulePath("sap.ems.ui", "/webapp/resources/sap/ems/ui");
	return UIComponent.extend("sap.ems.ui.app.blockchain.Component", {
		metadata: {
			manifest: "json"
		},

		/**
		 * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
		 *
		 * @public
		 * @override
		 */
		init: function () {
			//Note the sequence of calls in init method.

			//Call the base component's init function
			UIComponent.prototype.init.apply(this, arguments);
			
			this._setAppGlobalInfor();
			// set the device model
			this.setModel(Model.createDeviceModel(), Constants.DEVICE);

			jQuery.sap.delayedCall(100, this, function () {
				this._applyContentDensityClass();
			});

			//initial router
			this.getRouter().initialize();
		},
		_applyContentDensityClass: function () {
			if (jQuery('body').hasClass('sapUiSizeCozy')) {
				jQuery('body').removeClass('sapUiSizeCozy');
			} else if (jQuery('body').hasClass('sapUiSizeCompact')) {
				jQuery('body').removeClass('sapUiSizeCompact');
			}

			jQuery('body').addClass('sapUiSizeCompact');
		},
		/**
		 *  SAPUI5 controls can be displayed in multiple sizes, for example in a compact size that is optimized for desktop and non-touch devices,
		 *  and in a cozy mode that is optimized for touch interaction. The controls look for a specific CSS class in the HTML structure of the application to adjust their size.
		 *
		 * @returns {String} _sContentDensityClass
		 *
		 * @public
		 */
		getContentDensityClass: function () {
			var sContentDensity = "compact";
			if (sContentDensity === "compact") {
				this._sContentDensityClass = "sapUiSizeCompact";
			} else {
				this._sContentDensityClass = "sapUiSizeCozy";
			}
			return this._sContentDensityClass;
		},
		/**
		 * The component is destroyed by UI5 automatically.
		 * In this method, the ErrorHandler are destroyed.
		 *
		 * @public
		 * @override
		 */
		 _setAppGlobalInfor: function() {
			//Namespace sap.ems.app for App global information
			jQuery.sap.getObject("sap.ems.app");
			sap.ems.app = {};
			//App global information - i18n
			sap.ems.app.i18n = this.getModel(Constants.model.I18N).getResourceBundle();
			//App global information - Constants
			sap.ems.app.constants = Constants;
			Constants.config.COMPONENT_ID = this.getId();
			//App global information - Component configuration during design time.
			sap.ems.app.manifest = {};
			sap.ems.app.manifest.ui5 = this.getManifestEntry(Constants.config.UI5);
			sap.ems.app.manifest.app = this.getManifestEntry(Constants.config.APP);
			sap.ems.app.manifest.ui = this.getManifestEntry(Constants.config.UI);
		},
		
		destroy: function () {
			this.getModel().destroy();
			this.getModel(Constants.model.I18N).destroy();
			this.getModel(Constants.DEVICE).destroy();

			// call the base component's destroy function
			UIComponent.prototype.destroy.apply(this, arguments);
		}
	});
});