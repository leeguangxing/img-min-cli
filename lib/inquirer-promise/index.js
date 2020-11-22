/**
 *  对 inquirer 的 promise 封装
 */

const inquirer = require("inquirer");

module.exports = function (objects) {
  return new Promise((resolve, reject) => {
    inquirer.prompt(objects).then((answers) => {
      resolve(answers);
    });
  });
};
