Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = registerInterfaceWithDefaultTheme;

var _ThemedStyleSheet = require('react-with-styles/lib/ThemedStyleSheet');

var _ThemedStyleSheet2 = _interopRequireDefault(_ThemedStyleSheet);

var _CustomTheme = require('../theme/CustomTheme');

var _CustomTheme2 = _interopRequireDefault(_CustomTheme);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function registerInterfaceWithDefaultTheme(reactWithStylesInterface) {
  _ThemedStyleSheet2['default'].registerInterface(reactWithStylesInterface);
  _ThemedStyleSheet2['default'].registerTheme(_CustomTheme2['default']);
}
// import DefaultTheme from '../theme/DefaultTheme';
// TODO: find a better way of implementing