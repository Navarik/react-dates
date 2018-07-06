import React from 'react';
import PropTypes from 'prop-types';
import { forbidExtraProps, nonNegativeInteger } from 'airbnb-prop-types';
import { css, withStyles, withStylesPropTypes } from 'react-with-styles';

import { DateRangePickerInputPhrases } from '../defaultPhrases';
import getPhrasePropTypes from '../utils/getPhrasePropTypes';
import openDirectionShape from '../shapes/OpenDirectionShape';

import DateInput from './DateInput';
import IconPositionShape from '../shapes/IconPositionShape';
import DisabledShape from '../shapes/DisabledShape';

import RightArrow from './RightArrow';
import LeftArrow from './LeftArrow';
import CloseButton from './CloseButton';
import CalendarIcon from './CalendarIcon';

import {
  START_DATE,
  END_DATE,
  ICON_BEFORE_POSITION,
  ICON_AFTER_POSITION,
  OPEN_DOWN,
} from '../constants';

const propTypes = forbidExtraProps({
  ...withStylesPropTypes,
  startDateId: PropTypes.string,
  startDateName: PropTypes.string,
  startDatePlaceholderText: PropTypes.string,
  screenReaderMessage: PropTypes.string,

  endDateId: PropTypes.string,
  endDateName: PropTypes.string,
  endDatePlaceholderText: PropTypes.string,

  onStartDateFocus: PropTypes.func,
  onEndDateFocus: PropTypes.func,
  onStartDateChange: PropTypes.func,
  onEndDateChange: PropTypes.func,
  onStartDateShiftTab: PropTypes.func,
  onEndDateTab: PropTypes.func,
  onClearDates: PropTypes.func,
  onKeyDownArrowDown: PropTypes.func,
  onKeyDownQuestionMark: PropTypes.func,

  startDate: PropTypes.string,
  startDateString: PropTypes.string,
  endDate: PropTypes.string,
  endDateString: PropTypes.string,

  isStartDateFocused: PropTypes.bool,
  isEndDateFocused: PropTypes.bool,
  showClearDates: PropTypes.bool,
  disabled: DisabledShape,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  openDirection: openDirectionShape,
  showCaret: PropTypes.bool,
  showDefaultInputIcon: PropTypes.bool,
  inputIconPosition: IconPositionShape,
  customInputIcon: PropTypes.node,
  customArrowIcon: PropTypes.node,
  customCloseIcon: PropTypes.node,
  noBorder: PropTypes.bool,
  block: PropTypes.bool,
  small: PropTypes.bool,
  regular: PropTypes.bool,
  verticalSpacing: nonNegativeInteger,

  // accessibility
  isFocused: PropTypes.bool, // describes actual DOM focus

  // i18n
  phrases: PropTypes.shape(getPhrasePropTypes(DateRangePickerInputPhrases)),

  isRTL: PropTypes.bool,
});

const defaultProps = {
  startDateId: START_DATE,
  startDateName: null,
  endDateId: END_DATE,
  endDateName: null,
  startDatePlaceholderText: 'Start Date',
  endDatePlaceholderText: 'End Date',
  screenReaderMessage: '',
  onStartDateFocus() {},
  onEndDateFocus() {},
  onStartDateChange() {},
  onEndDateChange() {},
  onStartDateShiftTab() {},
  onEndDateTab() {},
  onClearDates() {},
  onKeyDownArrowDown() {},
  onKeyDownQuestionMark() {},

  startDate: '',
  startDateString: '',
  endDate: '',
  endDateString: '',

  isStartDateFocused: false,
  isEndDateFocused: false,
  showClearDates: false,
  disabled: false,
  required: false,
  readOnly: false,
  openDirection: OPEN_DOWN,
  showCaret: false,
  showDefaultInputIcon: false,
  inputIconPosition: ICON_BEFORE_POSITION,
  customInputIcon: null,
  customArrowIcon: null,
  customCloseIcon: null,
  noBorder: false,
  block: false,
  small: false,
  regular: false,
  verticalSpacing: undefined,

  // accessibility
  isFocused: false,

  // i18n
  phrases: DateRangePickerInputPhrases,

  isRTL: false,
};

