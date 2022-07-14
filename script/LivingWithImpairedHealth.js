var livingWithImpairedHealthAmount


$('#inputLivingWithImpairedHealth').blur(function () {
    var control = $(this);
    livingWithImpairedHealthAmount = toInt(control.val())
    propButtonNext(control, false);
});
