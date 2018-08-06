let count = 0;

$(document).ready(function () {
    var checkbox = document.querySelector("input[name=perm]");

    if (checkbox) {
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                removeAddress();
            } else {
                addAddress();
            }
        });
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
$("#FirstName, #LastName").on("blur", function () {
    if ($(this).val().length == 0) {
        setInvalid(this);
    }
    else if ($("#FirstName").val().toUpperCase() == $("#LastName").val().toUpperCase()) {
        setInvalid("#FirstName");
        setInvalid("#LastName");
    }
    else {
        setValid("#FirstName");
        setValid("#LastName");
    }
});

// Validate age
$("#Age").on("blur", function () {
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
$("#phoneNum").on("blur", function () {
    var phone = new RegExp("^[0-9]{2,15}$");
    if (phone.test($(this).val())) {
        setValid("#phoneNum");
    }
    else {
        setInvalid("#phoneNum");
    }
});

// Address validation
$(".address1").on("blur"), function () {
    if (!$(this).val().includes(" ")) {
        setInvalid(this);
    }
}

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

    // There are invalid fields
    if ($(".is-invalid")[0]) {
        $("#invalid-alert").removeClass("d-none");
    }
    else {
        $("#invalid-alert").addClass("d-none");
        sendFormDataToCreateContact();
    }
});

$("#contact-us").on("submit", function (event) {
    event.preventDefault();

    // There are invalid fields
    if ($(".is-invalid")[0]) {
        $("#invalid-alert").removeClass("d-none");
    }
    else {
        $("#invalid-alert").addClass("d-none");
        sendFormDataToStoreMessage();
    }
});

$("#country_0, #zip_0").on("blur", function () {
    updateFromZip(0);
});

function serializeMessage() {
    let jsonData = [
        {
            FirstName: $("#FirstName").val(),
            LastName: $("#LastName").val(),
            Email: $("#email").val()
        },
        {
            MessageText: $("#message").val()
            
        }
    ];

    return jsonData;
}

function serialize() {
    let jsonData = {
        FirstName: $("#FirstName").val(),
        LastName: $("#LastName").val(),
        GenderID: parseInt($("#Gender").val(), 10),
        Addresses: [],
        Phones: [],
        Emails: []
    };

    // We make a very naive assumption here that the first space-separted token on
    // address line 1 is the house number and everything else is the street
    let houseNum = $("#address1_0").val().split(" ")[0];

    let street = $("#address1_0").val().substring(houseNum.length + 1);

    street += "\n" + $("#address2_0").val();

    jsonData.Addresses[0] = {
        "Street": street,
        "HouseNum": houseNum,
        "City": $("#city_0").val(),
        "Zip": $("#zip_0").val(),
        "StateCode": $("#state_0").val(),
        "CountryCode": $("#country_0").val(),
        "StateCode": $("#state_0").val()
    };

    if ($("#toAdd").children().length > 0) {
        houseNum = $("#address1_1").val().split(" ")[0];

        street = $("#address1_1").val().substring(houseNum.length);

        street += "\n" + $("#address2_1").val();

        jsonData.Addresses[1] = {
            "Street": street,
            "HouseNum": houseNum,
            "City": $("#city_1").val(),
            "Zip": $("#zip_1").val(),
            "StateCode": $("#state_1").val(),
            "CountryCode": $("#country_1").val(),
            "StateCode": $("#state_1").val()
        };
    }

    //Right now we only allow one phone and one email on this form, even though the data model supports more

    jsonData.Phones[0] = {
        "CountryCode": $("#country-code").val(),
        "AreaCode": $("#area-code").val(),
        "Number": $("#phoneNum").val(),
        "Extension": $("#ext").val()
    };

    jsonData.Emails[0] = {
        "EmailAddress": $("#email").val()
    };

    return jsonData;
}

function stringSerializeContact() {
    return JSON.stringify(serialize(), null, 2);
}

function stringSerializeMessage() {
    return JSON.stringify(serializeMessage(), null, 2);
}

function sendFormDataToStoreMessage() {
    $.post({
        url: "http://robodex.azurewebsites.net/api/Message",
        contentType: 'application/json',
        data: stringSerializeMessage(),
        success: function (response) {
            itWorked(response);
        }
    });
}

function sendFormDataToCreateContact() {
    $.post({
        url: "http://robodex.azurewebsites.net/api/Contact",
        contentType: 'application/json',
        data: stringSerializeContact(),
        success: function (response) {
            messageSent(response);
        }
    });
}

function itWorked(response) {
    $("#invalid-alert").addClass("d-none");
    $("#success-alert").text('It worked! Created ' + $("#FirstName").val() + "!");
    $("#success-alert").removeClass("d-none");
}

function messageSent(response) {
    $("#invalid-alert").addClass("d-none");
    $("#success-alert").text('Message Sent!');
    $("#success-alert").removeClass("d-none");
}

function updateFromZip(num) {
    let country = $("#country_" + num + " option:selected").data("code");
    let zip = $("#zip_" + num).val().toString();
    let url = "http://api.zippopotam.us/" + country.toUpperCase() + "/" + zip; 

    if (country.length > 0 && zip.length > 1) {
        $.get({
            url: url,
            success: function (response) {
                $("#city_" + num).val(response.places[0]["place name"]);
                if ($("#city_" + num).val()) { setValid("#city_" + num); }

                if (country == "US") {
                    $("#state_" + num).val(response.places[0]["state abbreviation"]);
                    setValid("#state_" + num);
                }
            }
        });
    }
}

