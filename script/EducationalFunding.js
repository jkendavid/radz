var EducationalFundingChildCount
var EducationalFundingChildYearFund

var EducationalFundingFutureChildCount
var EducationalFundingFutureChildYearFund


$('#inputEducationalFundingChildCount').blur(function () {
    var control = $(this);
    if (EducationalFundingChildCount != toInt(control.val())) {
        EducationalFundingChildCount = toInt(control.val())
        if (EducationalFundingChildCount > 20) {
            control.focus()
            updateInputHelper(control, 'please input not more than 20')
        } else if (EducationalFundingChildCount==0) {            
            pageNextAllHide(control);
            pageShow($('#pageEducationalFundingFutureChild'))
            $('#inputEducationalFundingFutureChildCount').focus()
        } else {

            pageNextAllHide(control);
            updateEducationalFundingChildTable()
            pageNextShow(control);
        }
    }
});


function updateEducationalFundingChildTable() {
    var trs = []

    var htmlInputName = `<input class="inputEducationalFundingChildName form-control" type="text" onblur="educationalFundingChildNameChange($(this))">`
    var htmlInputAge = `<input class="text-center numberonly inputEducationalFundingChildAge form-control" type="text" onblur="educationalFundingChildAgeChange($(this))">`

    var htmlInputSchoolOption = []
    htmlInputSchoolOption.push(`<option selected value="0"></option>`)
    $(tuitionFeeList.List).each(function (i, v) {
        htmlInputSchoolOption.push(`<option value="${v.Fee}">${v.College}</option>`)
    });
    htmlInputSchoolOption.push(`<option value="-1">Others</option>`)

    var htmlInputSchool = `<select class="inputEducationalFundingChildSchool form-select form-control" onchange="educationalFundingChildSchoolChange($(this))">${htmlInputSchoolOption.join('')}</select>`


    var htmlInputTuitionFee = `<input class="numberonly text-right inputEducationalFundingTuitionFee form-control" type="text" readonly onblur="educationalFundingChildInputFeeBlur($(this))" onfocus="educationalFundingChildInputFeeFocus($(this))">`


    for (var i = 1; i <= EducationalFundingChildCount; i++) {
        trs.push(`<tr><td>${i}</td><td>${htmlInputName}</td><td>${htmlInputAge}</td><td>${htmlInputSchool}</td><td>${htmlInputTuitionFee}</td></tr>`)
    }
    $('#tblEducationFundingChild tbody').html(trs.join(''))
}



function educationalFundingChildNameChange(control) {
    var childName = control.val()
    if (childName == '') {
        control.focus()
        educationalFundingChildTableHelperUpdate('Childs Name is required')
    } else if (!isName(childName)) {
        control.focus()
        educationalFundingChildTableHelperUpdate('Invalid Name')
    } else {
        educationalFundingChildTableComplete(control)
    }
}



function educationalFundingChildAgeChange(control) {
    var tr = $(control.closest('tr'))
    if (toInt(tr.find('.inputEducationalFundingChildAge').val()) > 18) {
        control.focus()
        educationalFundingChildTableHelperUpdate('Age must be not more that 18 years old.')
    } else {
        calculateChildEducationalFunding(control)
        educationalFundingChildTableComplete(control)
    }
}

function educationalFundingChildSchoolChange(control) {
    var tr = $(control.closest('tr'))
    var tuitionFeeBase = toInt(tr.find('.inputEducationalFundingChildSchool').val())
    var inputTuitionFee = tr.find('.inputEducationalFundingTuitionFee')
    if (tuitionFeeBase == -1) {
        inputTuitionFee.val()
        inputTuitionFee.attr("readonly", false);
        inputTuitionFee.focus()
        educationalFundingChildTableHelperUpdate('Please input estimated yearly tuition fee.')
    } else {
        inputTuitionFee.attr("readonly", true);
        calculateChildEducationalFunding(control)
        educationalFundingChildTableComplete(control)
    }
}


function educationalFundingChildInputFeeBlur(control) {
    control.val('₱' + formatnumberonly(control.val()))
    educationalFundingChildTableComplete(control)
    calculateChildEducationalTotalFunding()
}

function educationalFundingChildInputFeeFocus(control) {
    control.val(toInt(formatnumberonly(control.val().replace("₱", ""))))
}

