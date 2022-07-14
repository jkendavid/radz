
var lifeGoalsPrioritySetAside

$('#optiLifeGoalsPriority input[type="radio"]').change(function () {
    var control = $(this);
    pageNextShow(control);
});



$('#inputLifeGoalsPrioritySetAside').blur(function () {
    var control = $(this);
    propButtonNext(control, false);
   
});