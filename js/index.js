var mealsArr = []
var mealDetails ={}
var areaArr = []
var ingredientsArr = []
var categoriesArr = []
var searchResultArr =[]
///////////////////// get all meals function ////////////////

async function getAllMeals() {
    var response= await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    var data = await response.json()
    mealsArr = data.meals
    console.log(data);
    console.log(mealsArr);

    displayMeals()
}

getAllMeals()

////////////////// start display meals //////////////

function displayMeals() {
    var displayData = "";
    for(var i=0; i<mealsArr.length; i++) {

        displayData += `
         <div class="col-lg-3 col-sm-12 mb-3 " onclick="fullMealDetailsById(${mealsArr[i].idMeal})">
                    <div class="inner ">
                        <div class="box position-relative">
                            <img src="${mealsArr[i].strMealThumb}" alt="" class="w-100">
                        <div class="layer position-absolute d-flex flex-column justify-content-center align-items-start">
                            <p class="fs-2 fw-semibold p-4">${mealsArr[i].strMeal}</p>
                        </div>
                        </div>
                    </div>
                </div>
                `
    }
    document.getElementById("mealCard").innerHTML = displayData;
}


//////////////////End display meals //////////////

////////////////// start display meal Details //////////////


async function fullMealDetailsById(id) {
    console.log("details");
    $('#mealDetails').removeClass('d-none')
    $('#allMeals').addClass('d-none')
    $('#mealSearch').addClass('d-none')
    
    var response= await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    var data =await response.json()
    console.log(data);
    mealDetails = data.meals[0]
    displayMealDetails()
    
}

function displayMealDetails() {
    var displayData = "";
    displayData += `
     <div class="row">
               <div class="col-lg-4">
                    <img src="${mealDetails.strMealThumb}" alt="" class="w-100">     
                    <h3>${mealDetails.strMeal}</h3>
               </div>

               <div class="col-lg-8">
                <h2>Instructions</h2>
                <p>${mealDetails.strInstructions}    </p>
                <h2>Area : ${mealDetails.strArea} </h2>
                <h2>Category : ${mealDetails.strCategory}</h2>
                <h2>Recipes :</h2>
                <div class="Recipes ">
                    <span class="rounded rounded-2 ">300ml Sushi Rice</span>
                    <span class="rounded rounded-2">100ml Rice wine</span>
                    <span class="rounded rounded-2">2 tbs Caster Sugar</span>
                    <span class="rounded rounded-2">3 tbs Mayonnaise</span>
                    <span class="rounded rounded-2">1 tbs Rice wine</span>
                    <span class="rounded rounded-2">1 tbs Soy Sauce</span>
                    <span class="rounded rounded-2 ">1 Cucumber</span>
                </div>

                <h2>Tage :</h2>
                <div class="tags d-flex gap-3">
                    <div class="link-1 p-2 rounded rounded-2 text-center"><a href="${mealDetails.strSource}" target="_blank">Source</a></div>
                    <div class="link-2 p-2 rounded rounded-2 text-center"><a href="${mealDetails.strYoutube}" target="_blank" >Youtube</a></div>
                </div>
               </div>
                
            </div>`

            document.getElementById("mealDetails").innerHTML = displayData;

}

////////////////// end display meal Details //////////////


function openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  /* Set the width of the side navigation to 0 */
  function closeNav() {
    document.getElementById("mySidenav").style.width = "0";}


/////////////// start Click on Search Link /////////////////////////////

function showSearchPage() {
    $('#mealSearch').removeClass('d-none')
    $('#allMeals , #mealDetails ,#mealCategories ,#maelArea ,#maelIngredients,#mealContact').addClass('d-none')
}

async function searchMealByName(value){
    console.log(value)
    var response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`)
    var data = await response.json()
    searchResultArr = data.meals
    console.log(data);
    this.displaySearchResult()
}
async function searchMealByFirstLetter(value){
    console.log(value)
    var response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`)
    var data = await response.json()
    searchResultArr = data.meals
    console.log(data);
    this.displaySearchResult()
}


