const PostPurchase = async (firstName, lastName, email, phone, cost) => {
    const PurchaseApiUrl = `https://localhost:5001/api/purchase`;
    const response = await fetch(PurchaseApiUrl,
      {
        method: "POST",
        headers: {
            "Accept": 'application/json',
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            customerFirstName: firstName,
            customerLastName: lastName,
            customerEmail: email,
            customerPhoneNumber: phone,
            cost: cost
        })
      })
      
        return response;
  };
  
  export {PostPurchase };