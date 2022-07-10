var EducationalFundingChildCount

$('#inputEducationalFundingChildCount').blur(function () {
    var control = $(this);
    if (EducationalFundingChildCount != toInt(control.val())) {
        EducationalFundingChildCount = toInt(control.val())
        updateEducationalFundingChildTable()
        pageNextShow(control);
    }
});


function updateEducationalFundingChildTable() {
    var trs = []

    var htmlInputName = `<input class="inputEducationalFundingChildName form-control" type="text" >`
    var htmlInputAge = `<input class="inputEducationalFundingChildAge form-control" type="text" onblur="calculateChildEducationalFunding($(this))">`

    var htmlInputSchoolOption = []
    htmlInputSchoolOption.push(`<option selected value=""></option>`)
    $(tuitionFeeList.List).each(function (i, v) {
        htmlInputSchoolOption.push(`<option value="${v.Fee}">${v.College}</option>`)
    });
    htmlInputSchoolOption.push(`<option value="others">Others</option>`)

    var htmlInputSchool = `<select class="inputEducationalFundingChildSchool form-select form-control" onchange="calculateChildEducationalFunding($(this))">${htmlInputSchoolOption.join('')}</select>`

    
    var htmlInputTuitionFee = `<input class="inputEducationalFundingTuitionFee form-control" type="text" onblur="calculateChildEducationalFunding($(this))" readonly>`


    for (var i = 1; i <= EducationalFundingChildCount; i++) {
        trs.push(`<tr><td>${i}</td><td>${htmlInputName}</td><td>${htmlInputAge}</td><td>${htmlInputSchool}</td><td>${htmlInputTuitionFee}</td></tr>`)
    }
    $('#tblEducationFundingChild tbody').html(trs.join(''))
}



function calculateChildEducationalFunding(control) {
    var tr = $(control.closest('tr'))
    var childAge = toInt(tr.find('.inputEducationalFundingChildAge').val())
    var currentYear = toInt(new Date().getFullYear())
    var collegeYear = currentYear + 18 - childAge
    var tuitionFeeBase = toInt(tr.find('.inputEducationalFundingChildSchool').val())
    var baseYear = tuitionFeeList.BaseYear
    var tuitionFeeInflation = tuitionFeeList.AnnualIncrease
    tuitionFee = toInt(tuitionFeeBase*(1+tuitionFeeInflation*(collegeYear-baseYear)))
    tr.find('.inputEducationalFundingTuitionFee').val(formatnumberonly(tuitionFee))
}
