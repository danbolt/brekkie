var currentRecipe = null;
var currentState = null;

var requestFailed = function(jqxhr, textStatus, error)
{
  var err = textStatus + ", " + error;
  console.log( "Request Failed: " + err );
}

var updateView = function(text)
{
  $('#slideContent').html('<h1>' + text.toUpperCase() + '</h1>');
}

var applyRecipeData = function(recipeData)
{
  var stateArray = [];

  recipeData.steps.forEach(function(step)
  {
    stateArray[step.name] = step;
  });

  recipeData.steps = stateArray;

  currentRecipe = recipeData;
  currentState = currentRecipe.firstStep;

  updateView(currentRecipe.steps[currentState].content.mainText);
}

var loadRecipe = function(recipeFileName)
{
  $.getJSON('recipes/' + recipeFileName + '.json').done(applyRecipeData).fail(requestFailed);
}

var nextState = function()
{
  if (currentState != null && currentRecipe != null)
  {
    currentState = currentRecipe.steps[currentState].nextStep;

    if (currentState != null)
    {
      updateView(currentRecipe.steps[currentState].content.mainText);
    }
    else
    {
      updateView('You\'re done!');
    }
  }
}

updateView('brekkie');

loadRecipe('crepes');

$('#slideContent').click(nextState);
