


function goalsRankingUpdateRank() {
    $($('#subpanelLifeGoalsRanking>.lifegoalgroup')).each(function (i, v) {
        var rank = i + 1

        $(v).find('.rank').html('Rank ' + rank)
    });

}



function priortizeItemMoveUp(control) {
    var wrapper = $(control).closest('.lifegoalgroup')
    wrapper.insertBefore(wrapper.prev()).hide().show('slow');
    goalsRankingUpdateRank()
}

function priortizeItemMoveDown(control) {
    var wrapper = $(control).closest('.lifegoalgroup')
    wrapper.insertAfter(wrapper.next()).hide().show('slow');
    goalsRankingUpdateRank()
}


goalsRankingUpdateRank()


var optHtml = []

function updatePriorityOption() {


    var lifeGoalsTitles = ''
    $($('#subpanelLifeGoalsRanking>.lifegoalgroup')).each(function (i, v) {
        var rank = i + 1

        lifeGoalsTitles += (lifeGoalsTitles == '' ? '' : ' & ') + $(v).find('.lifegoalName').html()
        optHtml.push(`<div class="form-check">
                        <input class="form-check-input" type="radio" name="optiLifeGoalsPriority"
                            id="optiLifeGoalsPriority${rank}" value="${rank}">
                        <label class="form-check-label" for="optiLifeGoalsPriority${rank}">${(rank==5?'All life goals':lifeGoalsTitles)+(rank==1?' only':'')}</label>
                    </div>`)

    });

    $('#optiLifeGoalsPriority').html(optHtml.join(''))

}

updatePriorityOption()