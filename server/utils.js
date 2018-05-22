const dbFields = [
  {
    key: 'name',
    required: true
  },
  {
    key: 'startDate',
    required: true
  },
  {
    key: 'department',
    required: true
  },
  {
    key: 'position',
    required: true
  },
  {
    key: 'location',
    required: true
  },
  {
    key: 'remoteLocation',
    required: false
  }
];

// a more robust version of this would have individual field validation. I figure truthy is okay for now
const _presentAndTruthy = (key, obj) => key in obj && !!obj[key];

const validFields = dbFields.map(field => field.key);

const requiredFields = dbFields
  .filter(field => field.required)
  .map(field => field.key);

const hasAllRequiredFields = body =>
  requiredFields.every(field => _presentAndTruthy(field, body));

const getMissingFields = body =>
  requiredFields.filter(field => !_presentAndTruthy(field, body));

// iterate over valid fields and create new obj with those found in request body
const getSanitizedBody = body =>
  validFields.reduce(
    (acc, field) =>
      _presentAndTruthy(field, body) ? { ...acc, [field]: body[field] } : acc,
    {}
  );

module.exports = {
  requiredFields,
  hasAllRequiredFields,
  getSanitizedBody,
  getMissingFields
};
