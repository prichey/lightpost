// normally I'd have this location mapping in a separate file (especially since it would need to be shared between the server and client)
export const mapLocationNumToName = locationNum => {
  switch (parseInt(locationNum, 10)) {
    case 0:
      return 'New York';
    case 1:
      return 'Beirut';
    case 2:
      return 'Remote';
    default:
      return null;
  }
};

export const getEmployeeLocationString = employee =>
  employee.location === '2'
    ? `Remote (${employee.remoteLocation})`
    : mapLocationNumToName(employee.location);
