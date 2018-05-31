# A6Users

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.0.3.

It is a sample for development stack with Angular 6, Express server and Mysql, starting point for users management.

The Express server is set to serve the application and the api requests from it.

## Prerequisits
1. Installing in both directories, for the front and the back end, required node modules with npm:

    npm i
2. Running MySQL server. Credentials are located in:
```
    express-mysql/.env
```
3. JWT keys are pre-generated and located in:
```
    express-mysql/.env
```
    The keys are located in:
```
    express-mysql/keys
```
4. MySql tables have to be set. For development purposes the tables are populated with sample data.
    Automated DB/Tables setting scripts are located in:
```
    express-mysql/db-init-mySql
```
## Development 

It is required to have running (prepopulated) MySQL and the development server in:
```
    express-mysql/npm run dev
```
In order to generate automatically builds which can be served by the Express server use:
```
    ng build --watch
```

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `/express-mysql/public` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