function DateRangePickerInput({
  startDate,
  startDateString,
  startDateId,
  startDateName,
  startDatePlaceholderText,
  screenReaderMessage,
  isStartDateFocused,
  onStartDateChange,
  onStartDateFocus,
  onStartDateShiftTab,
  endDate,
  endDateString,
  endDateId,
  endDateName,
  endDatePlaceholderText,
  isEndDateFocused,
  onEndDateChange,
  onEndDateFocus,
  onEndDateTab,
  onKeyDownArrowDown,
  onKeyDownQuestionMark,
  onClearDates,
  showClearDates,
  disabled,
  required,
  readOnly,
  showCaret,
  openDirection,
  showDefaultInputIcon,
  inputIconPosition,
  customInputIcon,
  customArrowIcon,
  customCloseIcon,
  isFocused,
  phrases,
  isRTL,
  noBorder,
  block,
  verticalSpacing,
  small,
  regular,
  styles,
}) {
  const calendarIcon = customInputIcon || (
    <CalendarIcon {...css(styles.DateRangePickerInput_calendarIcon_svg)} />
  );

  let arrowIcon = customArrowIcon || <RightArrow {...css(styles.DateRangePickerInput_arrow_svg)} />;
  if (isRTL) arrowIcon = <LeftArrow {...css(styles.DateRangePickerInput_arrow_svg)} />;
  if (small) arrowIcon = '-';

  const closeIcon = customCloseIcon || (
    <CloseButton
      {...css(
        styles.DateRangePickerInput_clearDates_svg,
        small && styles.DateRangePickerInput_clearDates_svg__small,
      )}
    />
  );
  const screenReaderText = screenReaderMessage || phrases.keyboardNavigationInstructions;
  const inputIcon = (showDefaultInputIcon || customInputIcon !== null) && (
    <button
      {...css(styles.DateRangePickerInput_calendarIcon)}
      type="button"
      disabled={disabled}
      aria-label={phrases.focusStartDate}
      onClick={onKeyDownArrowDown}
    >
      {calendarIcon}
    </button>
  );
  const startDateDisabled = disabled === START_DATE || disabled === true;
  const endDateDisabled = disabled === END_DATE || disabled === true;

  return (
    <div
      {...css(
        styles.DateRangePickerInput,
        disabled && styles.DateRangePickerInput__disabled,
        isRTL && styles.DateRangePickerInput__rtl,
        !noBorder && styles.DateRangePickerInput__withBorder,
        block && styles.DateRangePickerInput__block,
        showClearDates && styles.DateRangePickerInput__showClearDates,
        isFocused && styles.DateRangePickerInput__focused,
      )}
    >
      {inputIconPosition === ICON_BEFORE_POSITION && inputIcon}

      <DateInput
        id={startDateId}
        name={startDateName}
        placeholder={startDatePlaceholderText}
        displayValue={startDate}
        dateString={startDateString}
        screenReaderMessage={screenReaderText}
        focused={isStartDateFocused}
        isFocused={isFocused}
        disabled={startDateDisabled}
        required={required}
        readOnly={readOnly}
        showCaret={showCaret}
        openDirection={openDirection}
        onChange={onStartDateChange}
        onFocus={onStartDateFocus}
        onKeyDownShiftTab={onStartDateShiftTab}
        onKeyDownArrowDown={onKeyDownArrowDown}
        onKeyDownQuestionMark={onKeyDownQuestionMark}
        verticalSpacing={verticalSpacing}
        small={small}
        regular={regular}
        inputIndex={0}
      />

      {
        <div
          {...css(styles.DateRangePickerInput_arrow)}
          aria-hidden="true"
          role="presentation"
        >
          {arrowIcon}
        </div>
      }

      <DateInput
        id={endDateId}
        name={endDateName}
        placeholder={endDatePlaceholderText}
        displayValue={endDate}
        dateString={endDateString}
        screenReaderMessage={screenReaderText}
        focused={isEndDateFocused}
        isFocused={isFocused}
        disabled={endDateDisabled}
        required={required}
        readOnly={readOnly}
        showCaret={showCaret}
        openDirection={openDirection}
        onChange={onEndDateChange}
        onFocus={onEndDateFocus}
        onKeyDownTab={onEndDateTab}
        onKeyDownArrowDown={onKeyDownArrowDown}
        onKeyDownQuestionMark={onKeyDownQuestionMark}
        verticalSpacing={verticalSpacing}
        small={small}
        regular={regular}
        inputIndex={1}
      />

      {showClearDates && (
        <button
          type="button"
          aria-label={phrases.clearDates}
          {...css(
            styles.DateRangePickerInput_clearDates,
            small && styles.DateRangePickerInput_clearDates__small,
            !customCloseIcon && styles.DateRangePickerInput_clearDates_default,
            !(startDate || endDate) && !(startDateString || endDateString) && styles.DateRangePickerInput_clearDates__hide,
          )}
          onClick={onClearDates}
          disabled={disabled}
        >
          {closeIcon}
        </button>
      )}

      {inputIconPosition === ICON_AFTER_POSITION && inputIcon}

    </div>
  );
}

