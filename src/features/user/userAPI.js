
export function fetchLoggedUser() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/user')
    const data = await response.json()
    resolve({ data })
  }

  );
}


export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/orders') 
    const data = await response.json()
    resolve({data})
  }
  );
}