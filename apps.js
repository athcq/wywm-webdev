// Constants for API URL and DOM elements
const API_URL = 'https://www.themealdb.com/api/json/v1/1/';
const ingredientSelect = document.getElementById('ingredient-select');
const locationSelect = document.getElementById('location-select');
const mealImage = document.querySelector('.meal-image');
const mealText = document.querySelector('.meal-text');

// Fetch list of ingredients from API and update select dropdown in alphabetical order
fetch(API_URL + 'list.php?i=list')
  .then(response => response.json())
  .then(data => {
    data.meals.sort((a, b) => a.strIngredient.localeCompare(b.strIngredient)).forEach(meal => {
      const option = document.createElement('option');
      option.value = meal.strIngredient;
      option.textContent = meal.strIngredient;
      ingredientSelect.appendChild(option);
    });
  });

// Fetch list of areas from API and update select dropdown in alphabetical order
fetch(API_URL + 'list.php?a=list')
  .then(response => response.json())
  .then(data => {
    data.meals.sort((a, b) => a.strArea.localeCompare(b.strArea)).forEach(meal => {
      const option = document.createElement('option');
      option.value = meal.strArea;
      option.textContent = meal.strArea;
      locationSelect.appendChild(option);
    });
  });

// Handle click event on select button to display selected meal
const selectButton = document.getElementById('select');
selectButton.addEventListener('click', () => {
  const ingredient = ingredientSelect.value;
  if (!ingredient) {
    return;
  }
  fetch(API_URL + `filter.php?i=${ingredient}`)
    .then(response => response.json())
    .then(data => {
      const meal = data.meals[0];
      if (!meal) {
        return;
      }
      mealImage.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      `;
      mealText.innerHTML = `
        <h4>${meal.strMeal}</h4>
      `;
      ingredientSelect.selectedIndex = 0;
      locationSelect.selectedIndex = 0;
    });
});

// Handle click event on location button to display selected meal
const locationButton = document.getElementById('location');
locationButton.addEventListener('click', () => {
  const area = locationSelect.value;
  if (!area) {
    return;
  }
  fetch(API_URL + `filter.php?a=${area}`)
    .then(response => response.json())
    .then(data => {
      const meal = data.meals[0];
      if (!meal) {
        return;
      }
      mealImage.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      `;
      mealText.innerHTML = `
        <h4>${meal.strMeal}</h4>
      `;
      ingredientSelect.selectedIndex = 0;
      locationSelect.selectedIndex = 0;
    });
});



// Handle click event on random button to display a random meal
const randomButton = document.getElementById('randomButton');
randomButton.addEventListener('click', () => {
  fetch(API_URL + 'random.php')
    .then(response => response.json())
    .then(data => {
      const meal = data.meals[0];
      if (!meal) {
        return;
      }
      mealImage.innerHTML = `
        <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      `;
      mealText.innerHTML = `
        <h4>${meal.strMeal}</h4>
      `;
      ingredientSelect.selectedIndex = 0;
      locationSelect.selectedIndex = 0;
    });
});