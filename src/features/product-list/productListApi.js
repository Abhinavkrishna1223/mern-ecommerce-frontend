import axios from "axios";

export function fetchAllProduct() {
  return axios.get('  http://localhost:8080/products');
}

export function fetchProductById(id) {
  return new Promise(async(resolve) => {
    const response = await fetch(`http://localhost:8080/products/${id}`)
    const data = await response.json();
    
    console.log(data.images, 'Id data')

    resolve({data})
  })
}


//Filtering in Product List //
export function fetchProductsByFilter({filter, sort, pagination}) {

  // pagination = {_page:1, _limit=10 }

  //TODO: on server have to make multi-value data rendering //


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

  return new Promise(async(resolve) => {
    const response = await fetch('http://localhost:8080/products?'+ queryString)
    const data = await response.json();
    const totalItems = response.headers.get('X-Total-Count')

    resolve({data:{products:data, totalItems:+totalItems}})
  })
}

export function fetchAllCategories() {

  return new Promise(async(resolve) => {
    const response = await fetch(`http://localhost:8080/categories`)
    const data = await response.json();
    console.log(data, 'Categories')
    resolve({data})
  })
}

export function fetchAllBrands() {
  return new Promise(async(resolve) => {
    const response = await fetch('http://localhost:8080/brands')
    const data = await response.json();

    console.log(data, 'Brands')

    resolve({data})
  })
}
