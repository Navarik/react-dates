Object.defineProperty(exports, "__esModule", {
  value: true
});
exports['default'] = getVisibleDays;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _toISOMonthString = require('./toISOMonthString');

var _toISOMonthString2 = _interopRequireDefault(_toISOMonthString);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function getVisibleDaysByMonth(currentMonth, enableOutsideDays) {
  var visibleDays = [];

  // set utc offset to get correct dates in future (when timezone changes)
  var baseDate = currentMonth.clone();
  var firstOfMonth = baseDate.clone().startOf('month').hour(12);
  var lastOfMonth = baseDate.clone().endOf('month').hour(12);

  var currentDay = firstOfMonth.clone();

  // days belonging to the previous month
  if (enableOutsideDays) {
    for (var j = 0; j < currentDay.weekday(); j += 1) {
      var prevDay = currentDay.clone().subtract(j + 1, 'day');
      visibleDays.unshift(prevDay);
    }
  }

  while (currentDay < lastOfMonth) {
    visibleDays.push(currentDay.clone());
    currentDay.add(1, 'day');
  }

  if (enableOutsideDays) {
    // weekday() returns the index of the day of the week according to the locale
    // this means if the week starts on Monday, weekday() will return 0 for a Monday date, not 1
    if (currentDay.weekday() !== 0) {
      // days belonging to the next month
      for (var k = currentDay.weekday(), count = 0; k < 7; k += 1, count += 1) {
        var nextDay = currentDay.clone().add(count, 'day');
        visibleDays.push(nextDay);
      }
    }
  }

  return visibleDays;
}

function getVisibleDays(month, numberOfMonths, enableOutsideDays, withoutTransitionMonths) {
  var skipMonths = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : [];

  if (!_moment2['default'].isMoment(month)) return {};

  var months = {};
  var monthClone = void 0;

  if (!withoutTransitionMonths) {
    // add months for prev year
    monthClone = month.clone().subtract(1, 'year');
    for (var i = 0; i < numberOfMonths; i += 1) {
      var monthStr = (0, _toISOMonthString2['default'])(monthClone);
      if (!skipMonths.includes(monthStr)) {
        months[monthStr] = getVisibleDaysByMonth(monthClone, enableOutsideDays);
      }
      monthClone = monthClone.clone().add(1, 'month');
    }
  }

  // add visible months (and prev/next month if TransitionMonths)
  monthClone = month.clone();
  if (!withoutTransitionMonths) monthClone = monthClone.subtract(1, 'month');
  for (var _i = 0; _i < (withoutTransitionMonths ? numberOfMonths : numberOfMonths + 2); _i += 1) {
    var _monthStr = (0, _toISOMonthString2['default'])(monthClone);
    if (!skipMonths.includes(_monthStr)) {
      months[(0, _toISOMonthString2['default'])(monthClone)] = getVisibleDaysByMonth(monthClone, enableOutsideDays);
    }
    monthClone = monthClone.clone().add(1, 'month');
  }

  if (!withoutTransitionMonths) {
    // add months for next year
    monthClone = month.clone().add(1, 'year');
    for (var _i2 = 0; _i2 < numberOfMonths; _i2 += 1) {
      var _monthStr2 = (0, _toISOMonthString2['default'])(monthClone);
      if (!skipMonths.includes(_monthStr2)) {
        months[(0, _toISOMonthString2['default'])(monthClone)] = getVisibleDaysByMonth(monthClone, enableOutsideDays);
      }
      monthClone = monthClone.clone().add(1, 'month');
    }
  }

  return months;
}