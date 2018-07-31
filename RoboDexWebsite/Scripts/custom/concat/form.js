let count = 0;

var checkbox = document.querySelector("input[name=perm]");

checkbox.addEventListener('change', function () {
    if (this.checked) {
        removeAddress();
    } else {
        addAddress();
    }
});

function removeAddress() {
    let newAddress = document.querySelector("#toAdd");

    while (newAddress.firstChild) {
        newAddress.removeChild(newAddress.firstChild);
    }
}

function addAddress() {
    let toggle = document.querySelector("#perm");

    if (toggle.checked == false) {
        let origAddress = document.querySelector("#address_0");

        let newAddress = origAddress.cloneNode(true);

        newAddress = changeSecondaryAddress(newAddress);

        document.querySelector("#toAdd").appendChild(newAddress);

        removeValidationAndValues("#toAdd input");

        $("#toAdd input").on("blur", function () {
            require(this);
        });

        incrementIDs();

        $("#country_1, #zip_1").on("blur", function () {
            updateFromZip(1);
        });
    }
}

function removeValidationAndValues(ele) {
    $(ele).each(function () {
        $(this).removeClass("is-invalid");
        $(this).removeClass("is-valid");
        if ($(this).val().length > 0) {
            $(this).val("");
        }
    });
}

function changeSecondaryAddress(newAddress) {
    newAddress.querySelector("legend").innerText = "Other Address";
    newAddress.querySelector(".form-check").remove();

    return newAddress;
}

function incrementIDs() {
    // Change the inputs
    $("#toAdd #address1_0").attr("id", "address1_1");
    $("#toAdd #address2_0").attr("id", "address2_1");
    $("#toAdd #country_0").attr("id", "country_1");
    $("#toAdd #state_0").attr("id", "state_1");
    $("#toAdd #city_0").attr("id", "city_1");
    $("#toAdd #zip_0").attr("id", "zip_1");

    $("#toAdd #address1_1").attr("name", "address1_1");
    $("#toAdd #address2_1").attr("name", "address2_1");
    $("#toAdd #country_1").attr("name", "country_1");
    $("#toAdd #state_1").attr("name", "state_1");
    $("#toAdd #city_1").attr("name", "city_1");
    $("#toAdd #zip_1").attr("name", "zip_1");

    // Change the labels
    $("#toAdd #label_address1_0").attr("id", "label_address1_1");
    $("#toAdd #label_address2_0").attr("id", "label_address2_1");
    $("#toAdd #label_country_0").attr("id", "label_country_1");
    $("#toAdd #label_state_0").attr("id", "label_state_1");
    $("#toAdd #label_city_0").attr("id", "label_city_1");
    $("#toAdd #label_zip_0").attr("id", "label_zip_1");

    $("#toAdd #label_address1_1").attr("for", "address1_1");
    $("#toAdd #label_address2_1").attr("for", "address2_1");
    $("#toAdd #label_country_1").attr("for", "country_1");
    $("#toAdd #label_state_1").attr("for", "state_1");
    $("#toAdd #label_city_1").attr("for", "city_1");
    $("#toAdd #label_zip_1").attr("for", "zip_1");
}

function require(ele) {
    if ($(ele).attr("id") != "ext") {
        if ($(ele).val() == 0) {
            setInvalid(ele);
        }
        else {
            setValid(ele);
        }
    }
}

$("input:not(#perm)").on("blur", function () {
    require(this);
});

// Validate name
$("#firstName, #lastName").on("blur", function () {
    if ($(this).val().length == 0) {
        setInvalid(this);
    }
    else if ($("#firstName").val().toUpperCase() == $("#lastName").val().toUpperCase()) {
        setInvalid("#firstName");
        setInvalid("#lastName");
    }
    else {
        setValid("#firstName");
        setValid("#lastName");
    }
});

// Validate age
$("#age").on("blur", function () {
    if ($(this).val() < 15 || $(this).val() > 100) {
        setInvalid(this);
    }
    else {
        setValid(this);
    }
});

// ZIP validation
$("input[id^='zip']").on("blur", function () {
    var zip = new RegExp("^[0-9]+$");

    if (zip.test($(this).val())) {
        setValid(this);
    }
    else {
        setInvalid(this);
    }
});

// Phone validation
$("#phone").on("blur", function () {
    var phone = new RegExp("/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im");
    if (phone.test($(this).val())) {
        setValid("#phone");
    }
    else {
        setInvalid("#phone");
    }
});

function setValid(ele) {
    $(ele).removeClass("is-invalid");
    $(ele).addClass("is-valid");
}

function setInvalid(ele) {
    $(ele).removeClass("is-valid");
    $(ele).addClass("is-invalid");
}

$("#join-us").on("submit", function (event) {
    event.preventDefault();
    console.log($(this).serialize());
});

$("#country_0, #zip_0").on("blur", function () {
    updateFromZip(0);
});

function updateFromZip(num) {
    let country = $("#country_" + num).val().toLowerCase();
    let zip = $("#zip_" + num).val().toString();
    let url = "http://api.zippopotam.us/" + country.toUpperCase() + "/" + zip; 

    if (country.length > 0 && zip.length > 1) {
        $.get({
            url: url,
            success: function (response) {
                $("#city_" + num).val(response.places[0]["place name"]);

                if (country == "US") {
                    $("#state_" + num).val(response.places[0]["state abbreviation"]);
                }
            }
        });
    }
}