function displaySearchResult() {
    var displayData = "";
    for(var i=0; i<searchResultArr.length; i++) {

        displayData += `
         <div class="col-lg-3 col-sm-12 mb-3 " onclick="fullMealDetailsById(${searchResultArr[i].idMeal})">
                    <div class="inner ">
                        <div class="box position-relative">
                            <img src="${searchResultArr[i].strMealThumb}" alt="" class="w-100">
                        <div class="layer position-absolute d-flex flex-column justify-content-center align-items-start">
                            <p class="fs-2 fw-semibold p-4">${searchResultArr[i].strMeal}</p>
                        </div>
                        </div>
                    </div>
                </div>
                `
    }
    document.getElementById("searchResult").innerHTML = displayData;
}
/////////////// end Click on Search Link /////////////////////////////


/////////////// start Click on Categories Link /////////////////////////////

async function showCategoriesPage() {
    $('#mealCategories').removeClass('d-none')
    $('#allMeals , #mealDetails ,#mealSearch,maelArea ,#maelIngredients,#mealContact').addClass('d-none')

    var response= await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    var data =await response.json()
    console.log(data);
    categoriesArr = data.categories

    displayCategories()
}

function displayCategories() {
    var displayCategories = ""
    for(var i=0; i<categoriesArr.length; i++) {
        displayCategories +=`
        <div class="col-lg-3 col-sm-12 mb-3 " onclick="filterMealsByCategories('${categoriesArr[i].strCategory}')">
            <div class="inner ">
                <div class="box position-relative">
                    <img src="${categoriesArr[i].strCategoryThumb}" alt="" class="w-100 rounded rounded-2">
                <div class="layer position-absolute d-flex flex-column justify-content-center align-items-center rounded rounded-2 ">
                    <h3 class="pt-3 fw-bold">${categoriesArr[i].strCategory}</h3>
                    <p class="pcategories fw-semibold p-4 text-center"> ${categoriesArr[i].strCategoryDescription}</p>
                </div>
                </div>
            </div>
        </div>`
    }
    console.log(displayCategories)
    document.getElementById("categoriesRow").innerHTML = displayCategories;
}
 
async function filterMealsByCategories(CategoriesName) {
    var response= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${CategoriesName}`)
var data =await response.json()
console.log(data);

mealsArr = data.meals
console.log(mealsArr)
$('#allMeals').removeClass('d-none')
$('#maelArea , #mealDetails ,#mealCategories ,#mealSearch ,#maelIngredients,#mealContact').addClass('d-none')
displayMeals()
}
/////////////// end Click on Categories Link /////////////////////////////


/////////////// start Click on Area Link /////////////////////////////
 async function showAreaPage() {
    $('#maelArea').removeClass('d-none')
    $('#allMeals , #mealDetails ,#mealCategories ,#mealSearch ,#maelIngredients,#mealContact').addClass('d-none')
    var response= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    var data =await response.json()
    console.log(data);
    areaArr = data.meals
    
    displayArea()
}
function displayArea() {
    var displayArea ="" 
   
    
    for(var i=0; i<areaArr.length; i++) {
        displayArea += `
           <div class="col-lg-3 col-sm-12 mb-3  " onclick="filterMealsByArea('${areaArr[i].strArea}')">
            <div class="inner ">
                <div class="box text-white d-flex flex-column justify-content-center align-items-center ">
                 <i class="fa-solid fa-house-laptop "></i>
                 <h3>${areaArr[i].strArea}</h3>
                </div>
            </div>
        </div>`
    
}

document.getElementById("areaRow").innerHTML = displayArea ;
}

async function filterMealsByArea(areaName) {
    console.log(areaName)
    var response= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${areaName}`)
    var data =await response.json()
    mealsArr = data.meals
    console.log(mealsArr)
    $('#allMeals').removeClass('d-none')
    $('#maelArea , #mealDetails ,#mealCategories ,#mealSearch ,#maelIngredients,#mealContact').addClass('d-none')
    displayMeals()
}

