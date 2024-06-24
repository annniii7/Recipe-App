const searchbox = document.querySelector('.searchbox');
const btn = document.querySelector('.btn');
const recipecontainer = document.querySelector('.Recipe-container');

const recipeDetailsContent=document.querySelector('.recipe-details-content')
const recipeClosebtn=document.querySelector('.recipe-closebtn')

const fetchrecipies = async (query) => {
    recipecontainer.innerHTML = "<h2>Fetching recipes..</h2>"
    try{
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const response = await data.json();
    recipecontainer.innerHTML="";
    response.meals.forEach(meal => {
        const recipediv = document.createElement('div');
        recipediv.classList.add('recipe');
        recipediv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea}</p>
        <p>${meal.strCategory}</p>
        `
        const button=document.createElement('button');
        button.textContent="view Recipe";
        recipediv.appendChild(button);

        //Adding EventListener to recipe button
        button.addEventListener('click',()=>{
            openRecipePopup(meal);
        })
        recipecontainer.append(recipediv)

    });
}
catch(error){
     recipecontainer.innerHTML = "<h2>Error in Fetching recipes..</h2>"
}
}

//function to fetch ingredients and measurements
const fetchIngredients=(meal)=>{
  let ingredientlist="";
  for (let i = 1; i <=20; i++) {
    const ingredient=meal[`strIngredient${i}`];
    if(ingredient){
        const measure= meal[`strMeasure${i}`];
        ingredientlist +=`<li>${measure} ${ingredient}<li>`
    }
    else{
        break;
    }
    
  }
  return ingredientlist;

}
const openRecipePopup=(meal)=>{
recipeDetailsContent.innerHTML=`
<h2 class="recipename">${meal.strMeal}</h2>
<h3>Ingredients:</h3>
<ul class="ingredientList">${fetchIngredients(meal)}</ul>
<div class="recipeInstructions">
<h3>Instructions:</h3>
<p >${meal.strInstructions}</p>
`
recipeDetailsContent.parentElement.style.display="block";
}

//close button
recipeClosebtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display="none";
})
//search button
btn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchinput = searchbox.value.trim();
    if(!searchinput){
        recipecontainer.innerHTML=`<h2>Type the meal in the search box.`
        return;
    }
    fetchrecipies(searchinput);

})