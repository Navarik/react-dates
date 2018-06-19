Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _object = require('object.assign');

var _object2 = _interopRequireDefault(_object);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactAddonsShallowCompare = require('react-addons-shallow-compare');

var _reactAddonsShallowCompare2 = _interopRequireDefault(_reactAddonsShallowCompare);

var _reactMomentProptypes = require('react-moment-proptypes');

var _reactMomentProptypes2 = _interopRequireDefault(_reactMomentProptypes);

var _airbnbPropTypes = require('airbnb-prop-types');

var _reactWithStyles = require('react-with-styles');

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _defaultPhrases = require('../defaultPhrases');

var _getPhrasePropTypes = require('../utils/getPhrasePropTypes');

var _getPhrasePropTypes2 = _interopRequireDefault(_getPhrasePropTypes);

var _CalendarWeek = require('./CalendarWeek');

var _CalendarWeek2 = _interopRequireDefault(_CalendarWeek);

var _CalendarDay = require('./CalendarDay');

var _CalendarDay2 = _interopRequireDefault(_CalendarDay);

var _calculateDimension = require('../utils/calculateDimension');

var _calculateDimension2 = _interopRequireDefault(_calculateDimension);

var _getCalendarMonthWeeks = require('../utils/getCalendarMonthWeeks');

var _getCalendarMonthWeeks2 = _interopRequireDefault(_getCalendarMonthWeeks);

var _isSameDay = require('../utils/isSameDay');

var _isSameDay2 = _interopRequireDefault(_isSameDay);

var _toISODateString = require('../utils/toISODateString');

var _toISODateString2 = _interopRequireDefault(_toISODateString);

var _ScrollableOrientationShape = require('../shapes/ScrollableOrientationShape');

var _ScrollableOrientationShape2 = _interopRequireDefault(_ScrollableOrientationShape);

var _DayOfWeekShape = require('../shapes/DayOfWeekShape');

var _DayOfWeekShape2 = _interopRequireDefault(_DayOfWeekShape);

var _constants = require('../constants');

var _ChevronUp = require('./ChevronUp');

var _ChevronUp2 = _interopRequireDefault(_ChevronUp);

var _ChevronDown = require('./ChevronDown');

