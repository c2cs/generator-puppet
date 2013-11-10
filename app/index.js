'use strict';

// Require node utils
var util = require('util');

// Require node path utils
var path = require('path');

// Require yeoman
var yeoman = require('yeoman-generator');
var _ = require('yeoman-generator/node_modules/lodash');

// Main Entry Point
var PuppetGenerator = module.exports = function PuppetGenerator(args, options, config) {

	// Init yeoman base
	yeoman.generators.Base.apply(this, arguments);

	// Defines what to do at the end
	this.on('end', function () {
		//this.installDependencies({ skipInstall: options['skip-install'] });
	});

	// Loads the generator meta
	this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

};

// Inherit the base generator module
util.inherits(PuppetGenerator, yeoman.generators.Base);

// Defines the wizard questions
PuppetGenerator.prototype.askFor = function askFor() {

	var cb = this.async();

	// have Yeoman greet the user.
	console.log(this.yeoman);

	// Define Prompts
	var prompts = [
		{
			type: 'input',
			name: 'projectName',
			message: 'Project Name'
		},
		{
			type: 'input',
			name: 'fullName',
			message: 'Your Full Name'
		},
		{
			type: 'input',
			name: 'puppetUser',
			message: 'Puppet Forge Name',
			validate: vUsername
		},
		{
			type: 'input',
			name: 'version',
			message: 'Version',
			default: '0.1.0'
		},
		{
			type: 'input',
			name: 'desc',
			message: 'Description'
		},
		{
			type: 'checkbox',
			name: 'createOpts',
			message: 'What should I create?',
			choices: [
				{
					name: "metadata.json",
					checked: true
				},
				{
					name: "Modulefile",
					checked: true
				},
				{
					name: "Rakefile",
					checked: true
				},
				{
					name: "README.md",
					checked: true
				},
				{
					name: "LICENSE (Apache 2.0)",
					checked: true
				},
				{
					name: "Base Class (Manifest/Init)",
					checked: true
				},
				{
					name: "Spec",
					checked: true
				},
				{
					name: "Tests",
					checked: true
				}
			]
		}
	];

	// Display Props
	this.prompt(prompts, function (props) {

		// Init ans variable
		this.ans = {
			fullName: props.fullName,
			puppetUser: props.puppetUser,
			projectName: props.projectName,
			version: props.version,
			desc: props.desc,
			license: '',
			options: {}
		};

		// Helper map
		var optMap = {
			"metadata.json": "metajson",
			"Modulefile": "modulefile",
			"Rakefile": "rake",
			"README.md": "readme",
			"LICENSE (Apache 2.0)": "license",
			"Base Class (Manifest/Init)": "class",
			"Spec": "spec",
			"Tests": "tests"
		}

		// Create ans.options
		_(optMap).forEach( function(val,key) {
			if( _.contains( props.createOpts, key ) ) {
				this.ans.options[val] = true;
			} else {
				this.ans.options[val] = false;
			}
		}, this );

		// Create license string
		if( this.ans.options.license ) {
			this.ans.license = 'Apache 2.0 (See LICENSE file)';
		}

		cb();
	}.bind(this));

};

PuppetGenerator.prototype.root = function app() {

	var opt = this.ans.options;

	if( opt.metajson ) {
		this.template('_metadata.json', this.ans.projectName + '/metadata.json');
	}

	if( opt.modulefile ) {
		this.template('_Modulefile', this.ans.projectName + '/Modulefile');
	}

	if( opt.readme ) {
		this.template('_README.md', this.ans.projectName + '/README.md');
	}

	if( opt.license ) {
		this.template('_LICENSE', this.ans.projectName + '/LICENSE');
	}

	if( opt.rake ) {
		this.template('_Rakefile', this.ans.projectName + '/Rakefile');
	}

};

PuppetGenerator.prototype.class = function app() {

	var opt = this.ans.options;

	if( opt.class ) {
		// not required: this.mkdir(this.ans.projectName + '/manifests');
		this.template('_manifests_init.pp', this.ans.projectName + '/manifests/init.pp');
	}

};

PuppetGenerator.prototype.spec = function app() {

	var opt = this.ans.options;

	if( opt.spec ) {
		// not required: this.mkdir(this.ans.projectName + '/spec');
		this.template('_spec.opts', this.ans.projectName + '/spec/spec.opts');
		this.template('_spec_helper.rb', this.ans.projectName + '/spec/spec_helper.rb');
	}

};

PuppetGenerator.prototype.tests = function app() {

	var opt = this.ans.options;

	if( opt.tests ) {
		// not required: this.mkdir(this.ans.projectName + '/tests');
		this.template('_tests_init.pp', this.ans.projectName + '/tests/init.pp');
	}

};

function vUsername( strCheck ) {

	var rx = /^[a-zA-Z0-9]+$/;
	if( rx.test( strCheck ) ) {
		return true;
	} else {
		return "Invalid username.  Only alpha (a-z or A-Z) and numeric (0-9) characters are allowed.";
	}

}


