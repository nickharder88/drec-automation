"use strict";

require("babel-polyfill");

var _seleniumWebdriver = require("selenium-webdriver");

var _moment = _interopRequireDefault(require("moment"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var fiveThirtyMatch = /5:30pm/;
var sevenThirtyMatch = /7:30pm/;

function GetAvailableButtonForMatch(_x, _x2) {
  return _GetAvailableButtonForMatch.apply(this, arguments);
}

function _GetAvailableButtonForMatch() {
  _GetAvailableButtonForMatch = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(buttons, match) {
    var validButtons, button, parent, title;
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return Promise.all(buttons.map( /*#__PURE__*/function () {
              var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(button) {
                var text, matches;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        _context4.next = 2;
                        return button.getText();

                      case 2:
                        text = _context4.sent;
                        matches = text.match(match);

                        if (!(!matches || matches.length === 0)) {
                          _context4.next = 6;
                          break;
                        }

                        return _context4.abrupt("return", null);

                      case 6:
                        return _context4.abrupt("return", button);

                      case 7:
                      case "end":
                        return _context4.stop();
                    }
                  }
                }, _callee4);
              }));

              return function (_x5) {
                return _ref3.apply(this, arguments);
              };
            }()));

          case 2:
            validButtons = _context5.sent;
            button = validButtons.find(function (item) {
              return Boolean(item);
            });

            if (button) {
              _context5.next = 7;
              break;
            }

            console.log('Could not find a button for 5:30.');
            return _context5.abrupt("return", null);

          case 7:
            console.log('Found button for tomorrow');
            _context5.next = 10;
            return button.findElement(_seleniumWebdriver.By.xpath('./..'));

          case 10:
            parent = _context5.sent;
            _context5.next = 13;
            return parent.getAttribute('title');

          case 13:
            title = _context5.sent;

            if (!(title === 'UnAvailable')) {
              _context5.next = 17;
              break;
            }

            console.log('Button is unavailable for tomorrow.');
            return _context5.abrupt("return", null);

          case 17:
            console.log('Button is available for tomorrow.');
            return _context5.abrupt("return", parent);

          case 19:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5);
  }));
  return _GetAvailableButtonForMatch.apply(this, arguments);
}

