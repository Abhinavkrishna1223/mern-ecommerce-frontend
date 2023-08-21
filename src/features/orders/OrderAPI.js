
export function getOrder() {
  return new Promise(async (resolve) => {
    const response = await fetch(' http://localhost:8080/order',{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem('token')}`
      }
    })
    const data = await response.json()
    resolve({ data })
  }

  );
}


export function createOrder(orderItem) {
  return new Promise(async (resolve) => {
    const response = await fetch(' http://localhost:8080/order',{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization":`Bearer ${localStorage.getItem('token')}`
    },
      body:JSON.stringify(orderItem)
    })
    const data = await response.json()
    resolve({ data })
  }

  );
}
