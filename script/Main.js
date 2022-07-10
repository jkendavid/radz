


$('.panel-button-next').on('click', function () {
    var btn = $(this)
    var panel = $(btn.closest('.panel'))
    var panelnext = $(panel.nextAll('.panel:not(.skip)')[0])
    panel.hide()
    panelnext.show("slide", { direction: "right" }, 800)
});


$('.panel-button-prev').on('click', function () {
    var btn = $(this)
    var panel = $(btn.closest('.panel'))
    var panelprev = $(panel.prev())
    panel.hide()
    panelprev.show("slide", { direction: "left" }, 800)

});


$('.input-group-main .page-input-check').on('focus', function () {
    var control = $(this)
    control.closest('.input-group-main').find('.helper').html('Press Enter or Tab key if done.')
})


$('input').on('keyup', function (e) {
    if (e.which == 13) {
        $(this).trigger("blur");
    }
})


$('input .page-input-check').blur(function () {
    var control = $(this);
    if (control.hasClass('numberonly')) control.val(formatnumberonly(control.val()))
    control.closest('.input-group-main').find('.helper').html('')
    control.attr('page-input-check', 'true')
    pageNextCheck(control)
});

$('input.page-input-check').blur(function () {
    var control = $(this);
    if (control.hasClass('numberonly')) control.val(formatnumberonly(control.val()))
    control.closest('.input-group-main').find('.helper').html('')
});

$('.page-input-check input[type="radio"]').change(function () {
    var pageinputcheck = $($(this).closest('.page-input-check'))
});


function pageNextShow(control) {
    control.closest('.panel-page').next().show()
}

function pageNextAllHide(control) {
    control.closest('.panel-page').nextAll().hide()
}

function propButtonNext(control, disabled) {
    var button =  control.closest('.panel').find('.panel-button-next')
    if (disabled){
        button.hide()    
    } else{
        button.show()
    }
}



$($('.panel:not(.skip)')[0]).show()