function calculateChildEducationalFunding(control) {
    var tr = $(control.closest('tr'))
    var tuitionFeeBase = toInt(tr.find('.inputEducationalFundingChildSchool').val())
    if (tuitionFeeBase != -1) {
        var childAge = toInt(tr.find('.inputEducationalFundingChildAge').val())
        var currentYear = toInt(new Date().getFullYear())
        var collegeYear = currentYear + 18 - childAge
        var baseYear = tuitionFeeList.BaseYear
        var tuitionFeeInflation = tuitionFeeList.AnnualIncrease
        tuitionFee = toInt(tuitionFeeBase * (1 + tuitionFeeInflation * (collegeYear - baseYear)))
        tr.find('.inputEducationalFundingTuitionFee').val('₱' + formatnumberonly(tuitionFee))
        educationalFundingChildTableHelperUpdate('')
        calculateChildEducationalTotalFunding()
    }
}


function calculateChildEducationalTotalFunding() {
    EducationalFundingChildYearFund = 0
    $('#tblEducationFundingChild tbody tr').each(function (i, v) {
        var tr = $(v)
        var tuitionFee = toInt(tr.find('.inputEducationalFundingTuitionFee').val().replace("₱", ""))
        EducationalFundingChildYearFund += tuitionFee
    });

    $('#tblEducationFundingChild tfoot').html(`<tr><th colspan="4" class="text-right">Total</th><th class="text-right">${'₱' + formatnumberonly(EducationalFundingChildYearFund)}</th></tr>`)
}


function educationalFundingChildTableHelperUpdate(text) {
    $('#tblEducationFundingChildHelper').html(text == '' ? '' : `<div class="helper">${text}</div>`)
}


function educationalFundingChildTableComplete(control) {

    var complete = true
    $('#tblEducationFundingChild tbody tr').each(function (i, v) {
        var tr = $(v)
        var childNameCheck = tr.find('.inputEducationalFundingChildName').val() != ''
        var tuitionFeeBaseCheck = toInt(tr.find('.inputEducationalFundingChildSchool').val()) != 0
        var childAgeCheck = tr.find('.inputEducationalFundingChildAge').val() != ''

        if (childNameCheck && tuitionFeeBaseCheck && childAgeCheck) {

        } else {
            educationalFundingChildTableHelperUpdate('Please complete all inputs on the table.')
            complete = false
            return false
        }
    });
    if (complete) {
        $('#formulaEducationalFundingChildYearFund').html('₱' + formatnumberonly(EducationalFundingChildYearFund))
        $('#formulaEducationalFundingChildFund').html('₱' + formatnumberonly(EducationalFundingChildYearFund * 4))
        $('#optEducationalFundingChildFundSetAside input[type="radio"]').prop('checked', false);
        pageNextShow(control);
    } else {
        pageNextAllHide(control);
    }
}

$('#optEducationalFundingChildFundSetAside input[type="radio"]').change(function () {
    var control = $(this);
    $('#inputEducationalFundingFutureChildCount').val('')
    pageNextShow(control);
});




$('#inputEducationalFundingFutureChildCount').blur(function () {
    var control = $(this);
    if (EducationalFundingFutureChildCount != toInt(control.val())) {
        EducationalFundingFutureChildCount = toInt(control.val())
        if (EducationalFundingChildCount > 20) {
            control.focus()
            updateInputHelper(control, 'please input not more than 20')
        } else if (EducationalFundingFutureChildCount==0) {       
            propButtonNext(control, false);
        } else {

            pageNextAllHide(control);
            updateEducationalFundingFutureChildTable()
            pageNextShow(control);
        }
    }
});


function updateEducationalFundingFutureChildTable() {
    var trs = []

    var htmlInputYear = `<input class="text-center numberonly inputEducationalFundingFutureChildYear form-control" type="text" onblur="educationalFundingFutureChildYearChange($(this))">`

    var htmlInputSchoolOption = []
    htmlInputSchoolOption.push(`<option selected value="0"></option>`)
    $(tuitionFeeList.List).each(function (i, v) {
        htmlInputSchoolOption.push(`<option value="${v.Fee}">${v.College}</option>`)
    });
    htmlInputSchoolOption.push(`<option value="-1">Others</option>`)

    var htmlInputSchool = `<select class="inputEducationalFundingFutureChildSchool form-select form-control" onchange="educationalFundingFutureChildSchoolChange($(this))">${htmlInputSchoolOption.join('')}</select>`


    var htmlInputTuitionFee = `<input class="numberonly text-right inputEducationalFundingTuitionFee form-control" type="text" readonly onblur="educationalFundingFutureChildInputFeeBlur($(this))" onfocus="educationalFundingFutureChildInputFeeFocus($(this))">`


    for (var i = 1; i <= EducationalFundingFutureChildCount; i++) {
        trs.push(`<tr><td>${i}</td><td>${htmlInputYear}</td><td>${htmlInputSchool}</td><td>${htmlInputTuitionFee}</td></tr>`)
    }
    $('#tblEducationFundingFutureChild tbody').html(trs.join(''))
}





