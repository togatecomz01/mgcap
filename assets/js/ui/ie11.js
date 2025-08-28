$(document).ready(function () {
    $('.auth-list li input[type="radio"]').on("change", function () {
        var $li = $(this).closest("li");
        $li.siblings().removeClass("selected");
        if ($(this).is(":checked")) {
            $li.addClass("selected");
        }
    });
});
