
export function fetchLoggedUser(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch('http://localhost:8080/user/'+userId)
    const data = await response.json()
    resolve({ data })
  }

  );
}
