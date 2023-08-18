export function fetchCartItemsByUserId(id) {

  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/cart?user=${id}`)

    const data = await response.json()
    resolve({ data })

  }

  );
}


export function addToCart(items) {

 
  return new Promise(async (resolve) => {
    const response = await fetch(' http://localhost:8080/cart',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(items)
    })

    const data = await response.json()
    resolve({ data })

  }

  );
}

export function updateTheCart(item) {

  return new Promise(async (resolve) => {

    const response = await fetch(`http://localhost:8080/cart/${item.id}` ,{
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

export function resetCart() {

  return new Promise(async (resolve) => {
    const response = await fetchCartItemsByUserId()

    const items = await response.data ;

    for(let item of items){
      await deletCartItem(item.id)
    }

    resolve({status:"successfully deleted"})

  }

  );
}
