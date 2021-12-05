const GetCustomer = async (email) => {
  const CustomerApiUrl = `https://pariveda-competition-api.herokuapp.com/api/customer/${email}`;
  const response = await fetch(CustomerApiUrl);
  const data = await response.json();
  return data;
};
const GetAllCustomers = async () => {
  const CustomerApiUrl = `https://pariveda-competition-api.herokuapp.com/api/customer`;
  const response = await fetch(CustomerApiUrl);
  const data = await response.json();
  return data;
};
const PostCustomer = async (
  firstName,
  lastName,
  birthdate,
  email,
  password
) => {
  const CustomerApiUrl = `https://pariveda-competition-api.herokuapp.com/api/customer`;
  const response = await fetch(CustomerApiUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
      birthdate: birthdate,
    }),
  });

  return response;
};

const DeleteCustomer = async (id) => {
  const CustomerApiUrl = `https://pariveda-competition-api.herokuapp.com/api/customer/${id}`;
  const response = await fetch(CustomerApiUrl, {
    method: "DELETE",
  });
  return response;
};

export { GetCustomer, GetAllCustomers, PostCustomer, DeleteCustomer };
