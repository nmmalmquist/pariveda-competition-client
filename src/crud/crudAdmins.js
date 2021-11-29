const GetAdmin = async (email) => {
    const AdminApiUrl = `https://localhost:5001/api/admin/${email}`;
    const response = await fetch(AdminApiUrl);
    const data = await response.json();
    return data;
  };
const GetAllAdmins = async () => {
    const AdminApiUrl = `https://localhost:5001/api/admin`;
    const response = await fetch(AdminApiUrl);
    const data = await response.json();
    return data;
  };
  const PostAdmin = async (firstName, lastName, email, password) => {
    const AdminApiUrl = `https://localhost:5001/api/admin`;
    const response = await fetch(AdminApiUrl,
      {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
        })
      })
      
        return response;
  };

  const DeleteAdmin = async (id) => {
    const AdminApiUrl = `https://localhost:5001/api/admin/${id}`;
    const response = await fetch(AdminApiUrl, {
      method: "DELETE"
    });
    return response;
  };

  export {GetAdmin, GetAllAdmins, PostAdmin, DeleteAdmin}