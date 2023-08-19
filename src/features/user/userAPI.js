
export function fetchLoggedUser() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/users/own')
    const data = await response.json()
    resolve({ data })
  }

  );
}


export function fetchLoggedInUserOrders() {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/orders/own') 
    const data = await response.json()
    resolve({data})
  }
  );
}

//Update User //

export function updateUser(updatedUser) {
  return new Promise(async (resolve) => {
    const response = await fetch(`http://localhost:8080/users/${updatedUser.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser)
    })

    const data = await response.json();
    console.log(data);
    resolve({ data })

  }

  );
}