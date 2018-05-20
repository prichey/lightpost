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