function educationalFundingFutureChildYearChange(control) {
    var tr = $(control.closest('tr'))
    var currentYear = toInt(new Date().getFullYear())
    if (toInt(tr.find('.inputEducationalFundingFutureChildYear').val()) < currentYear) {
        control.focus()
        educationalFundingFutureChildTableHelperUpdate(`Year must not be past year`)
    } else {
        calculateFutureChildEducationalFunding(control)
        educationalFundingFutureChildTableComplete(control)
    }
}

function educationalFundingFutureChildSchoolChange(control) {
    var tr = $(control.closest('tr'))
    var tuitionFeeBase = toInt(tr.find('.inputEducationalFundingFutureChildSchool').val())
    var inputTuitionFee = tr.find('.inputEducationalFundingFutureTuitionFee')
    if (tuitionFeeBase == -1) {
        inputTuitionFee.val()
        inputTuitionFee.attr("readonly", false);
        inputTuitionFee.focus()
        educationalFundingFutureChildTableHelperUpdate('Please input estimated yearly tuition fee.')
    } else {
        inputTuitionFee.attr("readonly", true);
        calculateFutureChildEducationalFunding(control)
        educationalFundingFutureChildTableComplete(control)
    }
}


function educationalFundingFutureChildInputFeeBlur(control) {
    control.val('₱' + formatnumberonly(control.val()))
    educationalFundingFutureChildTableComplete(control)
    calculateFutureChildEducationalTotalFunding()
}

function educationalFundingFutureChildInputFeeFocus(control) {
    control.val(toInt(formatnumberonly(control.val().replace("₱", ""))))
}

function calculateFutureChildEducationalFunding(control) {
    var tr = $(control.closest('tr'))
    var tuitionFeeBase = toInt(tr.find('.inputEducationalFundingFutureChildSchool').val())
    if (tuitionFeeBase != -1) {
        var childYear = toInt(tr.find('.inputEducationalFundingFutureChildYear').val())
        var collegeYear = childYear + 18
        var baseYear = tuitionFeeList.BaseYear
        var tuitionFeeInflation = tuitionFeeList.AnnualIncrease
        tuitionFee = toInt(tuitionFeeBase * (1 + tuitionFeeInflation * (collegeYear - baseYear)))
        tr.find('.inputEducationalFundingTuitionFee').val('₱' + formatnumberonly(tuitionFee))
        educationalFundingFutureChildTableHelperUpdate('')
        calculateFutureChildEducationalTotalFunding()
    }
}



function educationalFundingFutureChildTableComplete(control) {

    var complete = true
    $('#tblEducationFundingFutureChild tbody tr').each(function (i, v) {
        var tr = $(v)
        var tuitionFeeBaseCheck = toInt(tr.find('.inputEducationalFundingFutureChildSchool').val()) != 0
        var childYearCheck = tr.find('.inputEducationalFundingFutureChildYear').val() != ''

        if (tuitionFeeBaseCheck && childYearCheck) {

        } else {
            educationalFundingFutureChildTableHelperUpdate('Please complete all inputs on the table.')
            complete = false
            return false
        }
    });
    if (complete) {
        $('#formulaEducationalFundingFutureChildYearFund').html('₱' + formatnumberonly(EducationalFundingFutureChildYearFund))
        $('#formulaEducationalFundingFutureChildFund').html('₱' + formatnumberonly(EducationalFundingFutureChildYearFund * 4))
        $('#optEducationalFundingFutureChildFundSetAside input[type="radio"]').prop('checked', false);
        pageNextShow(control);
    } else {
        pageNextAllHide(control);
    }
}


function calculateFutureChildEducationalTotalFunding() {
    EducationalFundingFutureChildYearFund = 0
    $('#tblEducationFundingFutureChild tbody tr').each(function (i, v) {
        var tr = $(v)
        var tuitionFee = toInt(tr.find('.inputEducationalFundingTuitionFee').val().replace("₱", ""))
        EducationalFundingFutureChildYearFund += tuitionFee
    });

    $('#tblEducationFundingFutureChild tfoot').html(`<tr><th colspan="3" class="text-right">Total</th><th class="text-right">${'₱' + formatnumberonly(EducationalFundingFutureChildYearFund)}</th></tr>`)
}

function educationalFundingFutureChildTableHelperUpdate(text) {
    $('#tblEducationFundingFutureChildHelper').html(text == '' ? '' : `<div class="helper">${text}</div>`)
}


$('#optEducationalFundingFutureChildFundSetAside input[type="radio"]').change(function () {
    var control = $(this);
    propButtonNext(control, false);
});