/////////////// end Click on Area Link /////////////////////////////



/////////////// start Click on Ingredient Link /////////////////////////////

async function showIngredientsPage() {
    $('#maelIngredients').removeClass('d-none')
    $('#allMeals , #mealDetails ,#mealCategories ,#maelArea ,#mealSearch,#mealContact').addClass('d-none')


    var response= await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    var data =await response.json()
    console.log(data);
    ingredientsArr = data.meals

    displayIngredients()
}


function displayIngredients() {
    var displayIngredients ="" 
   
    for(var i=0; i<ingredientsArr.length; i++) {
        displayIngredients += `
        <div class="col-lg-3 col-sm-12 mb-3 " onclick="filterMealsByingredient('${ ingredientsArr[i].strArea}')">
            <div class="inner ">
                <div class="box text-white d-flex flex-column justify-content-center align-items-center ">
                    <i class="fa-solid fa-drumstick-bite"></i>
                 <h3 >${ ingredientsArr[i].strIngredient}</h3>
                 <p class="text-center">The chicken is a type of domesticated fowl, a subspecies of the red junglefowl (Gallus gallus). It is one of ${ ingredientsArr[i].strDescription}</p>
                </div>
            </div>
        </div>`
    
}
document.getElementById("ingredienRow").innerHTML = displayIngredients ;
}

async function filterMealsByingredient(ingredientName) {
    console.log(ingredientName)
    var response= await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=chicken_breast${ingredientName}`)
    var data =await response.json()
    ingredientsArr = data.meals
    console.log(mealsArr)
    $('#allMeals').removeClass('d-none')
    $('#maelArea , #mealDetails ,#mealCategories ,#mealSearch ,#maelIngredients,#mealContact').addClass('d-none')
    displayMeals()
}
/////////////// end Click on Ingredient Link /////////////////////////////


/////////////// start Click on Contact Link /////////////////////////////

function showContactPage() {
    $('#mealContact').removeClass('d-none')
    $('#allMeals , #mealDetails ,#mealCategories ,#maelArea ,#maelIngredients,#mealSearch').addClass('d-none')
}

document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
  
    const namePattern = /^[a-zA-Z\s]{3,}$/;
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phonePattern = /^\d{10}$/;
    const agePattern = /^[1-9][0-9]?$/;
    const passwordPattern = /^(?=.[A-Za-z])(?=.\d)[A-Za-z\d]{8,}$/;
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const age = document.getElementById('age').value;
    const password = document.getElementById('password').value;
    const repassword = document.getElementById('repassword').value;
  
    document.getElementById('nameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('phoneError').textContent = '';
    document.getElementById('ageError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('repasswordError').textContent = '';
  
    let isValid = true;
  
    if (!namePattern.test(name)) {
      document.getElementById('nameError').textContent = 'Name should contain at least 3 letters.';
      isValid = false;
    }
  
    if (!emailPattern.test(email)) {
      document.getElementById('emailError').textContent = 'Enter a valid email address.';
      isValid = false;
    }
  
    if (!phonePattern.test(phone)) {
      document.getElementById('phoneError').textContent = 'Phone number must be 10 digits.';
      isValid = false;
    }
  
    if (!agePattern.test(age)) {
      document.getElementById('ageError').textContent = 'Age should be a number between 1 and 99.';
      isValid = false;
    }
  
    if (!passwordPattern.test(password)) {
      document.getElementById('passwordError').textContent = 'Password must be at least 8 characters, including 1 letter and 1 number.';
      isValid = false;
    }
  
    if (password !== repassword) {
      document.getElementById('repasswordError').textContent = 'Passwords do not match.';
      isValid = false;
    }
  
    if (isValid) {
      alert("Form submitted successfully!");
  }
  });
  /////////////// end Click on Contact Link /////////////////////////////


//////////////////////// loading screen ////////////////////////////////
window.onload = function() {
    document.getElementById("loading-screen").style.display = "none";
     
    document.getElementById("content").style.display = "block";
};
