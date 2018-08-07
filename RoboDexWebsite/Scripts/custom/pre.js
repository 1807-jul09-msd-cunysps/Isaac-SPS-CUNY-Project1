$(document).ready(function () {
    if (!$("body").hasClass("light") && !$("body").hasClass("dark")) {
        Cookies.set("theme", "dark");
    }

    if (Cookies.get("theme") == "dark") {
        $("body").addClass("dark");
        $("body").removeClass("light");
    }

    if (Cookies.get("theme") == "light") {
        $("body").css("transition", "none");
        $("body").addClass("light");
        $("body").removeClass("dark");
    }

    $("#theme").on("click", function () {
        $("body").toggleClass("dark");
        $("body").toggleClass("light");

        if ($("body").hasClass("dark")) {
            Cookies.set("theme", "dark");
        }
        else if ($("body").hasClass("light")) {
            Cookies.set("theme", "light");
        }
    });
});

