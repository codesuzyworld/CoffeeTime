window.onload = onLoadFn;


function onLoadFn() {

    //Form Element Declare
    let addRecipeForm = document.getElementById("addEspressoRecipe");
    let coffeeBeanElem = document.getElementById("coffeeBean");
    let beanGramsElem = document.getElementById("beanGrams");
    let yieldMLElem = document.getElementById("yieldML");
    let brewingTimeElem = document.getElementById("brewingTime");
    let temperatureElem = document.getElementById("temperature");

    function onSubmit(event){
        
        // Capture form data!
        let coffeeBean = coffeeBeanElem.value;
        let beanGrams = beanGramsElem.value;
        let yieldML = yieldMLElem.value;
        let brewingTime = brewingTimeElem.value;
        let temperature = temperatureElem.value;

       
        //Create object for espressoRecipe
        const espressoRecipe = {
            coffeeBean: coffeeBean,
            beanGrams: beanGrams,
            yieldML: yieldML,
            brewingTime: brewingTime,
            temperature: temperature
        };

        // Array for a list of recipes
        let recipeList = [];
        
        // Let's check if the recipe list is empty or not.
        // If it is not null, then let's load the old recipe list first. 
        if (localStorage.getItem("espressoRecipeList") !== null) {
            recipeList = JSON.parse(localStorage.getItem("espressoRecipeList"));
        } 

        // Pushing the new recipe into the recipe list array 
        recipeList.push(espressoRecipe);
       
        localStorage.setItem("espressoRecipeList", JSON.stringify(recipeList));

        console.log ("New Recipe Added");
        window.location.href = "../index.html";
        event.preventDefault();
    }
    
    addRecipeForm.onsubmit = onSubmit;


}