/*!
 * ${copyright}
 */
sap.ui.define([
	"sap/ui/core/util/MockServer",
	"sap/ui/model/json/JSONModel"
], function (MockServer, JSONModel) {
	"use strict";

	return {
		_sLocalServicePath: "sap.ems.ui.app.blockchain.localService",
		// _sMetadataPath: "sap.ems.ui.app.blockchain.localService",
		_sDefaultMockdataPath: "sap.ems.ui.app.blockchain.localService.mockdata",
		_srvUrl: "",

		/**
		 * Initializes the mock server. You can configure the delay with the URL parameter "serverDelay"
		 * The local mock data in this folder is returned instead of the real data for testing.
		 *
		 * @public
		 */
		init: function () {
			var oUriParameters = jQuery.sap.getUriParameters(),
				//create
				oMockServer = new MockServer({
					rootUri: this._srvUrl
				}),
				// sMetadataPath = jQuery.sap.getModulePath(this._sMetadataPath),
				// sMockdataPath = jQuery.sap.getModulePath(this._sDefaultMockdataPath),
				aRequests = [];
			// config
			MockServer.config({
				// autoRespond: true,
				autoRespondAfter: (oUriParameters.get("serverDelay") || 500)
			});

			// simulate:load local mock data
			// oMockServer.simulate(sMetadataPath + "/metadata.xml", sMockdataPath);

			// simulate:rest API
			var oMockAPIList = new JSONModel();
			oMockAPIList.loadData(jQuery.sap.getModulePath(this._sLocalServicePath, "/configureMockRequests.json"), null, false);
			var aMockReqList = oMockAPIList.getData();
			aMockReqList.forEach(function (mMockRequest) {
				aRequests.push(this.buildMockRequest(mMockRequest));
			}.bind(this));
			oMockServer.setRequests(aRequests);

			//start
			oMockServer.start();

			jQuery.sap.log.info("Running the app with mock data");
		},
		/**
		 * Build the REST API mock request
		 *
		 * @param {object} mMockRequest Reqeust will be stub
		 * @param {string} mMockRequest.method - http verb
		 * @param {string} mMockRequest.path - URL to mock
		 * @param {string} mMockRequest.responseJSON - mock response
		 * @param {string} [mMockRequest.responseCode] - http response code to send; default: 200
		 * @param {obejct} [mMockRequest.header] - headers to send with the response; default: none
		 * @return {object} mock request
		 */
		buildMockRequest: function (mMockRequest) {
			var oResponseJSON = mMockRequest.responseJSON || {};
			if (typeof (oResponseJSON) === "string") {
				var oMockResponse = new JSONModel();
				oMockResponse.loadData(jQuery.sap.getModulePath(
					this._sDefaultMockdataPath,
					"/" + oResponseJSON + ".json"), null, false);
				oResponseJSON = oMockResponse.getData();
			}
			return {
				method: mMockRequest.method || "GET",
				path: mMockRequest.path,
				response: function (oXhr) {
					jQuery.sap.log.debug("Mocking rest call to " + mMockRequest.path);
					oXhr.respondJSON(
						mMockRequest.responseCode || 200,
						mMockRequest.header || {},
						JSON.stringify(oResponseJSON)
					);
				}
			};
		}
	};

});