window.onload = onLoadFn;


function onLoadFn() {
    //Form Element Declare
    let addRecipeForm = document.getElementById("addEspressoRecipe");
    let coffeeBeanElem = document.getElementById("coffeeBean");
    let beanGramsElem = document.getElementById("beanGrams");
    let yieldMLElem = document.getElementById("yieldML");
    let brewingTimeElem = document.getElementById("brewingTime");
    let temperatureElem = document.getElementById("temperature");
    let beanGrindElem = document.getElementById("beanGrind");


    // Form Validation
    let regexMatch = /^\d{1,3}$/;

    // Returns the boolean whether it matches the regex input
    function regExMatch(input){
        return regexMatch.test(input);
    }
    
    // Input validation function for convience. 
    // Takes in the element name, then determines whether or not the form is valid
    function inputValidation(element){
        if(!regExMatch(element.value)){
            element.style.background="red";
            console.log ("Form is not valid");
            return false;
        }else {
            element.style.background="";
            return true;
        }
    }


    // After clicking submit
    function onSubmit(event){
        event.preventDefault(); 
        let isValidForm = true;
        
        // Capture form data!
        let coffeeBean = coffeeBeanElem.value;
        let beanGrams = beanGramsElem.value;
        let yieldML = yieldMLElem.value;
        let brewingTime = brewingTimeElem.value;
        let temperature = temperatureElem.value;
        let beanGrind = beanGrindElem.value;
        
        // Input validation calling the function on each field 


        isValidForm = inputValidation(beanGramsElem) && isValidForm;
        isValidForm = inputValidation(yieldMLElem) && isValidForm;
        isValidForm = inputValidation(brewingTimeElem) && isValidForm;
        isValidForm = inputValidation(temperatureElem) && isValidForm;

        console.log(beanGrindElem.value)


        console.log(beanGrind);
        console.log(isValidForm);

        if (isValidForm === true ){
            //Create object for espressoRecipe
            const espressoRecipe = {
                coffeeBean: coffeeBean,
                beanGrams: beanGrams,
                beanGrind: beanGrind,
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
        }

    }
    
    addRecipeForm.onsubmit = onSubmit;


}