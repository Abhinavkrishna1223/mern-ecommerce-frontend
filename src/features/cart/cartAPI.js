export function fetchCartItems() {

  return new Promise(async (resolve) => {
    const response = await fetch(' http://localhost:8080/cart',{
      method:'GET',
      headers:{'Content-Type':'application/json'},
    })

    const data = await response.json()
    resolve({ data })

  }

  );
}




export function addToCart(items) {

  const {id, title, brand, price, thumbnail, quantity=1} = items;

  return new Promise(async (resolve) => {
    const response = await fetch(' http://localhost:8080/cart',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify({id, title, brand, price, thumbnail, quantity})
    })

    const data = await response.json()
    resolve({ data })

  }

  );
}

export function updateTheCart(item) {

  return new Promise(async (resolve) => {
    const response = await fetch(' http://localhost:8080/cart/'+ item.id ,{
      method:'PATCH',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(item)
    })

    const data = await response.json()
    resolve({ data })

  }

  );
}

export function deletCartItem(itemId) {

  return new Promise(async (resolve) => {
    const response = await fetch(' http://localhost:8080/cart/'+ itemId ,{
      method:'DELETE',
      headers:{'Content-Type':'application/json'},
    })

    const data = await response.json()
    console.log(data);
    resolve({ data: { id: itemId } });

  }

  );
}