DateRangePickerInput.propTypes = propTypes;
DateRangePickerInput.defaultProps = defaultProps;

export default withStyles(({ reactDates: { color, sizing } }) => ({
  DateRangePickerInput: {
    backgroundColor: color.background,
    display: 'block',
    transition: 'border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out',
},

  DateRangePickerInput__disabled: {
    background: color.disabled,
  },

  DateRangePickerInput__withBorder: {
    border: `1px solid ${color.border}`,
    borderRadius: 0,
  },

  DateRangePickerInput__focused: {
    borderColor: '#80bdff',
    boxShadow: '0 0 0 0.2rem rgba(0, 123, 255, 0.25)',
  },

  DateRangePickerInput__rtl: {
    direction: 'rtl',
  },

  DateRangePickerInput__block: {
    display: 'block',
  },

  DateRangePickerInput__showClearDates: {
    paddingRight: 30,
  },

  DateRangePickerInput_arrow: {
    display: 'inline-block',
    verticalAlign: 'middle',
    color: color.text,
  },

  DateRangePickerInput_arrow_svg: {
    verticalAlign: 'middle',
    fill: color.text,
    height: sizing.arrowWidth,
    width: sizing.arrowWidth,
  },

  DateRangePickerInput_clearDates: {
    background: 'none',
    border: 0,
    color: 'inherit',
    font: 'inherit',
    lineHeight: 'normal',
    overflow: 'visible',

    cursor: 'pointer',
    padding: '2px 6px 6px',
    margin: '0 10px 0 5px',
    position: 'absolute',
    right: 0,
    top: '50%',
    transform: 'translateY(-50%)',
  },

  DateRangePickerInput_clearDates__small: {
    padding: 6,
  },

  DateRangePickerInput_clearDates_default: {
    ':focus': {
      background: color.core.border,
      borderRadius: '50%',
    },

    ':hover': {
      background: color.core.border,
      borderRadius: '50%',
    },
  },

  DateRangePickerInput_clearDates__hide: {
    visibility: 'hidden',
  },

  DateRangePickerInput_clearDates_svg: {
    fill: color.core.grayLight,
    height: 10,
    width: 13,
    verticalAlign: 'middle',
  },

  DateRangePickerInput_clearDates_svg__small: {
    height: 9,
  },

  DateRangePickerInput_calendarIcon: {
    background: 'none',
    border: 0,
    color: 'inherit',
    font: 'inherit',
    lineHeight: 'normal',
    overflow: 'visible',

    cursor: 'pointer',
    display: 'inline-block',
    verticalAlign: 'middle',
    padding: 6,
    margin: '0 5px 0 10px',
  },

  DateRangePickerInput_calendarIcon_svg: {
    fill: color.core.grayLight,
    height: 15,
    width: 14,
    verticalAlign: 'middle',
  },
}))(DateRangePickerInput);
