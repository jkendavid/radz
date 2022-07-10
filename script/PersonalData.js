var PersonalDataLastName = ''
var PersonalDataFirstName = ''
var PersonalDataMiddleName = ''
var PersonalDataDateOfBirth
var PersonalDataEmail = ''
var PersonalDataMobileNumber = ''

var PersonalDataLastNameValid = false
var PersonalDataFirstNameValid = false
var PersonalDataMiddleNameValid = true
var PersonalDataDateOfBirthValid = false
var PersonalDataEmailValid = false
var PersonalDataMobileNumberValid = false





function checkPersonalDataInputComplete(control) {
    propButtonNext(control, !(PersonalDataLastNameValid == true
        && PersonalDataFirstNameValid == true
        && PersonalDataMiddleNameValid == true
        && PersonalDataDateOfBirthValid == true
        && PersonalDataEmailValid == true
        && PersonalDataMobileNumberValid == true));
}

$('#inputPersonalDataLastName').keyup(function () {
    PersonalDataLastNameValid = checkPersonalDataLastNameIsValid()
    var control = $(this)
    checkPersonalDataInputComplete(control)
});

function checkPersonalDataLastNameIsValid() {
    var control = $('#inputPersonalDataLastName')
    PersonalDataLastName = control.val()
    if (PersonalDataLastName == '') {
        updateInputHelper(control, 'Last Name is required')
        return false
    }
    if (PersonalDataLastName.length < 2) {
        updateInputHelper(control, 'Invalid Last Name length')
        return false
    }
    if (!isName(PersonalDataLastName)) {
        updateInputHelper(control, 'Invalid Last Name')
        return false
    }
    updateInputHelper(control, '')
    return true
}



$('#inputPersonalDataFirstName').keyup(function () {
    PersonalDataFirstNameValid = checkPersonalDataFirstNameIsValid()
    var control = $(this)
    checkPersonalDataInputComplete(control)
});

function checkPersonalDataFirstNameIsValid() {
    var control = $('#inputPersonalDataFirstName')
    PersonalDataFirstName = control.val()
    if (PersonalDataFirstName == '') {
        updateInputHelper(control, 'First Name is required')
        return false
    }

    if (PersonalDataFirstName.length < 2) {
        updateInputHelper(control, 'Invalid First Name length')
        return false
    }
    if (!isName(PersonalDataFirstName)) {
        updateInputHelper(control, 'Invalid First Name')
        return false
    }
    updateInputHelper(control, '')
    return true
}



$('#inputPersonalDataMiddleName').keyup(function () {
    PersonalDataFirstMiddleValid = checkPersonalDataMiddleNameIsValid()
    var control = $(this)
    checkPersonalDataInputComplete(control)
});

function checkPersonalDataMiddleNameIsValid() {
    var control = $('#inputPersonalDataMiddleName')
    PersonalDataMiddleName = control.val()
    if (!isName(PersonalDataMiddleName) && PersonalDataMiddleName != '') {
        updateInputHelper(control, 'Invalid Middle Name')
        return false
    }
    updateInputHelper(control, '')
    return true
}



$('#inputPersonalDataDateOfBirth').change(function () {
    PersonalDataDateOfBirthValid = checkPersonalDataBirthDateIsValid()
    var control = $(this)
    checkPersonalDataInputComplete(control)
});

function checkPersonalDataBirthDateIsValid() {
    var control = $('#inputPersonalDataDateOfBirth')
    PersonalDataDateOfBirth = control.val()
    if (PersonalDataDateOfBirth == '') {
        updateInputHelper(control, 'Date of Birth is required')
        return false
    }

    updateInputHelper(control, '')
    return true
}





$('#inputPersonalDataEmail').keyup(function () {
    PersonalDataEmailValid = checkPersonalDataEmailIsValid()
    var control = $(this)
    checkPersonalDataInputComplete(control)
});

function checkPersonalDataEmailIsValid() {
    var control = $('#inputPersonalDataEmail')
    PersonalDataEmail = control.val()
    if (PersonalDataEmail == '') {
        updateInputHelper(control, 'Email is required')
        return false
    }

    if (!isEmail(PersonalDataEmail)) {
        updateInputHelper(control, 'Invalid Email')
        return false
    }
    updateInputHelper(control, '')
    return true
}



$('#inputPersonalDataMobileNumber').keyup(function () {
    PersonalDataMobileNumberValid = checkPersonalDataMobileNumberIsValid()
    var control = $(this)
    checkPersonalDataInputComplete(control)
});

function checkPersonalDataMobileNumberIsValid() {
    var control = $('#inputPersonalDataMobileNumber')
    PersonalDataMobileNumber = control.val()
    if (PersonalDataMobileNumber == '') {
        updateInputHelper(control, 'Mobile Number is required')
        return false
    }

    if (!isMobileNumber(PersonalDataMobileNumber)) {
        updateInputHelper(control, 'Invalid Mbile Number')
        return false
    }

    updateInputHelper(control, '')
    return true
}