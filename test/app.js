'use strict';

const path = require('path');

const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-polymer-init-dhi-element:app', () => {
  before(() => {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .withPrompts({
        elementName: 'dhi-element',
        elementDescription: 'Element description',
        githubOrganization: 'DHI Group'
      })
      .toPromise();
  });

  it('creates files', () => {
    assert.file([
      'dhi-element.html',
      'README.md'
    ]);
  });
});
