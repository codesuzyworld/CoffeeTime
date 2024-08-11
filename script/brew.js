window.onload = onLoadFn;


function onLoadFn() {

    //Get recipe ID from the URL
     const urlParams = new URLSearchParams(window.location.search);
     const recipeId = urlParams.get('recipeId');


    // Retrieve the list of recipes from localStorage
    let recipes = JSON.parse(localStorage.getItem("espressoRecipeList"));

    // Find the specific recipe using the recipeId
    let recipe = recipes[recipeId];
    console.log("Recipe ID" + recipeId + recipe.coffeeBean + "is loaded");

     //Recipe Info Element 
     let recipeTitle = document.getElementById("recipeTitle");
     let waterML = document.getElementById("waterML");
     let pourTime = document.getElementById("pourTime");

     //Recipe Ingredient Prep Element
     let beansGram = document.getElementById("beansGram");
     let temperature = document.getElementById("temperature");

     //Timer Display Element
     let secsOut = document.getElementById("secsOut");
     let miliSecsOut = document.getElementById("miliSecsOut");

     //Timer Button Elements
     let startBtn = document.getElementById("startTimer");
     let pauseBtn = document.getElementById("pauseTimer");
     let brewAgainBtn = document.getElementById("brewAgain");


     //Hide the brew again button first! 
     $("#brewAgain").hide();
     $("#brewFinished").hide();

     //Load the info for the recipe
     recipeTitle.innerHTML = recipe.coffeeBean;
     waterML.innerHTML = `YIELD: ${recipe.yieldML} ML`;
     pourTime.innerHTML = `TOTAL BREW TIME: ${recipe.brewingTime} Seconds`;

     beansGram.innerHTML = `${recipe.beanGrams} grams of bean, fine grind`;
     temperature.innerHTML = `Adjust your espresso machine temperature to ${recipe.temperature} C`;



     // Load the brewing time for the recipe. Since it is inputted as seconds
     //the seconds must be turned into miliseconds first
     let brewMiliseconds = recipe.brewingTime * 1000;

     //Set the Timer display to the designated brew time
     secsOut.innerHTML = Math.floor(brewMiliseconds / 1000) + " : ";
     miliSecsOut.innerHTML = "000";
     
     // Declare the remaining timer variables
     // Remaining time will be equal to brew miliseconds by default
     let remainingTime = brewMiliseconds;
     let interval = null;
    
     function timeDisplay(){
        
        //Stop the Timer if time is up. 
        if (remainingTime <= 0){
            window.clearInterval(interval);
            secsOut.innerHTML = "00 : ";
            miliSecsOut.innerHTML = "000";
            $("#startTimer").hide();
            $("#pauseTimer").hide();
            $("#secsOut").hide();
            $("#miliSecsOut").hide();
            $("#brewFinished").show();
            $("#brewAgain").show();
            return;
        }

        // Everytime this function is run, deduct 100 miliseconds off the remainingTime
        remainingTime -= 100;

		//Create time variables so all functions have access to it
        // The nowSeconds will be the remaining time divided by 1000
        // The nowMiliseconds will be the remainder of remaining Time divided by 1000, which shows how much miliseconds left 
        let nowSeconds = Math.floor(remainingTime / 1000);
        let nowMiliseconds = remainingTime % 1000;

        //Update the inner HTML
        // Seconds out will have one more 0 in front of it, and will have a : 
        // Miliseconds out will have two more 0 in front of it. 
        secsOut.innerHTML = nowSeconds.toString().padStart(2, '0') + " : ";
        miliSecsOut.innerHTML = nowMiliseconds.toString().padStart(3, '0');

     }

     function startTimer(){
        // Display the current time
		timeDisplay();
		// The interval will be 1000 miliseconds, and will run the timedisplay function 
        secsOut.innerHTML = Math.floor(brewMiliseconds / 1000) + " : ";
        miliSecsOut.innerHTML = "000";
		interval = window.setInterval(timeDisplay, 100);
     }

     function stopTimer() {		
		//clearInterval stops setInterval 
		window.clearInterval(interval);
	}

    function restartTimer() {
        // Stop the Timer first. 
        stopTimer();
        //reset the remainingtime as the brewMiliseconds
        remainingTime = brewMiliseconds;
        //Reset the display
        secsOut.innerHTML = Math.floor(brewMiliseconds / 1000) + " : ";
        miliSecsOut.innerHTML = "000";
        $("#startTimer").show();
        $("#pauseTimer").show();
        $("#secsOut").show();
        $("#miliSecsOut").show();
        $("#brewFinished").hide();
        $("#brewAgain").hide();      
    }

    startBtn.onclick = startTimer;
	pauseBtn.onclick = stopTimer;
    brewAgainBtn.onclick = restartTimer;
}