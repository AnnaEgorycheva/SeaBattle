let currentActiveLevelBtn;
let currentFieldSizeBtn;

function changeActiveLevelButton() {
    if ($(this) != currentActiveLevelBtn) {
        currentActiveLevelBtn.removeClass('active');
        $(this).addClass('active');
        currentActiveLevelBtn = $(this);
    }
}

function changeActiveFieldSizeButton() {
    if ($(this) != currentFieldSizeBtn) {
        currentFieldSizeBtn.removeClass('active');
        $(this).addClass('active');
        currentFieldSizeBtn = $(this);
    }
}

$(document).ready(function() {
    currentActiveLevelBtn = $('.level-btn.active');
    let allLevelBtns = $('.level-btn');
    allLevelBtns.click(changeActiveLevelButton);

    currentFieldSizeBtn = $('.field-size-btn.active');
    let allFieldSizeBtns = $('.field-size-btn');
    allFieldSizeBtns.click(changeActiveFieldSizeButton);

    $('[data-toggle="tooltip"]').hover(
        function(){
            $(this).tooltip('show');
        },
        function(){
            $(this).tooltip('hide'); 
        }
    );
})