export function addToCart(items) {

  const {id, title, brand, price, thumbnail} = items;

  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/cart',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({id, title, brand, price, thumbnail})
    })

    const data = await response.json()
    console.log(data);
    resolve({ data })

  }

  );
}
