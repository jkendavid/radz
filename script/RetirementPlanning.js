

var retirementPlanningRetirementAge
var currentAge
var retirementPlanningCurrentIncome
var retirementPlanningCurrentIncomePercent
var retirementPlanningCurrentRetirementIncomePerYear
var retirementPlanningCurrentRetirementIncomeYear
var retirementPlanningCurrentRetirementIncome

$('#inputRetirementPlanningRetirementAge').blur(function () {
    var control = $(this);
    if (retirementPlanningRetirementAge != toInt(control.val())) {
        retirementPlanningRetirementAge = toInt(control.val())
        var birthYear = toInt(PersonalDataDateOfBirth.split("-")[0])
        var currentYear = toInt(new Date().getFullYear())
        currentAge = currentYear - birthYear
        if (retirementPlanningRetirementAge <= currentAge) {
            control.focus()
            updateInputHelper(control, 'Please input age greater than your current age.')
        } else {
            var yearsBeforeRetirement = retirementPlanningRetirementAge - currentAge
            $('#spanRetirementPlanningYearsBeforeRetirement').html(yearsBeforeRetirement)
            pageNextAllHide(control);
            pageNextShow(control);
            var sRemarks = $('#sRetirementPlanningYearsBeforeRetirement')
            if (yearsBeforeRetirement > 10) {
                sRemarks.html('You have more than enough time, but the sooner you start the easier it is.')
            } else {
                sRemarks.html('You have only a few more years left before retirement, but the good news is you can start today.')
            }
        }
    }
});


$('#inputRetirementPlanningCurrentIncome').blur(function () {
    var control = $(this);
    if (retirementPlanningCurrentIncome != toInt(control.val())) {
        retirementPlanningCurrentIncome = toInt(control.val())
        pageNextAllHide(control);
        pageNextShow(control);
    }
});


$('#inputRetirementPlanningCurrentIncomePercent').blur(function () {
    var control = $(this);
    if (retirementPlanningCurrentIncomePercent != toInt(control.val())) {
        retirementPlanningCurrentIncomePercent = toInt(control.val())
      
        if (retirementPlanningCurrentIncomePercent > 100) {
            control.focus()
            updateInputHelper(control, 'Please input not greater than 100%.')
        } else {
            $('#formulaRetirementPlanningCurrentIncome').html('₱' + formatnumberonly(retirementPlanningCurrentIncome))
            $('#formulaRetirementPlanningCurrentIncomePercent').html(formatnumberonly(retirementPlanningCurrentIncomePercent) + '%')
            retirementPlanningCurrentRetirementIncomePerYear = retirementPlanningCurrentIncome *retirementPlanningCurrentIncomePercent/100*12
            $('#formulaRetirementPlanningRetirementIncomePerYear').html('₱' + formatnumberonly(retirementPlanningCurrentRetirementIncomePerYear))
            pageNextAllHide(control);
            pageNextShow(control);
        }
    }
});


$('#inputRetirementPlanningRetirementIncomeYear').blur(function () {
    var control = $(this);
    if (retirementPlanningCurrentRetirementIncomeYear != toInt(control.val())) {
        retirementPlanningCurrentRetirementIncomeYear = toInt(control.val())
      
        if (retirementPlanningCurrentRetirementIncomeYear > 30) {
            control.focus()
            updateInputHelper(control, 'Please input not greater than 30 years.')
        } else {
            $('#formulaRetirementPlanningRetirementIncomePerYear2').html('₱' + formatnumberonly(retirementPlanningCurrentRetirementIncomePerYear))
            $('#formulaRetirementPlanningRetirementIncomeYear').html(formatnumberonly(retirementPlanningCurrentRetirementIncomeYear) + 'years')
            retirementPlanningCurrentRetirementIncome = retirementPlanningCurrentRetirementIncomePerYear *retirementPlanningCurrentRetirementIncomeYear
            $('#formulaRetirementPlanningRetirementIncome').html('₱' + formatnumberonly(retirementPlanningCurrentRetirementIncome))
            pageNextAllHide(control);
            pageNextShow(control);
        }
    }
});


$('#optRetirementPlanningFundStarted input[type="radio"]').change(function () {
    var control = $(this);
    propButtonNext(control, false);
});



