
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    })


    const data = await response.json()
    resolve({ data })

  }

  );
}


export function getUser() {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/user')
    const data = await response.json()
    resolve({ data })
    console.log(data, 'data of users');
  }

  );
}



export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {

    const email = loginInfo.email;
    const password = loginInfo.password;

    const response = await fetch('http://localhost:8080/user?email=' + email)

    const data = await response.json()

    if (data.length) {
      if (password === data[0].password) {
        resolve({ data: data[0] });
        console.log({ data: data[0] });
      }
      else {
        reject({ message: 'wrong credentials' });
      }

    }
    else {
      reject({ message: "User not found" });
    }
  }
  );
}

//Update User //

export function updateUser(updatedUser) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/user/' + 1, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedUser)
    })

    const data = await response.json()
    console.log(data);
    resolve({ data })

  }

  );
}