var _ChevronDown2 = _interopRequireDefault(_ChevronDown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /* eslint react/no-array-index-key: 0 */

var propTypes = (0, _airbnbPropTypes.forbidExtraProps)((0, _object2['default'])({}, _reactWithStyles.withStylesPropTypes, {
  month: _reactMomentProptypes2['default'].momentObj,
  isVisible: _propTypes2['default'].bool,
  enableOutsideDays: _propTypes2['default'].bool,
  modifiers: _propTypes2['default'].object,
  orientation: _ScrollableOrientationShape2['default'],
  daySize: _airbnbPropTypes.nonNegativeInteger,
  onDayClick: _propTypes2['default'].func,
  onDayMouseEnter: _propTypes2['default'].func,
  onDayMouseLeave: _propTypes2['default'].func,
  renderMonth: _propTypes2['default'].func,
  renderCalendarDay: _propTypes2['default'].func,
  renderDayContents: _propTypes2['default'].func,
  firstDayOfWeek: _DayOfWeekShape2['default'],
  setMonthHeight: _propTypes2['default'].func,
  verticalBorderSpacing: _airbnbPropTypes.nonNegativeInteger,
  onPrevYearClick: _propTypes2['default'].func,
  onNextYearClick: _propTypes2['default'].func,

  focusedDate: _reactMomentProptypes2['default'].momentObj, // indicates focusable day
  isFocused: _propTypes2['default'].bool, // indicates whether or not to move focus to focusable day

  // i18n
  monthFormat: _propTypes2['default'].string,
  phrases: _propTypes2['default'].shape((0, _getPhrasePropTypes2['default'])(_defaultPhrases.CalendarDayPhrases)),
  dayAriaLabelFormat: _propTypes2['default'].string,

  showYearNav: _propTypes2['default'].bool,
  monthIndex: _propTypes2['default'].number
}));

var defaultProps = {
  month: (0, _moment2['default'])(),
  isVisible: true,
  enableOutsideDays: false,
  modifiers: {},
  orientation: _constants.HORIZONTAL_ORIENTATION,
  daySize: _constants.DAY_SIZE,
  onDayClick: function () {
    function onDayClick() {}

    return onDayClick;
  }(),
  onDayMouseEnter: function () {
    function onDayMouseEnter() {}

    return onDayMouseEnter;
  }(),
  onDayMouseLeave: function () {
    function onDayMouseLeave() {}

    return onDayMouseLeave;
  }(),

  renderMonth: null,
  renderCalendarDay: function () {
    function renderCalendarDay(props) {
      return _react2['default'].createElement(_CalendarDay2['default'], props);
    }

    return renderCalendarDay;
  }(),
  renderDayContents: null,
  firstDayOfWeek: null,
  setMonthHeight: function () {
    function setMonthHeight() {}

    return setMonthHeight;
  }(),


  focusedDate: null,
  isFocused: false,

  // i18n
  monthFormat: 'MMMM YYYY', // english locale
  phrases: _defaultPhrases.CalendarDayPhrases,
  dayAriaLabelFormat: undefined,
  verticalBorderSpacing: undefined,

  showYearNav: false,
  monthIndex: undefined
};

var CalendarMonth = function (_React$Component) {
  _inherits(CalendarMonth, _React$Component);

  function CalendarMonth(props) {
    _classCallCheck(this, CalendarMonth);

    var _this = _possibleConstructorReturn(this, (CalendarMonth.__proto__ || Object.getPrototypeOf(CalendarMonth)).call(this, props));

    _this.state = {
      weeks: (0, _getCalendarMonthWeeks2['default'])(props.month, props.enableOutsideDays, props.firstDayOfWeek == null ? _moment2['default'].localeData().firstDayOfWeek() : props.firstDayOfWeek)
    };

    _this.setCaptionRef = _this.setCaptionRef.bind(_this);
    _this.setGridRef = _this.setGridRef.bind(_this);
    _this.setMonthHeight = _this.setMonthHeight.bind(_this);
    return _this;
  }

  _createClass(CalendarMonth, [{
    key: 'componentDidMount',
    value: function () {
      function componentDidMount() {
        this.setMonthHeightTimeout = setTimeout(this.setMonthHeight, 0);
      }

      return componentDidMount;
    }()
  }, {
    key: 'componentWillReceiveProps',
    value: function () {
      function componentWillReceiveProps(nextProps) {
        var month = nextProps.month,
            enableOutsideDays = nextProps.enableOutsideDays,
            firstDayOfWeek = nextProps.firstDayOfWeek;

        if (!month.isSame(this.props.month) || enableOutsideDays !== this.props.enableOutsideDays || firstDayOfWeek !== this.props.firstDayOfWeek) {
          this.setState({
            weeks: (0, _getCalendarMonthWeeks2['default'])(month, enableOutsideDays, firstDayOfWeek == null ? _moment2['default'].localeData().firstDayOfWeek() : firstDayOfWeek)
          });
        }
      }

      return componentWillReceiveProps;
    }()
  }, {
    key: 'shouldComponentUpdate',
    value: function () {
      function shouldComponentUpdate(nextProps, nextState) {
        return (0, _reactAddonsShallowCompare2['default'])(this, nextProps, nextState);
      }

      return shouldComponentUpdate;
    }()
  }, {
    key: 'componentDidUpdate',
    value: function () {
      function componentDidUpdate(prevProps) {
        if (prevProps.monthIndex !== this.props.monthIndex) {
          this.setMonthHeightTimeout = setTimeout(this.setMonthHeight, 0);
        }
      }

      return componentDidUpdate;
    }()
  }, {
    key: 'componentWillUnmount',
    value: function () {
      function componentWillUnmount() {
        if (this.setMonthHeightTimeout) {
          clearTimeout(this.setMonthHeightTimeout);
        }
      }

      return componentWillUnmount;
    }()
  }, {
    key: 'setMonthHeight',
    value: function () {
      function setMonthHeight() {
        var setMonthHeight = this.props.setMonthHeight;

        var captionHeight = (0, _calculateDimension2['default'])(this.captionRef, 'height', true, true);
        var gridHeight = (0, _calculateDimension2['default'])(this.gridRef, 'height');

        setMonthHeight(captionHeight + gridHeight + 1);
      }

      return setMonthHeight;
    }()
  }, {
    key: 'setCaptionRef',
    value: function () {
      function setCaptionRef(ref) {
        this.captionRef = ref;
      }

      return setCaptionRef;
    }()
  }, {
    key: 'setGridRef',
    value: function () {
      function setGridRef(ref) {
        this.gridRef = ref;
      }

      return setGridRef;
    }()
  }, {
    key: 'maybeRenderYearNav',
    value: function () {
      function maybeRenderYearNav() {
        var _props = this.props,
            month = _props.month,
            styles = _props.styles,
            onPrevYearClick = _props.onPrevYearClick,
            onNextYearClick = _props.onNextYearClick,
            showYearNav = _props.showYearNav;

        // TODO: improve this to allow custom format?

        var yearTitle = month.format('YYYY');

        if (!showYearNav) {
          return _react2['default'].createElement(
            'strong',
            null,
            yearTitle
          );
        }

        return _react2['default'].createElement(
          'div',
          (0, _reactWithStyles.css)(styles.CalendarMonth_yearNav_wrapper),
          _react2['default'].createElement(
            'strong',
            null,
            yearTitle
          ),
          _react2['default'].createElement(
            'div',
            (0, _reactWithStyles.css)(styles.CalendarMonth_yearNav_btnWrapper),
            _react2['default'].createElement(_ChevronUp2['default'], _extends({
              onClick: onNextYearClick
            }, (0, _reactWithStyles.css)(styles.CalendarMonth_yearNav))),
            _react2['default'].createElement(_ChevronDown2['default'], _extends({
              onClick: onPrevYearClick
            }, (0, _reactWithStyles.css)(styles.CalendarMonth_yearNav)))
          )
        );
      }

      return maybeRenderYearNav;
    }()
  }, {
    key: 'render',
    value: function () {
      function render() {
        var _props2 = this.props,
            month = _props2.month,
            orientation = _props2.orientation,
            isVisible = _props2.isVisible,
            modifiers = _props2.modifiers,
            onDayClick = _props2.onDayClick,
            onDayMouseEnter = _props2.onDayMouseEnter,
            onDayMouseLeave = _props2.onDayMouseLeave,
            renderMonth = _props2.renderMonth,
            renderCalendarDay = _props2.renderCalendarDay,
            renderDayContents = _props2.renderDayContents,
            daySize = _props2.daySize,
            focusedDate = _props2.focusedDate,
            isFocused = _props2.isFocused,
            styles = _props2.styles,
            phrases = _props2.phrases,
            dayAriaLabelFormat = _props2.dayAriaLabelFormat,
            verticalBorderSpacing = _props2.verticalBorderSpacing;
        var weeks = this.state.weeks;
        // TODO: improve this to allow custom format?

        var monthTitle = renderMonth ? renderMonth(month) : month.format('MMMM');

        var verticalScrollable = orientation === _constants.VERTICAL_SCROLLABLE;

        return _react2['default'].createElement(
          'div',
          _extends({}, (0, _reactWithStyles.css)(styles.CalendarMonth, orientation === _constants.HORIZONTAL_ORIENTATION && styles.CalendarMonth__horizontal, orientation === _constants.VERTICAL_ORIENTATION && styles.CalendarMonth__vertical, verticalScrollable && styles.CalendarMonth__verticalScrollable), {
            'data-visible': isVisible
          }),
          _react2['default'].createElement(
            'div',
            _extends({
              ref: this.setCaptionRef
            }, (0, _reactWithStyles.css)(styles.CalendarMonth_caption, verticalScrollable && styles.CalendarMonth_caption__verticalScrollable)),
            _react2['default'].createElement(
              'strong',
              (0, _reactWithStyles.css)(styles.CalendarMonth_month),
              monthTitle
            ),
            this.maybeRenderYearNav()
          ),
          _react2['default'].createElement(
            'table',
            _extends({}, (0, _reactWithStyles.css)(!verticalBorderSpacing && styles.CalendarMonth_table, verticalBorderSpacing && styles.CalendarMonth_verticalSpacing, verticalBorderSpacing && { borderSpacing: '0px ' + String(verticalBorderSpacing) + 'px' }), {
              role: 'presentation'
            }),
            _react2['default'].createElement(
              'tbody',
              { ref: this.setGridRef },
              weeks.map(function (week, i) {
                return _react2['default'].createElement(
                  _CalendarWeek2['default'],
                  { key: i },
                  week.map(function (day, dayOfWeek) {
                    return renderCalendarDay({
                      key: dayOfWeek,
                      day: day,
                      daySize: daySize,
                      isOutsideDay: !day || day.month() !== month.month(),
                      tabIndex: isVisible && (0, _isSameDay2['default'])(day, focusedDate) ? 0 : -1,
                      isFocused: isFocused,
                      onDayMouseEnter: onDayMouseEnter,
                      onDayMouseLeave: onDayMouseLeave,
                      onDayClick: onDayClick,
                      renderDayContents: renderDayContents,
                      phrases: phrases,
                      modifiers: modifiers[(0, _toISODateString2['default'])(day)],
                      ariaLabelFormat: dayAriaLabelFormat
                    });
                  })
                );
              })
            )
          )
        );
      }

      return render;
    }()
  }]);

  return CalendarMonth;
}(_react2['default'].Component);

CalendarMonth.propTypes = propTypes;
CalendarMonth.defaultProps = defaultProps;

exports['default'] = (0, _reactWithStyles.withStyles)(function (_ref) {
  var _ref$reactDates = _ref.reactDates,
      color = _ref$reactDates.color,
      font = _ref$reactDates.font,
      spacing = _ref$reactDates.spacing;
  return {
    CalendarMonth: {
      background: color.background,
      textAlign: 'center',
      padding: '0 13px',
      verticalAlign: 'top',
      userSelect: 'none'
    },

    CalendarMonth_table: {
      borderCollapse: 'collapse',
      borderSpacing: 0
    },

    CalendarMonth_verticalSpacing: {
      borderCollapse: 'separate'
    },

    CalendarMonth_caption: {
      color: color.text,
      fontSize: font.captionSize,
      textAlign: 'center',
      paddingTop: 18,
      paddingBottom: spacing.captionPaddingBottom,
      captionSide: 'initial',
      lineHeight: '34px'
    },

    CalendarMonth_caption__verticalScrollable: {
      paddingTop: 12,
      paddingBottom: 7
    },

    CalendarMonth_yearNav_wrapper: {
      paddingLeft: 5,
      display: 'inline-block',
      height: 34,
      border: '1px solid ' + String(color.core.borderLight),
      borderRadius: 3,
      fontSize: font.captionSize,
      boxSizing: 'border-box'
    },

    CalendarMonth_month: {
      paddingRight: 5
    },

    CalendarMonth_yearNav_btnWrapper: {
      display: 'inline-block',
      height: '100%',
      marginLeft: 3,
      float: 'right'
    },

    CalendarMonth_yearNav: {
      height: '50%',
      display: 'block',
      width: 17,
      padding: 3,
      fontSize: 12,
      overflow: 'hidden',
      backgroundColor: color.background,
      color: color.placeholderText,
      // border: 'none',
      cursor: 'pointer',

      border: '1px solid transparent',
      borderRadius: 3,

      ':hover': {
        border: '1px solid ' + String(color.core.borderLight),
        backgroundColor: color.core.borderLight
      },

      ':focus': {
        border: '1px solid ' + String(color.core.borderLight),
        backgroundColor: color.core.borderLight
      }
    }
  };
})(CalendarMonth);