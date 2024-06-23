const searchbox = document.querySelector('.searchbox');
const btn = document.querySelector('.btn');
const recipecontainer = document.querySelector('.Recipe-container');

const recipeDetailsContent=document.querySelector('.recipe-details-content')
const recipeClosebtn=document.querySelector('.recipe-closebtn')

const fetchrecipies = async (query) => {
    recipecontainer.innerHTML = "<h2>Fetching recipes..</h2>"
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
        recipecontainer.append(recipediv)

    });

}
btn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log('button clicked');
    const searchinput = searchbox.value.trim();
    fetchrecipies(searchinput);

})