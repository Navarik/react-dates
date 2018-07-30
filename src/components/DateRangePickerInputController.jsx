import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import momentPropTypes from 'react-moment-proptypes';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import openDirectionShape from '../shapes/OpenDirectionShape';

import { DateRangePickerInputPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';

import DateRangePickerInput from './DateRangePickerInput';

import IconPositionShape from '../shapes/IconPositionShape';
import DisabledShape from '../shapes/DisabledShape';

import toMomentObject from '../utils/toMomentObject';
import toLocalizedDateString from '../utils/toLocalizedDateString';

import isInclusivelyAfterDay from '../utils/isInclusivelyAfterDay';
import isBeforeDay from '../utils/isBeforeDay';

import { START_DATE, END_DATE, ICON_BEFORE_POSITION, OPEN_DOWN } from '../constants';

const propTypes = forbidExtraProps({
  startDate: momentPropTypes.momentObj,
  startDateId: PropTypes.string,
  startDateName: PropTypes.string,
  startDatePlaceholderText: PropTypes.string,
  startDateTabIndex: PropTypes.number,
  isStartDateFocused: PropTypes.bool,

  endDate: momentPropTypes.momentObj,
  endDateId: PropTypes.string,
  endDateName: PropTypes.string,
  endDatePlaceholderText: PropTypes.string,
  endDateTabIndex: PropTypes.number,
  isEndDateFocused: PropTypes.bool,

  screenReaderMessage: PropTypes.string,
  showClearDates: PropTypes.bool,
  showCaret: PropTypes.bool,
  showDefaultInputIcon: PropTypes.bool,
  inputIconPosition: IconPositionShape,
  disabled: DisabledShape,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  openDirection: openDirectionShape,
  noBorder: PropTypes.bool,
  block: PropTypes.bool,
  small: PropTypes.bool,
  regular: PropTypes.bool,
  verticalSpacing: nonNegativeInteger,

  keepOpenOnDateSelect: PropTypes.bool,
  reopenPickerOnClearDates: PropTypes.bool,
  withFullScreenPortal: PropTypes.bool,
  minimumNights: nonNegativeInteger,
  isOutsideRange: PropTypes.func,
  displayFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  onFocusChange: PropTypes.func,
  onClose: PropTypes.func,
  onDatesChange: PropTypes.func,
  onKeyDownArrowDown: PropTypes.func,
  onKeyDownQuestionMark: PropTypes.func,

  customInputIcon: PropTypes.node,
  customArrowIcon: PropTypes.node,
  customCloseIcon: PropTypes.node,

  // accessibility
  isFocused: PropTypes.bool,

  // i18n
  phrases: PropTypes.shape(getPhrasePropTypes(DateRangePickerInputPhrases)),

  isRTL: PropTypes.bool,
});

const defaultProps = {
  startDate: null,
  startDateId: START_DATE,
  startDateName: null,
  startDatePlaceholderText: 'Start Date',
  startDateTabIndex: null,
  isStartDateFocused: false,

  endDate: null,
  endDateId: END_DATE,
  endDateName: null,
  endDatePlaceholderText: 'End Date',
  endDateTabIndex: null,
  isEndDateFocused: false,

  screenReaderMessage: '',
  showClearDates: false,
  showCaret: false,
  showDefaultInputIcon: false,
  inputIconPosition: ICON_BEFORE_POSITION,
  disabled: false,
  required: false,
  readOnly: false,
  openDirection: OPEN_DOWN,
  noBorder: false,
  block: false,
  small: false,
  regular: false,
  verticalSpacing: undefined,

  keepOpenOnDateSelect: false,
  reopenPickerOnClearDates: false,
  withFullScreenPortal: false,
  minimumNights: 1,
  isOutsideRange: day => !isInclusivelyAfterDay(day, moment()),
  displayFormat: () => moment.localeData().longDateFormat('L'),

  onFocusChange() {},
  onClose() {},
  onDatesChange() {},
  onKeyDownArrowDown() {},
  onKeyDownQuestionMark() {},

  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,

  // accessibility
  isFocused: false,

  // i18n
  phrases: DateRangePickerInputPhrases,

  isRTL: false,
};

export default class DateRangePickerInputController extends React.Component {
  constructor(props) {
    super(props);

    this.onClearFocus = this.onClearFocus.bind(this);
    this.onStartDateChange = this.onStartDateChange.bind(this);
    this.onStartDateFocus = this.onStartDateFocus.bind(this);
    this.onEndDateChange = this.onEndDateChange.bind(this);
    this.onEndDateFocus = this.onEndDateFocus.bind(this);
    this.clearDates = this.clearDates.bind(this);

    this.state = {
      startDateString: '',
      endDateString: '',
    };
  }

  onClearFocus() {
    const {
      onFocusChange,
      onClose,
      startDate,
      endDate,
    } = this.props;

    onFocusChange(null);
    onClose({ startDate, endDate });
  }

  onEndDateChange(endDateString) {
    const {
      startDate,
      isOutsideRange,
      minimumNights,
      keepOpenOnDateSelect,
      onDatesChange,
    } = this.props;

    // endDateString used for clearDate
    // TODO: what if dates get reversed?
    this.setState({ endDateString });

    const endDate = toMomentObject(endDateString, this.getDisplayFormat());
    const isEndDateValid = endDate && !isOutsideRange(endDate) &&
      !(startDate && isBeforeDay(endDate, startDate.clone().add(minimumNights, 'days')));
    if (isEndDateValid) {
      onDatesChange({ startDate, endDate });
      if (!keepOpenOnDateSelect) this.onClearFocus();
    } else {
      onDatesChange({
        startDate,
        endDate: null,
      });
    }
  }

  onEndDateFocus() {
    const {
      startDate,
      onFocusChange,
      withFullScreenPortal,
      disabled,
    } = this.props;

    if (!startDate && withFullScreenPortal && (!disabled || disabled === END_DATE)) {
      // When the datepicker is full screen, we never want to focus the end date first
      // because there's no indication that that is the case once the datepicker is open and it
      // might confuse the user
      onFocusChange(START_DATE);
    } else if (!disabled || disabled === START_DATE) {
      onFocusChange(END_DATE);
    }
  }

  onStartDateChange(startDateString) {
    let { endDate } = this.props;
    const {
      isOutsideRange,
      minimumNights,
      onDatesChange,
      onFocusChange,
      disabled,
    } = this.props;

    // startDateString used for clearDate
    // TODO: what if dates get reversed?
    this.setState({ startDateString });

    const startDate = toMomentObject(startDateString, this.getDisplayFormat());
    const isEndDateBeforeStartDate = startDate &&
      isBeforeDay(endDate, startDate.clone().add(minimumNights, 'days'));
    const isStartDateValid = startDate && !isOutsideRange(startDate) &&
      !(disabled === END_DATE && isEndDateBeforeStartDate);

    if (isStartDateValid) {
      if (isEndDateBeforeStartDate) {
        endDate = null;
      }

      onDatesChange({ startDate, endDate });
      onFocusChange(END_DATE);
    } else {
      onDatesChange({
        startDate: null,
        endDate,
      });
    }
  }

  onStartDateFocus() {
    const { disabled, onFocusChange } = this.props;
    if (!disabled || disabled === END_DATE) {
      onFocusChange(START_DATE);
    }
  }

  getDisplayFormat() {
    const { displayFormat } = this.props;
    return typeof displayFormat === 'string' ? displayFormat : displayFormat();
  }

  getDateString(date) {
    const displayFormat = this.getDisplayFormat();
    if (date && displayFormat) {
      return date && date.format(displayFormat);
    }
    return toLocalizedDateString(date);
  }

  clearDates() {
    const { onDatesChange, reopenPickerOnClearDates, onFocusChange } = this.props;
    onDatesChange({ startDate: null, endDate: null });
    this.setState({
      startDateString: '',
      endDateString: '',
    });
    if (reopenPickerOnClearDates) {
      onFocusChange(START_DATE);
    }
  }

  render() {
    const {
      startDate,
      startDateId,
      startDateName,
      startDatePlaceholderText,
      startDateTabIndex,
      isStartDateFocused,
      endDate,
      endDateId,
      endDateName,
      endDatePlaceholderText,
      endDateTabIndex,
      isEndDateFocused,
      screenReaderMessage,
      showClearDates,
      showCaret,
      showDefaultInputIcon,
      inputIconPosition,
      customInputIcon,
      customArrowIcon,
      customCloseIcon,
      disabled,
      required,
      readOnly,
      openDirection,
      isFocused,
      phrases,
      onKeyDownArrowDown,
      onKeyDownQuestionMark,
      isRTL,
      noBorder,
      block,
      small,
      regular,
      verticalSpacing,
    } = this.props;

    const {
      startDateString,
      endDateString,
    } = this.state;

    const startDateDisplayValue = this.getDateString(startDate);
    const endDateDisplayValue = this.getDateString(endDate);

    return (
      <DateRangePickerInput
        startDate={startDateDisplayValue}
        startDateString={startDateString}
        startDateId={startDateId}
        startDateName={startDateName}
        startDatePlaceholderText={startDatePlaceholderText}
        startDateTabIndex={startDateTabIndex}
        isStartDateFocused={isStartDateFocused}
        endDate={endDateDisplayValue}
        endDateString={endDateString}
        endDateId={endDateId}
        endDateName={endDateName}
        endDatePlaceholderText={endDatePlaceholderText}
        endDateTabIndex={endDateTabIndex}
        isEndDateFocused={isEndDateFocused}
        isFocused={isFocused}
        disabled={disabled}
        required={required}
        readOnly={readOnly}
        openDirection={openDirection}
        showCaret={showCaret}
        showDefaultInputIcon={showDefaultInputIcon}
        inputIconPosition={inputIconPosition}
        customInputIcon={customInputIcon}
        customArrowIcon={customArrowIcon}
        customCloseIcon={customCloseIcon}
        phrases={phrases}
        onStartDateChange={this.onStartDateChange}
        onStartDateFocus={this.onStartDateFocus}
        onStartDateShiftTab={this.onClearFocus}
        onEndDateChange={this.onEndDateChange}
        onEndDateFocus={this.onEndDateFocus}
        onEndDateTab={this.onClearFocus}
        showClearDates={showClearDates}
        onClearDates={this.clearDates}
        screenReaderMessage={screenReaderMessage}
        onKeyDownArrowDown={onKeyDownArrowDown}
        onKeyDownQuestionMark={onKeyDownQuestionMark}
        isRTL={isRTL}
        noBorder={noBorder}
        block={block}
        small={small}
        regular={regular}
        verticalSpacing={verticalSpacing}
      />
    );
  }
}

DateRangePickerInputController.propTypes = propTypes;
DateRangePickerInputController.defaultProps = defaultProps;
