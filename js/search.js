jQuery(document).ready(function() {
  jQuery("#search").on("input", searchUsers);
});

// show only relevant users on the page
// search field: first_name
function searchUsers() {
    let text = jQuery(this).val().toLowerCase();

    let allUsers = jQuery(".first-name");

    let unsuitableUsers = allUsers.filter(function() {
      return jQuery(this).text().toLowerCase().indexOf(text) === -1;
    });

    let neededUsers = allUsers.filter(function() {
      return jQuery(this).text().toLowerCase().indexOf(text) !== -1;
    });

    unsuitableUsers.parents(".user").hide("50");
    neededUsers.parents(".user").show("50");

    jQuery(".user").removeClass("bg-gray");

    jQuery(neededUsers).filter(function(index) {
      return index % 2 === 0;
    }).parents(".user").addClass("bg-gray");

    recountGenderResearch(neededUsers);
};
