import moment from 'moment';
import toISOMonthString from './toISOMonthString';

function getVisibleDaysByMonth(currentMonth, enableOutsideDays) {
  const visibleDays = [];

  // set utc offset to get correct dates in future (when timezone changes)
  const baseDate = currentMonth.clone();
  const firstOfMonth = baseDate.clone().startOf('month').hour(12);
  const lastOfMonth = baseDate.clone().endOf('month').hour(12);

  const currentDay = firstOfMonth.clone();

  // days belonging to the previous month
  if (enableOutsideDays) {
    for (let j = 0; j < currentDay.weekday(); j += 1) {
      const prevDay = currentDay.clone().subtract(j + 1, 'day');
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
      for (let k = currentDay.weekday(), count = 0; k < 7; k += 1, count += 1) {
        const nextDay = currentDay.clone().add(count, 'day');
        visibleDays.push(nextDay);
      }
    }
  }

  return visibleDays;
}

export default function getVisibleDays(
  month,
  numberOfMonths,
  enableOutsideDays,
  withoutTransitionMonths,
  skipMonths = [],
) {
  if (!moment.isMoment(month)) return {};

  const months = {};
  let monthClone;

  if (!withoutTransitionMonths) {
    // add months for prev year
    monthClone = month.clone().subtract(1, 'year');
    for (let i = 0; i < numberOfMonths; i += 1) {
      const monthStr = toISOMonthString(monthClone);
      if (!skipMonths.includes(monthStr)) {
        months[monthStr] = getVisibleDaysByMonth(monthClone, enableOutsideDays);
      }
      monthClone = monthClone.clone().add(1, 'month');
    }
  }

  // add visible months (and prev/next month if TransitionMonths)
  monthClone = month.clone();
  if (!withoutTransitionMonths) monthClone = monthClone.subtract(1, 'month');
  for (let i = 0; i < (withoutTransitionMonths ? numberOfMonths : numberOfMonths + 2); i += 1) {
    const monthStr = toISOMonthString(monthClone);
    if (!skipMonths.includes(monthStr)) {
      months[toISOMonthString(monthClone)] = getVisibleDaysByMonth(monthClone, enableOutsideDays);
    }
    monthClone = monthClone.clone().add(1, 'month');
  }

  if (!withoutTransitionMonths) {
    // add months for next year
    monthClone = month.clone().add(1, 'year');
    for (let i = 0; i < numberOfMonths; i += 1) {
      const monthStr = toISOMonthString(monthClone);
      if (!skipMonths.includes(monthStr)) {
        months[toISOMonthString(monthClone)] = getVisibleDaysByMonth(monthClone, enableOutsideDays);
      }
      monthClone = monthClone.clone().add(1, 'month');
    }
  }

  console.log('getVisibleDays', {months,skipMonths});

  return months;
}
