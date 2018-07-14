# SAPUI5 App Template by Abel

## Pattern List-Detail Demo

* Mock server
* Navigation with router

`Note:` refer to [AbelAppTemplate](https://github.wdf.sap.corp/I074174/AbelAppTemplate/blob/demo-pattern-list-object/TemplateDscr.md) for more.

## Local testing with Approuter

`Precondition:`

1. install node.js
1. npm install -g grunt-cli

Steps:

1. npm install (in project folder), below is sample package.json

```json
{
  "name": "ems-ui-app-blockchain",
  "version": "1.0.0",
  "license": "SAP",
  "description": "App Tile",
  "scripts": {
    "start": "node node_modules/@sap/approuter/approuter.js"
  },
  "repository": {
    "type": "git",
    "url": "git@github.wdf.sap.corp:Entitlement/ems-ui-app-blockchain.git"
  },
  "author": "SAP CSC CD",
  "dependencies": {
    "@sap/approuter": "^4.0.0"
  },
  "devDependencies": {
    "ems-ui-lib": "git://github.wdf.sap.corp/Entitlement/ems-ui-lib.git#master"
  },
  "engines": {
    "node": ">=6.0.0"
  }
}
```

1. To create a dist folder manually or grunt build / grunt build:test (will be fixed later)
1. npm start or npm run start
1. Local Testing http://localhost:5000/webapp/test.html
    * Run with mockserver http://localhost:5000/webapp/test/flpSandboxMockServer.html
    * Testing all: http://localhost:5000/webapp/test/testsuite.qunit.html
    * QUnit http://localhost:5000/webapp/test/unit/unitTests.qunit.html
    * OPA http://localhost:5000/webapp/test/integration/opaTests.qunit.html

`Note:`

1. `The order of routes in the xs-app.json, the first matched router will be used`
1. `Source path should start with ^`

Reference:

* [Approuter](https://github.wdf.sap.corp/xs2/approuter.js )
* [node-xsenv](https://github.wdf.sap.corp/xs2/node-xsenv )
* [DeployApplicationRouter](https://github.wdf.sap.corp/cc-java-dev/cc-coursematerial/blob/master/Security/Exercise_22_DeployApplicationRouter.md)

## Build application with grunt-ems

```json
{
  "name": "ems-ui-app-blockchain",
  "version": "1.0.0",
  "license": "SAP",
  "description": "App Tile",
  "scripts": {
    "start": "node node_modules/@sap/approuter/approuter.js"
  },
  "repository": {
    "type": "git",
    "url": "git@github.wdf.sap.corp:Entitlement/ems-ui-app-blockchain.git"
  },
  "author": "SAP CSC CD",
  "dependencies": {
    "@sap/approuter": "^4.0.0"
  },
  "devDependencies": {
    "grunt": "^1.0.1",
    "grunt-ems": "latest",
    "ems-ui-lib": "git://github.wdf.sap.corp/Entitlement/ems-ui-lib.git#master"
  },
  "engines": {
    "node": ">=6.0.0"
  }
}
```

* `grunt build`
* grunt lint

Using below command you will find a eslint:xml in your folder root.

```shell
  grunt lint:ci
```

* grunt watch
* grunt test or grunt coverage

### Local testing build result

1. npm install
1. grunt build:test
1. npm start or npm run start
1. Local Testing
    http://localhost:5000/dist/test.html
    * Run with mockserver http://localhost:5000/dist/test/flpSandboxMockServer.html
    * Testing all: http://localhost:5000/dist/test/testsuite.qunit.html
    * QUnit http://localhost:5000/dist/test/unit/unitTests.qunit.html
    * OPA http://localhost:5000/dist/test/integration/opaTests.qunit.html
1. test debug mode
    * http://localhost:5000/dist/test/flpSandboxMockServer.html?sap-ui-debug=sap/csc/#Shell-home

### Extend or overwrite configuration of grunt-ems

```javascript
"use strict";
module.exports = function (grunt) {

  grunt.loadNpmTasks("grunt-ems");

  grunt.config.set(
    "karma.coverage.preprocessors", {
      'webapp/*.js': ['coverage'],
      'webapp/!(test|localService|lib)/**/!(Utils).js': ['coverage']
    }
  );
  grunt.config.set(
    "karma.options.client.openui5.config.libs",
    'sap.ui.core, sap.m, sap.ushell, sap.ui.layout, sap.ui.unified, sap.ui.comp, sap.ui.table, sap.f, sap.uxap'
  );

  grunt.registerTask("default", ["buildCF"]);
};
```

## Buid with SAP MTA for CF

Download: [MBT-MTA Build Tool](http://nexus.wdf.sap.corp:8081/nexus/content/repositories/deploy.releases.xmake/com/sap/mta/mta_archive_builder/)

```shell
java -jar C:\Users\i074174\mta.JAR --build-target=CF --mtar=com-sap-ems-ui-app-blockchain.mtar build

cf deploy com-sap-ems-ui-app-blockchain.mtar -e mta_dev.mtaext.yaml
```