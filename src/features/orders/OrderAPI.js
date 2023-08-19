
export function getOrder() {
  return new Promise(async (resolve) => {
    const response = await fetch(' http://localhost:8080/order')
    const data = await response.json()
    resolve({ data })
  }

  );
}


export function createOrder(orderItem) {
  return new Promise(async (resolve) => {
    const response = await fetch(' http://localhost:8080/order',{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify(orderItem)
    })
    const data = await response.json()
    resolve({ data })
  }

  );
}
