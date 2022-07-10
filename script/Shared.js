function toInt(v) {
    return v == '' ? 0 : parseInt(String(v).replace(/,/g, ""))
}

function formatnumberonly(v) {
    return toInt(v).toLocaleString()
}


$(document).on('input','.numberonly', function (e) {
    var control = e.target
    var c = control.selectionStart,
        r = /[^0-9]/gi,
        v = $(control).val();
    if (r.test(v)) {
        $(control).val(v.replace(r, ''));
        c--;
    }
    control.setSelectionRange(c, c);
})



function isEmail(email) {
    var regex = /(?:[a-z0-9!#$%&' * +/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return regex.test(email);

}

function updateInputHelper(control, text) {
    $(control).closest('.form-control-group').find('.helper').html(text)

}

function updateInputHelper(control, text) {
    $(control).closest('.form-control-group,.input-group-main').find('.helper').html(text)

}


function isName(name) {
    var regex = /^[a-z ,.'-]+$/i;
    return regex.test(name);

}

function isMobileNumber(name) {
    var regex = /^([+]\d{2}[ ])?\d{10}$/
    return regex.test(name);

}



function scrollDown(){
    $("#main-panel").animate({ scrollTop: $(document).height() }, 1000);
}