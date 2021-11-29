const GetDogsForBuy = async () => {
  const buyDogsApiUrl = "https://localhost:5001/api/dog/buy";
  const response = await fetch(buyDogsApiUrl);
  const data = await response.json();
  return data;
};
const GetDogsForRent = async () => {
  const rentDogsApiUrl = "https://localhost:5001/api/dog/rent";
  const response = await fetch(rentDogsApiUrl);
  const data = await response.json();
  return data;
};
const GetAllDogs = async () => {
  const allDogsApiUrl = "https://localhost:5001/api/dog/all";
  const response = await fetch(allDogsApiUrl);
  const data = await response.json();
  return data;
};
const GetDog = async (id) => {
  const DogApiUrl = `https://localhost:5001/api/dog/all/${id}`;
  const response = await fetch(DogApiUrl);
  const data = await response.json();
  return data;
};
const GetMostRecentDog = async (id) => {
  const DogApiUrl = `https://localhost:5001/api/dog/all/get/recent`;
  const response = await fetch(DogApiUrl);
  const data = await response.json();
  return data;
};
const DeleteDog = async (id) => {
  const DogApiUrl = `https://localhost:5001/api/dog/${id}`;
  const response = await fetch(DogApiUrl, {
    method: "DELETE"
  });
  return response;
};

const PostDog = async (breed, age, cost, name, description, saleType) => {
  const DogApiUrl = `https://localhost:5001/api/dog`;
  const response = await fetch(DogApiUrl,
    {
      method: "POST",
      headers: {
          "Accept": 'application/json',
          "Content-Type": 'application/json'
      },
      body: JSON.stringify({
          breed: breed,
          age: age,
          name: name,
          description: description,
          cost: cost,
          saleType: saleType
      })
    })
    
      return response;
};



export { GetAllDogs, GetDogsForBuy, GetDogsForRent, GetDog, DeleteDog, PostDog,GetMostRecentDog }; //, PostDog, PutDog, DeleteDog}
