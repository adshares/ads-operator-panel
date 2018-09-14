export function breakpointReducer(
  state = { name: 'default', size: 0 },
  action,
) {
  switch (action.type) {
    case 'SET_ACTIVE_BREAKPOINT': {
      return { name: action.breakpointName, size: action.breakpointSize };
    }
    default: {
      return state;
    }
  }
}
export default breakpointReducer;
