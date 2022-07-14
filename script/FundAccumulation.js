var fundAcccumulationAmount

$('#inputFundAccumulationAmount').blur(function () {
    var control = $(this);
    fundAcccumulationAmount = toInt(control.val())
    propButtonNext(control, false);
});
