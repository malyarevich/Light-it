jQuery(document).ready(function() {
  // chart pop-up open
  jQuery("#show-popup-chart").on("click", function() {
    jQuery(".popup-chart").show("slow");
    jQuery("#overflow").show();
  });

  // chart pop-up close
  jQuery("#overflow, .close-icon").on("click", function() {
    jQuery(".popup-chart").hide("slow");
    jQuery("#overflow").hide();
  });

  // closed dafault
  jQuery(".popup-chart").hide();
});

// create accordion element
function createAccordion() {
  jQuery(".user-short").on("click", toggleItem);
  jQuery(".user-full").hide();
}

// toggle info block of current user
function toggleItem() {
  let header = jQuery(this);
  let info = jQuery(this).next();

  if (header.hasClass("active")) {
    //close current item
    info.hide(0, function() {
      header.removeClass("active");
      jQuery(".icon").prop("src", "img/plus-icon.png");
    });

  } else {
    //close previous item
    jQuery(".user-full").hide(0, function() {
      jQuery(".user-short").removeClass("active");
      jQuery(".icon").prop("src", "img/plus-icon.png");
    });

    //open current item
    info.slideDown(0, function() {
      header.addClass("active");
      jQuery(".active .icon").prop("src", "img/minus-icon.png");
    });
  }
}
