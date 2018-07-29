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

        incrementIDs();
    }
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