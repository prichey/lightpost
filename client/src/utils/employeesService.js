import fetch from 'node-fetch';

export const getEmployees = async () => {
  try {
    const employees = await fetch('/api/employees').then(res => res.json());

    return employees;
  } catch (err) {
    console.log(err);

    return [];
  }
};

export const addEmployee = employee => {
  return fetch('/api/employees', {
    method: 'POST',
    body: JSON.stringify(employee),
    headers: { 'Content-Type': 'application/json' }
  }).then(res => {
    if (res.ok) return res.json();

    // I'm not totally happy with this but I'm getting diminishing returns with playing around with it
    // I should probably just return a standard response from the server which always contains an errors array
    // If there are no errors, we handle success. if so, deal with them
    throw new Error(res.statusText);
  });
};

// export const addEmployee = async employee => {
//   try {
//     console.log('adding employee', employee);
//     return fetch('/api/employees', {
//       method: 'POST',
//       body: JSON.stringify(employee),
//       headers: { 'Content-Type': 'application/json' }
//     }).then(res => res.json());
//     return addResponse;
//   } catch (err) {
//     console.log(err);
//
//     return [];
//   }
// };
