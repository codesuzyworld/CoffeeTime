window.onload = onLoadFn;

function onLoadFn() {
    let recipeSection = document.getElementById("recipeSection");
    let recipeTitleElem = document.getElementById("recipeTitle");
    let waterMLElem = document.getElementById("waterML");
    let pourTimeElem = document.getElementById("pourTime");
    let clearDataBtn = document.getElementById("clearData");

    // If there are no recipes, display the no recipe message
    // If there are recipes, then call the recipe display function
    if (localStorage.getItem("espressoRecipeList") === null) {
        $("#recipeSection").hide()
      } else {
        $("#noneSection").hide()
        $("#recipeSection").show()
        getRecipe();
        console.log("I am loading recipe");
      }
    
    // Function that displays the recipes
    function getRecipe(){

        //Getting the recipes 
        let recipes = JSON.parse(localStorage.getItem("espressoRecipeList"));
        
        // Clear the section first
        recipeSection.innerHTML = '';

        // For loop that will display all the recipes stored in the recipe array 
        recipes.forEach((recipe) => {
            let recipeElem = document.createElement("div");
            recipeElem.className = "recipeList";
            recipeElem.innerHTML = `
                <h2>${recipe.coffeeBean}</h2> 
                    <div class="listRight">
                        <p>${recipe.yieldML} ML</p>
                        <p>${recipe.brewingTime} Seconds</p>
                        <a href="addRecipe.html"><p class="brewNowBtn">Brew Now</p></a>
                    </div>
            `;

            recipeSection.appendChild(recipeElem); 
        });

        console.log ("Recipes all displayed")

    }

    function clearData(){
        localStorage.removeItem("espressoRecipeList"); // Corrected this line
        $("#recipeSection").hide();
        $("#noneSection").show();
        console.log("Recipe data cleared");
    }

    clearDataBtn.onclick = clearData;
}  
        // let recipeTitle = espressoRecipe.coffeeBean;
        // let waterML = espressoRecipe.yieldML;
        // let pourTime = espressoRecipe.brewingTime;
        
        // recipeTitleElem.innerHTML = recipeTitle; 
        // waterMLElem.innerHTML = waterML + "ML"; 
        // pourTimeElem.innerHTML = pourTime + "Seconds"; 
        // console.log("I am loading recipe in function");