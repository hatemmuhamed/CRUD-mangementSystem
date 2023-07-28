var nameProduct= document.getElementById('nameProduct');
var priceProduct= document.getElementById('priceProduct');
var nameCategory= document.getElementById('nameCategory');
var desc= document.getElementById('desc');
var addBtn=document.getElementById('addBtn');
var alertName = document.getElementById('alertName');
var alertPrice = document.getElementById('alertPrice');
var alertCategory = document.getElementById('alertCategory');
var updatedIndex= 0;



/// array of products 
var productsContainer = [];


/// local storage
if(localStorage.getItem("Products") != null){
    productsContainer = JSON.parse(localStorage.getItem("Products"));
    displayProduct(productsContainer);
}



//add product
function addProduct()
{
    var errorMsg = validateForm();
    if(errorMsg == true){
        if(addBtn.innerHTML==='Add Product'){
            var product={
                name:nameProduct.value,
                price:priceProduct.value,
                category:nameCategory.value,
                desc:desc.value
            }
            productsContainer.push(product);
            localStorage.setItem("Products" , JSON.stringify(productsContainer));
            displayProduct();
            clearData();
        }
        else{
            updateProduct();
        }
}
else{
    alert(errorMsg);
}

}


/// clear data
function clearData(){
    nameProduct.value="";
    priceProduct.value="";
    nameCategory.value="";
    desc.value="";
}



//// show data in table
function displayProduct(){
    var cartoon=``;

    for(var i=0;i<productsContainer.length;i++){
        cartoon+= `<tr>
        <td>${i}</td>
        <td>${productsContainer[i].name}</td>
        <td>${productsContainer[i].price}</td>
        <td>${productsContainer[i].category}</td>
        <td>${productsContainer[i].desc}</td>
        <td><button onclick="getValue(${i})" class="btn btn-outline-info btn-sm">Update</button></td>
        <td><button onclick="deleteProduct(${i});" class="btn btn-outline-danger btn-sm">Delete</button></td>
        </tr>`
    }
    document.getElementById('tableBody').innerHTML = cartoon;
}

// delete product

function deleteProduct(index){
    productsContainer.splice(index,1);
    localStorage.setItem("Products" , JSON.stringify(productsContainer));
    displayProduct(productsContainer);
}


// get data value 
function getValue(index){
    updatedIndex=index;
    nameProduct.value=productsContainer[index].name
    priceProduct.value=productsContainer[index].price
    nameCategory.value=productsContainer[index].category
    desc.value=productsContainer[index].desc
    addBtn.innerHTML='Update'
} 


//// update product
function updateProduct(){
    var updatedProduct={
        name:nameProduct.value,
        price:priceProduct.value,
        category:nameCategory.value,
        desc:desc.value
    }
    productsContainer.splice(updatedIndex,1,updatedProduct)
    displayProduct();
    clearData();
    localStorage.setItem("Products" , JSON.stringify(productsContainer));
    addBtn.innerHTML='Add product'
}


/// search name products 
function searchProduct(){
    var term= document.getElementById('btnSearch').value;
    var cartona=``;
    for(var i = 0 ; i < productsContainer.length ; i++){
        if(productsContainer[i].name.toLowerCase().includes(term.toLowerCase())==true){
            cartona+=`<tr>
            <td>${i}</td>
            <td>${productsContainer[i].name.replace(term, `<span class="bg-info text-center">${term}</span>`)}</td>
            <td>${productsContainer[i].price}</td>
            <td>${productsContainer[i].category}</td>
            <td>${productsContainer[i].desc}</td>
            <td><button onclick="getValue(${i})" class="btn btn-outline-info btn-sm">Update</button></td>
            <td><button onclick="deleteProduct(${i});" class="btn btn-outline-danger btn-sm">Delete</button></td>
            </tr>`
        }
    }
    document.getElementById('tableBody').innerHTML=cartona;
}

///// search category products
function searchCategory(){
    var term= document.getElementById('btnCategory').value;
    var cartona=``;
    for(var i = 0 ; i < productsContainer.length ; i++){
        if(productsContainer[i].category.toLowerCase().includes(term.toLowerCase())==true){
            cartona+=`<tr>
            <td>${i}</td>
            <td>${productsContainer[i].name}</td>
            <td>${productsContainer[i].price}</td>
            <td>${productsContainer[i].category.replace(term, `<span class="bg-info text-center">${term}</span>`)}</td>
            <td>${productsContainer[i].desc}</td>
            <td><button onclick="getValue(${i})" class="btn btn-outline-info btn-sm">Update</button></td>
            <td><button onclick="deleteProduct(${i});" class="btn btn-outline-danger btn-sm">Delete</button></td>
            </tr>`
        }
    }
    document.getElementById('tableBody').innerHTML=cartona;
}

// return error msg when input dont validate

function validateForm(){
    var regexName =/^[A-Z][a-z]{3,8}$/;
    var regexPrice =/^[1-7][0-9]$/;
    var regexCategory =/^[a-z]{4,9}$/i;

    if(regexName.test(nameProduct.value) == false)
    {   
        return 'name must be first letter capital and 4 character '
    }
    else if(regexPrice.test(priceProduct.value) == false){
        return 'price must be start 10 to 79';
    }
    else if(regexCategory.test(nameCategory.value) == false)
    {
        return 'category must be from 4 letter to 9';
    }

    return true;
}

nameProduct.addEventListener('blur', function(errorName){
    var regexName =/^[A-Z][a-z]{3,8}$/;
    if(regexName.test(nameProduct.value)==true){
        nameProduct.classList.add('is-valid')
        nameProduct.classList.remove('is-invalid')
        alertName.classList.replace('d-block' , 'd-none')
        return true
    }else{
        nameProduct.classList.add('is-invalid')
        nameProduct.classList.remove('is-valid')
        alertName.classList.replace('d-none' , 'd-block')
        return false
    }
})

priceProduct.addEventListener('blur', function(){
    var regexPrice =/^[1-7][0-9]$/;
    if(regexPrice.test(priceProduct.value)==true){
        priceProduct.classList.add('is-valid')
        priceProduct.classList.remove('is-invalid')
        alertPrice.classList.replace('d-block' , 'd-none')
        return true
    }else{
        priceProduct.classList.add('is-invalid')
        priceProduct.classList.remove('is-valid')
        alertPrice.classList.replace('d-none' , 'd-block')
        return false
    }
})


nameCategory.addEventListener('blur', function(){
    var regexCategory =/^[a-z]{4,9}$/i;
    if(regexCategory.test(nameCategory.value)==true){
        nameCategory.classList.add('is-valid')
        nameCategory.classList.remove('is-invalid')
        alertCategory.classList.replace('d-block' , 'd-none')
        return true
    }else{
        nameCategory.classList.add('is-invalid')
        nameCategory.classList.remove('is-valid')
        alertCategory.classList.replace('d-none' , 'd-block')
        return false
    }
})

