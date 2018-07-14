(function (karma) {
	"use strict";

	// Prevent Karma from running prematurely.
	karma.loaded = function () {};

	sap.ui.getCore().attachInit(function() {
		sap.ui.require([
			"sap/ems/ui/app/blockchain/localService/mockserver",

			"test/unit/allTests",

			"test/integration/configureOpa",
			"test/integration/AllJourneys"
		], function(mockserver) {
			mockserver.init();

			// Finally, start Karma to run the tests.
			karma.start();
		});
	});
})(window.__karma__);