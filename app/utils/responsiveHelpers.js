/**
 * Returns a boolean indicating whether or not the currentBreakpointSize value
 * is greater than the passed breakpointToCompare value
 * @param {Object} breakpointToCompare           String or number, if string, it is used to retrieve
 *                                               the correct value from breakpoints[]
 * @param {number} currentBreakpointSize         Number indicating the current breakpoint value
 *                                               (usually breakpoint.size)
 * @return {boolean}                             Returns boolean that indicates whether the passed
 *                                               breakpointToCompare string or number is currently
 *                                               greater than the currentBreakpointSize
 */

import { breakpoints } from './breakpoints';

export const breakpointIsGreaterThan = (
  breakpointToCompare,
  currentBreakpointSize,
) => {
  const comparison =
    typeof breakpointToCompare === 'string'
      ? breakpointFromString(breakpointToCompare)
      : breakpointToCompare;

  if (
    currentBreakpointSize === null ||
    currentBreakpointSize > comparison(breakpointToCompare)
  ) {
    return true;
  }
  return false;
};

export const breakpointIsLessThan = (
  breakpointToCompare,
  currentBreakpointSize,
) => {
  if (
    currentBreakpointSize !== null &&
    currentBreakpointSize <= comparison(breakpointToCompare)
  ) {
    return true;
  }
  return false;
};

export const breakpointIsMobile = currentBreakpointSize =>
  currentBreakpointSize !== null &&
  currentBreakpointSize <= breakpoints.tabletLg;

const comparison = breakpointToCompare =>
  typeof breakpointToCompare === 'string'
    ? breakpointFromString(breakpointToCompare)
    : breakpointToCompare;

const breakpointFromString = string => {
  const breakpoint = breakpoints[string];

  if (!breakpoint) {
    throw new Error(`Bad breakpoint variable given: ${string}`);
  }
  return breakpoint;
};
