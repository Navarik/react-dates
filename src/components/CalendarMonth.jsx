/* eslint react/no-array-index-key: 0 */

import React from 'react';
import PropTypes from 'prop-types';
import shallowCompare from 'react-addons-shallow-compare';
import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';
import moment from 'moment';

import { CalendarDayPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import CalendarWeek from './CalendarWeek';
import CalendarDay from './CalendarDay';

import calculateDimension from '../utils/calculateDimension';
import getCalendarMonthWeeks from '../utils/getCalendarMonthWeeks';
import isSameDay from '../utils/isSameDay';
import toISODateString from '../utils/toISODateString';

import ScrollableOrientationShape from '../shapes/ScrollableOrientationShape';
import DayOfWeekShape from '../shapes/DayOfWeekShape';

import {
  HORIZONTAL_ORIENTATION,
  VERTICAL_ORIENTATION,
  VERTICAL_SCROLLABLE,
  DAY_SIZE,
} from '../constants';

const propTypes = forbidExtraProps({
  ...withStylesPropTypes,
  month: momentPropTypes.momentObj,
  isVisible: PropTypes.bool,
  enableOutsideDays: PropTypes.bool,
  modifiers: PropTypes.object,
  orientation: ScrollableOrientationShape,
  daySize: nonNegativeInteger,
  onDayClick: PropTypes.func,
  onDayMouseEnter: PropTypes.func,
  onDayMouseLeave: PropTypes.func,
  renderMonth: PropTypes.func,
  renderCalendarDay: PropTypes.func,
  renderDayContents: PropTypes.func,
  firstDayOfWeek: DayOfWeekShape,
  setMonthHeight: PropTypes.func,
  verticalBorderSpacing: nonNegativeInteger,
  onPrevYearClick: PropTypes.func,
  onNextYearClick: PropTypes.func,

  focusedDate: momentPropTypes.momentObj, // indicates focusable day
  isFocused: PropTypes.bool, // indicates whether or not to move focus to focusable day

  // i18n
  monthFormat: PropTypes.string,
  phrases: PropTypes.shape(getPhrasePropTypes(CalendarDayPhrases)),
  dayAriaLabelFormat: PropTypes.string,

  showYearNav: PropTypes.bool,
  monthIndex: PropTypes.number,
});

const defaultProps = {
  month: moment(),
  isVisible: true,
  enableOutsideDays: false,
  modifiers: {},
  orientation: HORIZONTAL_ORIENTATION,
  daySize: DAY_SIZE,
  onDayClick() {},
  onDayMouseEnter() {},
  onDayMouseLeave() {},
  renderMonth: null,
  renderCalendarDay: props => (<CalendarDay {...props} />),
  renderDayContents: null,
  firstDayOfWeek: null,
  setMonthHeight() {},

  focusedDate: null,
  isFocused: false,

  // i18n
  monthFormat: 'MMMM YYYY', // english locale
  phrases: CalendarDayPhrases,
  dayAriaLabelFormat: undefined,
  verticalBorderSpacing: undefined,

  showYearNav: false,
  monthIndex: undefined,
};

class CalendarMonth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      weeks: getCalendarMonthWeeks(
        props.month,
        props.enableOutsideDays,
        props.firstDayOfWeek == null ? moment.localeData().firstDayOfWeek() : props.firstDayOfWeek,
      ),
    };

    this.setCaptionRef = this.setCaptionRef.bind(this);
    this.setGridRef = this.setGridRef.bind(this);
    this.setMonthHeight = this.setMonthHeight.bind(this);
  }

  componentDidMount() {
    this.setMonthHeightTimeout = setTimeout(this.setMonthHeight, 0);
  }

  componentWillReceiveProps(nextProps) {
    const { month, enableOutsideDays, firstDayOfWeek } = nextProps;
    if (!month.isSame(this.props.month)
        || enableOutsideDays !== this.props.enableOutsideDays
        || firstDayOfWeek !== this.props.firstDayOfWeek) {
      this.setState({
        weeks: getCalendarMonthWeeks(
          month,
          enableOutsideDays,
          firstDayOfWeek == null ? moment.localeData().firstDayOfWeek() : firstDayOfWeek,
        ),
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return shallowCompare(this, nextProps, nextState);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.monthIndex !== this.props.monthIndex) {
      this.setMonthHeightTimeout = setTimeout(this.setMonthHeight, 0);
    }
  }

  componentWillUnmount() {
    if (this.setMonthHeightTimeout) {
      clearTimeout(this.setMonthHeightTimeout);
    }
  }

  setMonthHeight() {
    const { setMonthHeight } = this.props;
    const captionHeight = calculateDimension(this.captionRef, 'height', true, true);
    const gridHeight = calculateDimension(this.gridRef, 'height');

    setMonthHeight(captionHeight + gridHeight + 1);
  }

  setCaptionRef(ref) {
    this.captionRef = ref;
  }

  setGridRef(ref) {
    this.gridRef = ref;
  }

  maybeRenderYearNav() {
    const {
      month,
      styles,
      onPrevYearClick,
      onNextYearClick,
      showYearNav,
    } = this.props;

    // TODO: improve this to allow custom format?
    const yearTitle = month.format('YYYY');

    if (!showYearNav) {
      return (
        <strong>{yearTitle}</strong>
      );
    }

    return (
      <div {...css(styles.CalendarMonth_yearNav_wrapper)}>
        <strong>{yearTitle}</strong>
        <div {...css(styles.CalendarMonth_yearNav_btnWrapper)}>
          <button
            onClick={onNextYearClick}
            {...css(styles.CalendarMonth_yearNav)}
          >+
          </button>
          <button
            onClick={onPrevYearClick}
            {...css(styles.CalendarMonth_yearNav)}
          >-
          </button>
        </div>
      </div>
    );
  }

  render() {
    const {
      month,
      orientation,
      isVisible,
      modifiers,
      onDayClick,
      onDayMouseEnter,
      onDayMouseLeave,
      renderMonth,
      renderCalendarDay,
      renderDayContents,
      daySize,
      focusedDate,
      isFocused,
      styles,
      phrases,
      dayAriaLabelFormat,
      verticalBorderSpacing,
    } = this.props;

    const { weeks } = this.state;
    // TODO: improve this to allow custom format?
    const monthTitle = renderMonth ? renderMonth(month) : month.format('MMMM');

    const verticalScrollable = orientation === VERTICAL_SCROLLABLE;

    return (
      <div
        {...css(
          styles.CalendarMonth,
          orientation === HORIZONTAL_ORIENTATION && styles.CalendarMonth__horizontal,
          orientation === VERTICAL_ORIENTATION && styles.CalendarMonth__vertical,
          verticalScrollable && styles.CalendarMonth__verticalScrollable,
        )}
        data-visible={isVisible}
      >
        <div
          ref={this.setCaptionRef}
          {...css(
            styles.CalendarMonth_caption,
            verticalScrollable && styles.CalendarMonth_caption__verticalScrollable,
          )}
        >
          <strong {...css(styles.CalendarMonth_month)}>{monthTitle}</strong>
          {this.maybeRenderYearNav()}
        </div>

        <table
          {...css(
            !verticalBorderSpacing && styles.CalendarMonth_table,
            verticalBorderSpacing && styles.CalendarMonth_verticalSpacing,
            verticalBorderSpacing && { borderSpacing: `0px ${verticalBorderSpacing}px` },
          )}
          role="presentation"
        >
          <tbody ref={this.setGridRef}>
            {weeks.map((week, i) => (
              <CalendarWeek key={i}>
                {week.map((day, dayOfWeek) => renderCalendarDay({
                  key: dayOfWeek,
                  day,
                  daySize,
                  isOutsideDay: !day || day.month() !== month.month(),
                  tabIndex: isVisible && isSameDay(day, focusedDate) ? 0 : -1,
                  isFocused,
                  onDayMouseEnter,
                  onDayMouseLeave,
                  onDayClick,
                  renderDayContents,
                  phrases,
                  modifiers: modifiers[toISODateString(day)],
                  ariaLabelFormat: dayAriaLabelFormat,
                }))}
              </CalendarWeek>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

CalendarMonth.propTypes = propTypes;
CalendarMonth.defaultProps = defaultProps;

export default withStyles(({ reactDates: { color, font, spacing } }) => ({
  CalendarMonth: {
    background: color.background,
    textAlign: 'center',
    padding: '0 13px',
    verticalAlign: 'top',
    userSelect: 'none',
  },

  CalendarMonth_table: {
    borderCollapse: 'collapse',
    borderSpacing: 0,
  },

  CalendarMonth_verticalSpacing: {
    borderCollapse: 'separate',
  },

  CalendarMonth_caption: {
    color: color.text,
    fontSize: font.captionSize,
    textAlign: 'center',
    paddingTop: 18,
    paddingBottom: spacing.captionPaddingBottom,
    captionSide: 'initial',
    lineHeight: '34px',
  },

  CalendarMonth_caption__verticalScrollable: {
    paddingTop: 12,
    paddingBottom: 7,
  },

  CalendarMonth_yearNav_wrapper: {
    paddingLeft: 5,
    display: 'inline-block',
    height: 34,
    border: `1px solid ${color.core.borderLight}`,
    borderRadius: 3,

    ':hover': {
      border: `1px solid ${color.core.borderMedium}`,
    },
  },

  CalendarMonth_month: {
    paddingRight: 5,
  },

  CalendarMonth_yearNav_btnWrapper: {
    display: 'inline-block',
    height: '100%',
    marginLeft: 3,
    float: 'right',
  },

  CalendarMonth_yearNav: {
    height: '50%',
    display: 'block',
    width: 17,
    padding: 0,
    fontSize: 12,
    overflow: 'hidden',
    backgroundColor: color.background,
    color: color.placeholderText,
    border: 'none',
    cursor: 'pointer',

    ':focus': {
      backgroundColor: color.core.borderLight,
    },

    ':hover': {
      backgroundColor: color.core.borderLight,
    },
  },
}))(CalendarMonth);

