import fetch from 'node-fetch';

export const getEmployees = () => {
  return fetch('/api/employees')
    .then(res => res.json())
    .catch(err => {
      console.log(err);
      return [];
    });
};

export const addEmployee = employee => {
  return fetch('/api/employees', {
    method: 'POST',
    body: JSON.stringify(employee),
    headers: { 'Content-Type': 'application/json' }
  })
    .then(res => res.json())
    .catch(err => {
      console.log(err);
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