(function () {
  var _example = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var driver, loginLink, usernameField, passwordField, loginButton, nextDay, cells, availableCells, didSelect, addToCart, memberContainers, submitButton, i, agreeButton, oneClickFinish;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return new _seleniumWebdriver.Builder().forBrowser('firefox').build();

          case 2:
            driver = _context3.sent;
            _context3.prev = 3;
            _context3.next = 6;
            return driver.get('https://web1.myvscloud.com/wbwsc/ohdublinwt.wsc/splash.html');

          case 6:
            _context3.next = 8;
            return driver.findElement(_seleniumWebdriver.By.className('login-link'));

          case 8:
            loginLink = _context3.sent;
            _context3.next = 11;
            return loginLink.click();

          case 11:
            _context3.next = 13;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.id('weblogin')), 10000);

          case 13:
            _context3.next = 15;
            return driver.findElement(_seleniumWebdriver.By.id('weblogin_username'));

          case 15:
            usernameField = _context3.sent;
            _context3.next = 18;
            return driver.findElement(_seleniumWebdriver.By.id('weblogin_password'));

          case 18:
            passwordField = _context3.sent;
            _context3.next = 21;
            return usernameField.sendKeys('6147180188');

          case 21:
            _context3.next = 23;
            return passwordField.sendKeys('Harder');

          case 23:
            _context3.next = 25;
            return driver.findElement(_seleniumWebdriver.By.id('weblogin_buttonlogin'));

          case 25:
            loginButton = _context3.sent;
            _context3.next = 28;
            return loginButton.click();

          case 28:
            _context3.next = 30;
            return driver.get('https://web1.myvscloud.com/wbwsc/ohdublinwt.wsc/search.html?SessionID=&display=Calendar&module=Activity&primarycode=fitness');

          case 30:
            nextDay = (0, _moment["default"])().add(1, 'days').date();
            _context3.next = 33;
            return driver.findElements(_seleniumWebdriver.By.className('calinner'));

          case 33:
            cells = _context3.sent;
            _context3.next = 36;
            return Promise.all(cells.map( /*#__PURE__*/function () {
              var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(cell) {
                var header, text, buttons, availableButton;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.prev = 0;
                        _context.next = 3;
                        return cell.findElement(_seleniumWebdriver.By.className('ui-widget-header'));

                      case 3:
                        header = _context.sent;
                        _context.next = 9;
                        break;

                      case 6:
                        _context.prev = 6;
                        _context.t0 = _context["catch"](0);
                        return _context.abrupt("return", null);

                      case 9:
                        if (header) {
                          _context.next = 11;
                          break;
                        }

                        return _context.abrupt("return", null);

                      case 11:
                        _context.next = 13;
                        return header.getText();

                      case 13:
                        text = _context.sent;

                        if (!("".concat(nextDay) !== text)) {
                          _context.next = 16;
                          break;
                        }

                        return _context.abrupt("return", null);

                      case 16:
                        console.log('Found a match for tomorrow');
                        _context.next = 19;
                        return cell.findElements(_seleniumWebdriver.By.className('ui-button-text'));

                      case 19:
                        buttons = _context.sent;
                        _context.next = 22;
                        return GetAvailableButtonForMatch(buttons, fiveThirtyMatch);

                      case 22:
                        availableButton = _context.sent;

                        if (availableButton) {
                          _context.next = 28;
                          break;
                        }

                        console.log('Count not get 5:30 time. Trying 7:30');
                        _context.next = 27;
                        return GetAvailableButtonForMatch(buttons, sevenThirtyMatch);

                      case 27:
                        availableButton = _context.sent;

                      case 28:
                        if (availableButton) {
                          _context.next = 31;
                          break;
                        }

                        console.log('Count not get an available time.');
                        return _context.abrupt("return", null);

                      case 31:
                        _context.next = 33;
                        return availableButton.click();

                      case 33:
                        return _context.abrupt("return", true);

                      case 34:
                      case "end":
                        return _context.stop();
                    }
                  }
                }, _callee, null, [[0, 6]]);
              }));

              return function (_x3) {
                return _ref.apply(this, arguments);
              };
            }()));

          case 36:
            availableCells = _context3.sent;
            didSelect = availableCells.find(function (item) {
              return item;
            });

            if (didSelect) {
              _context3.next = 40;
              break;
            }

            return _context3.abrupt("return");

          case 40:
            _context3.next = 42;
            return driver.wait(_seleniumWebdriver.until.elementLocated(_seleniumWebdriver.By.id('websearch_multiselect_group')), 10000);

          case 42:
            _context3.next = 44;
            return new Promise(function (resolve) {
              setTimeout(resolve, 5000);
            });

          case 44:
            _context3.next = 46;
            return driver.findElement(_seleniumWebdriver.By.className('websearch_multiselect_buttonaddtocart'));

          case 46:
            addToCart = _context3.sent;
            _context3.next = 49;
            return addToCart.click();

          case 49:
            _context3.next = 51;
            return new Promise(function (resolve) {
              setTimeout(resolve, 5000);
            });

          case 51:
            _context3.next = 53;
            return driver.findElements(_seleniumWebdriver.By.className('webaddtocartmatrix__membergroup'));

          case 53:
            memberContainers = _context3.sent;
            console.log('Containers: ', memberContainers.length);
            _context3.next = 57;
            return Promise.all(memberContainers.map( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(memberContainer) {
                var header, text, checkbox, selected;
                return regeneratorRuntime.wrap(function _callee2$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return memberContainer.findElement(_seleniumWebdriver.By.className('ui-widget-header'));

                      case 2:
                        header = _context2.sent;
                        _context2.next = 5;
                        return header.getText();

                      case 5:
                        text = _context2.sent;
                        console.log('Header Text: ', text);

                        if (['Brent Harder', 'Nicholas Harder', 'Susan Harder', 'Mitchell Harder'].includes(text)) {
                          _context2.next = 9;
                          break;
                        }

                        return _context2.abrupt("return", null);

                      case 9:
                        _context2.next = 11;
                        return memberContainer.findElement(_seleniumWebdriver.By.className('checkbox'));

                      case 11:
                        checkbox = _context2.sent;
                        _context2.next = 14;
                        return checkbox.isSelected();

                      case 14:
                        selected = _context2.sent;

                        if (selected) {
                          _context2.next = 19;
                          break;
                        }

                        console.log('Selecting: ', text);
                        _context2.next = 19;
                        return checkbox.click();

                      case 19:
                      case "end":
                        return _context2.stop();
                    }
                  }
                }, _callee2);
              }));

              return function (_x4) {
                return _ref2.apply(this, arguments);
              };
            }()));

          case 57:
            console.log('Waiting after selecting users.');
            _context3.next = 60;
            return new Promise(function (resolve) {
              setTimeout(resolve, 5000);
            });

          case 60:
            _context3.next = 62;
            return driver.findElement(_seleniumWebdriver.By.name('button201'));

          case 62:
            submitButton = _context3.sent;
            _context3.next = 65;
            return submitButton.click();

          case 65:
            _context3.next = 67;
            return new Promise(function (resolve) {
              setTimeout(resolve, 5000);
            });

          case 67:
            i = 0;

          case 68:
            if (!(i < 4)) {
              _context3.next = 80;
              break;
            }

            _context3.next = 71;
            return driver.findElement(_seleniumWebdriver.By.id('processingprompts_waivercheckbox'));

          case 71:
            agreeButton = _context3.sent;
            agreeButton.click();
            _context3.next = 75;
            return driver.findElement(_seleniumWebdriver.By.id('processingprompts_buttononeclicktofinish'));

          case 75:
            oneClickFinish = _context3.sent;
            oneClickFinish.click();

          case 77:
            i += 1;
            _context3.next = 68;
            break;

          case 80:
            _context3.prev = 80;
            _context3.next = 83;
            return driver.quit();

          case 83:
            return _context3.finish(80);

          case 84:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[3,, 80, 84]]);
  }));

  function example() {
    return _example.apply(this, arguments);
  }

  return example;
})()();