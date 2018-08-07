$(document).ready(function () {
    getContacts();
});

function getContacts() {
    $.get({
        url: "http://robodex.azurewebsites.net/api/Contact",
        success: function (response) {
            populateContacts(response);
        }
    });
}

function populateContacts(jsonData) {
    for (var i = 0; i < jsonData.length; i++) {
        let newCard = $("#card-template").clone(true);

        newCard.children(".houseNum").text(jsonData[i].AddressID.HouseNum);

        $("#card-container").append(newCard);
    }
}