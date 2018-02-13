'use strict';

const yeoman = require('yeoman-generator');

function generateDefaultElementName (appname) {
  if (appname.includes('-')) {
    return appname;
  }

  return `${appname}-element`;
}

function generateDefaultElementClassName (defaultElementName) {
  const words = defaultElementName.split('-');
  const upperCaseWords = words.map((word) => {
    return `${word.charAt(0).toUpperCase()}${word.slice(1)}`;
  });

  return upperCaseWords.join('');
}

module.exports = yeoman.Base.extend({
  initializing () {
    this.appname = 'dhi';
  },

  prompting () {
    const that = this;
    const defaultElementName = generateDefaultElementName(this.appname);
    const prompts = [
      {
        name: 'elementName',
        type: 'input',
        message: 'Name of the element',
        default: defaultElementName,
        validate (elementName) {
          const elementNameContainsHyphen = elementName.includes('-');
          if (!elementNameContainsHyphen) {
            that.log('\nCustom elements must include a hyphen in their name. Please, try again.');
          }

          return elementNameContainsHyphen;
        }
      },
      {
        name: 'elementClassName',
        type: 'input',
        message: 'Element class name (PascalCase)',
        default: generateDefaultElementClassName(defaultElementName)
      },
      {
        name: 'elementDescription',
        type: 'input',
        message: 'How would you describe the element'
      },
      {
        name: 'githubOrganization',
        type: 'input',
        message: 'GitHub organization',
        default: 'DHI Group'
      }
    ];

    return this.prompt(prompts).then((props) => { this.props = props; });
  },

  writing () {
    this.fs.copyTpl(
      this.templatePath() + '/**/!(_)*',
      this.destinationPath(this.props.elementName),
      this.props
    );

    this.fs.copyTpl(
      this.templatePath('_element.html'),
      this.destinationPath(this.props.elementName + '/' + this.props.elementName + '.html'),
      this.props
    );
  }
});
