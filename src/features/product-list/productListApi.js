
export function fetchProductById(id) {
  return new Promise(async(resolve) => {
    const response = await fetch(`http://localhost:8080/products/${id}`,{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem('token')}`
      }
    })
    const data = await response.json();
    
    console.log(data.images, 'Id data')

    resolve({data})
  })
}


//Filtering in Product List //
export function fetchProductsByFilter({filter, sort, pagination, searchtitle}) {

  let queryString = '';
  
  for(let key in filter){
    const categoryValues = filter[key];
    if(categoryValues.length>0){
      const lastCategoryValue = categoryValues[categoryValues.length-1]
      queryString +=`${key}=${lastCategoryValue}&`
    }
   
  }

  for (let key in sort){
    queryString +=`${key}=${sort[key]}&`
  }

  for (let key in pagination){
    queryString +=`${key}=${pagination[key]}&`
  }

  for (let key in searchtitle){
    queryString +=`${key}=${searchtitle[key]}&`
  }

  return new Promise(async(resolve) => {
    console.log('http://localhost:8080/products?'+ queryString,"<<<<<<<<<<<<<<<")
    const response = await fetch('http://localhost:8080/products?'+ queryString,{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem('token')}`
      }
    })
    const data = await response?.json();
    const totalItems = response.headers.get('X-Total-Count')

    resolve({data:{products:data, totalItems:+totalItems}})
  })
}

export function fetchAllCategories() {

  return new Promise(async(resolve) => {
    const response = await fetch(`http://localhost:8080/categories`,{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem('token')}`
      }
    })
    const data = await response.json();
    console.log(data, 'Categories')
    resolve({data})
  })
}

export function fetchAllBrands() {
  return new Promise(async(resolve) => {
    const response = await fetch('http://localhost:8080/brands',{
      headers:{
        "Authorization":`Bearer ${localStorage.getItem('token')}`
      }
    })
    const data = await response.json();
    resolve({data})
  })
}
