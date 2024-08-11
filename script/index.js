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
        recipes.forEach((recipe, index) => {
            let recipeElem = document.createElement("div");
            recipeElem.className = "recipeList";
            //Here we add each recipe, and assign recipeID according to the array of the recipe JSON to the button. 
            recipeElem.innerHTML = `
                <h2 class=recipeTitle>${recipe.coffeeBean}</h2> 
                    <div class="listRight">
                        <p>${recipe.yieldML} ML</p>
                        <p>${recipe.brewingTime} Seconds</p>
                        <a href="../views/espressobrew.html?recipeId=${index}" class="brewNowBtn">Brew Now</a>
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
