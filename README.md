# Table of Contents
* [Walkthrough](#walkthrough)
    * [Purpose](#purpose)
    * [Stack Used](#stack-used)
    * [Build System](#build-system)
    * [File Structure](#file-structure)
    * [Testing Setup](#testing-setup)
* [Getting Started](#getting-started)
    * [Dependencies](#dependencies)
    * [Installing](#installing)
    * [Running the App](#running-the-app)
        * [Gulp Tasks](#gulp-tasks)
        * [Testing](#testing)
		* [Generating Components](#generating-components)		
* [Starter Kit Support and Questions](#starter-kit-support-and-questions)

# Walkthrough
## Purpose
oo-call-centre is the call centre module for Order Online Service used by Organization executives to take orders through phone.

## Stack Used
* [NodeJS](https://nodejs.org/en/)
* [ExpressJS](https://expressjs.com/) - vesion 4.14.0
* [Twitter Bootstrap](getbootstrap.com) - version 3.3.7
* [Angular Js](https://angularjs.org/) - version 1.5.0

## Build System
oo-call-centre has been developed on Angular Ng-6 boilerplate 
(https://github.com/AngularClass/NG6-starter)

NG6 uses Gulp and Webpack together for its build system. Yes, you don't need Gulp if you're using Webpack. This is true if your build system is only responsible for file manipulation. However, ours is not.
`Webpack` handles all file-related concerns:
* Transpiling from ES6 to ES5 with `Babel`
* Loading HTML files as modules
* Transpiling stylesheets and appending them to the DOM
* Refreshing the browser and rebuilding on file changes
* Hot module replacement for transpiled stylesheets
* Bundling the app
* Loading all modules
* Doing all of the above for `*.spec.js` files as well

`Gulp` is the orchestrator:
* Starting and calling Webpack
* Starting a development server (yes, Webpack can do this too)
* Generating boilerplate for the Angular app

## File Structure
We use a componentized approach with NG6. This will be the eventual standard (and particularly helpful, if using Angular's new router) as well as a great way to ensure a tasteful transition to Angular 2, when the time is ripe. Everything--or mostly everything, as we'll explore (below)--is a component. A component is a self-contained concern--may it be a feature or strictly-defined, ever-present element of the UI (such as a header, sidebar, or footer). Also characteristic of a component is that it harnesses its own stylesheets, templates, controllers, routes, services, and specs. This encapsulation allows us the comfort of isolation and structural locality. Here's how it looks:
```
client
⋅⋅app/
⋅⋅⋅⋅app.js * app entry file
⋅⋅⋅⋅app.html * app template
⋅⋅⋅⋅common/ * functionality pertinent to several components propagate into this directory
⋅⋅⋅⋅components/ * where components live
⋅⋅⋅⋅⋅⋅components.js * components entry file
⋅⋅⋅⋅⋅⋅home/ * home component
⋅⋅⋅⋅⋅⋅⋅⋅home.js * home entry file (routes, configurations, and declarations occur here)
⋅⋅⋅⋅⋅⋅⋅⋅home.component.js * home "directive"
⋅⋅⋅⋅⋅⋅⋅⋅home.controller.js * home controller
⋅⋅⋅⋅⋅⋅⋅⋅home.scss * home styles
⋅⋅⋅⋅⋅⋅⋅⋅home.html * home template
⋅⋅⋅⋅⋅⋅⋅⋅home.spec.js * home specs (for entry, component, and controller)
```

## Testing Setup
All tests are also written in ES6. We use Webpack to take care of the logistics of getting those files to run in the various browsers, just like with our client files. This is our testing stack:
* Karma
* Webpack + Babel
* Mocha
* Chai

To run tests, type `npm test` or `karma start` in the terminal. Read more about testing [below](#testing).

# Getting Started
## Dependencies
Tools needed to run this app:
* `node` and `npm`

**ALSO INSTALL REDIS**

Once you have these, install the following as globals:  
`npm install -g gulp karma karma-cli webpack yarn`

## Installing
* `clone` this repo 'https://github.com/LimeTray/oo-callcenter-service.git'
* `npm install -g gulp karma karma-cli webpack yarn` install global cli dependencies
* `cd order-online-service`
* `yarn` to install dependencies
* `cp .env.example .env`
* Modify environment variables in the .env file
## Running the App
OO-call-centre uses Gulp to build and launch the development environment. 
After you have installed all dependencies, you may run the app. Run `sudo npm run dev` to start the node server and gulp task to run webpack.
example token to be used in client/app/app.js and client/app/common/http/http.service.js is :

 Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJicmFuZFVzZXJJZCI6MTEwMzE4LCJ1c2VyTW9iaWxlIjoiOTgwNTk4OTk1MSIsImlzYSI6MTQ4NzA1Mzc4MTc2MiwiYnJhbmRJZCI6IjAiLCJ1c2VyRnVsbE5hbWUiOiJUdXNoYXIgSmFndGEiLCJ1c2VyRW1haWwiOiJ0dXNoYXIuamFndGFAbGltZXRyYXkuY29tIiwidG9rZW5UeXBlIjoiaWQiLCJ1c2VySWQiOiI1NjZjZGYwYy00N2E5LTQxZjAtYWQwNy05ZTkwM2FiMzE5NmIifQ.-IP0USsZnJuENYWZVWXpu4wI07TLU0BmS4YWVYayHgc
 
### Gulp Tasks
Here's a list of available tasks:
* `webpack`
  * runs Webpack, which will transpile, concatenate, and compress (collectively, "bundle") all assets and modules into `dist/bundle.js`. It also prepares `index.html` to be used as application entry point, links assets and created dist version of our application.
* `serve`
  * starts a dev server via `webpack-dev-server`, serving the client folder.
* `watch`
  * alias of `serve`
* `default` (which is the default task that runs when typing `gulp` without providing an argument)
	* runs `serve`.
* `component`
  * scaffolds a new Angular component. [Read below](#generating-components) for usage details.
  
### Testing
To run the tests, run `npm test` or `karma start`.

`Karma` combined with Webpack runs all files matching `*.spec.js` inside the `app` folder. This allows us to keep test files local to the component--which keeps us in good faith with continuing to build our app modularly. The file `spec.bundle.js` is the bundle file for **all** our spec files that Karma will run.

Be sure to define your `*.spec.js` files within their corresponding component directory. You must name the spec file like so, `[name].spec.js`. If you don't want to use the `.spec.js` suffix, you must change the `regex` in `spec.bundle.js` to look for whatever file(s) you want.
`Mocha` is the testing suite and `Chai` is the assertion library. If you would like to change this, see `karma.conf.js`.

### Generating Components
Following a consistent directory structure between components offers us the certainty of predictability. We can take advantage of this certainty by creating a gulp task to automate the "instantiation" of our components. The component boilerplate task generates this:
```
⋅⋅⋅⋅⋅⋅componentName/
⋅⋅⋅⋅⋅⋅⋅⋅componentName.js // entry file where all its dependencies load
⋅⋅⋅⋅⋅⋅⋅⋅componentName.component.js
⋅⋅⋅⋅⋅⋅⋅⋅componentName.controller.js
⋅⋅⋅⋅⋅⋅⋅⋅componentName.html
⋅⋅⋅⋅⋅⋅⋅⋅componentName.scss // scoped to affect only its own template
⋅⋅⋅⋅⋅⋅⋅⋅componentName.spec.js // contains passing demonstration tests
```

You may, of course, create these files manually, every time a new module is needed, but that gets quickly tedious.
To generate a component, run `gulp component --name componentName`.

The parameter following the `--name` flag is the name of the component to be created. Ensure that it is unique or it will overwrite the preexisting identically-named component.

The component will be created, by default, inside `client/app/components`. To change this, apply the `--parent` flag, followed by a path relative to `client/app/components/`.

For example, running `gulp component --name signup --parent auth` will create a `signup` component at `client/app/components/auth/signup`.  

Running `gulp component --name footer --parent ../common` creates a `footer` component at `client/app/common/footer`.  

Because the argument to `--name` applies to the folder name **and** the actual component name, make sure to camelcase the component names.
