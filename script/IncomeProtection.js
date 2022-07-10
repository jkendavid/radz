
var IncomeProtectionMonthlyExpeses
var IncomeProtectionFund
var IncomeProtectionSavings
var IncomeProtectionSetAsideFunds

$('#inputIncomeProtectionMonthlyExpeses').blur(function () {
    var control = $(this);
    if (IncomeProtectionMonthlyExpeses != toInt(control.val())){
        IncomeProtectionMonthlyExpeses = toInt(control.val())
        IncomeProtectionFund = toInt(IncomeProtectionMonthlyExpeses * 60)
        $('#formulaIncomeProtectionMonthlyExpeses').html('₱' + formatnumberonly(IncomeProtectionMonthlyExpeses))
        $('#formulaIncomeProtectionFund').html('₱' + formatnumberonly(IncomeProtectionFund))

        pageNextAllHide(control);
        propButtonNext(control, true);
        $('#optIncomeProtectionSavings input[type="radio"]').prop('checked', false);
        pageNextShow(control);
    }
});


$('#optIncomeProtectionSavingsYes[type="radio"]').change(function () {
    var control = $(this);
    $('#pageIncomeProtectionSavings').show()
    propButtonNext(control, true);
});


$('#optIncomeProtectionSavingsNo[type="radio"]').change(function () {
    var control = $(this);
    pageNextAllHide(control);
    propButtonNext(control, false);
    IncomeProtectionSavings = null;
    $('#inputIncomeProtectionSavings ').val('')
});



$('#inputIncomeProtectionSavings').blur(function () {
    var control = $(this);
    if (IncomeProtectionSavings != toInt(control.val())) {
        IncomeProtectionSavings = toInt(control.val())
        if (IncomeProtectionSavings > IncomeProtectionFund) {
            pageNextAllHide(control);
            propButtonNext(control, true);
            $('#optIncomeProtectionSetAsideFunds input[type="radio"]').prop('checked', false);
            pageNextShow(control);
        } else {
            propButtonNext(control, false);
        }
    } 
});



$('#optIncomeProtectionSetAsideFunds input[type="radio"]').change(function () {
    var control = $(this)
    IncomeProtectionSetAsideFunds=$('#optIncomeProtectionSetAsideFunds input[type="radio"]:checked').val()
    propButtonNext(control, false);
});