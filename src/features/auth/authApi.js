
export function createUser(userData) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/users',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body: JSON.stringify(userData)
    })

    if(response){
      window.alert('user registered succesfully');
    }

    const data = await response.json()
    console.log(data);
    resolve({ data })

  }

  );
}


export function loginUser(loginInfo) {
  return new Promise(async (resolve, reject) => {

    const email = loginInfo.email;
    const password = loginInfo.password ;

    const response = await fetch('http://localhost:8080/users?email='+ email)

    const data = await response.json() 
   
    if(data.length){
      if(password===data[0].password){
        resolve({ data:data[0] })
        console.log({data});
      }
      else{
        reject({message:'wrong credentials'});
      }
     
    }
    else{
      reject({message:"User not found"});
    }
  }
  );
}
