import { LOCATIONS, EMPLOYEE_ACTIONS } from './constants';

// this is a bit reduxy and probably too obtuse but I like relying on a constants file
export const mapLocationNumToName = locationNum => {
  switch (parseInt(locationNum, 10)) {
    case LOCATIONS.NYC.value:
      return LOCATIONS.NYC.label;
    case LOCATIONS.BEIRUT.value:
      return LOCATIONS.BEIRUT.label;
    case LOCATIONS.REMOTE.value:
      return LOCATIONS.REMOTE.label;
    default:
      return null;
  }
};

export const getEmployeeLocationString = employee =>
  employee.location === LOCATIONS.REMOTE.value
    ? `Remote (${employee.remoteLocation})`
    : mapLocationNumToName(employee.location);

export const mapEmployeeActionNameToNum = actionName => {
  switch (actionName.toLowerCase()) {
    case 'add':
      return EMPLOYEE_ACTIONS.ADD;
    case 'edit':
      return EMPLOYEE_ACTIONS.EDIT;
    case 'remove':
      return EMPLOYEE_ACTIONS.REMOVE;
    default:
      return null;
  }
};
