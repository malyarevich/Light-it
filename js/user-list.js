jQuery(document).ready(function() {
    jQuery.ajax({
        url: "https://randomuser.me/api?results=20",
        dataType: "json",
        success: getUserInformation
    });
});

var users;

// create short info
function createUserShort(user) {
    let firstName = user.name.first[0].toUpperCase() + user.name.first.slice(1);
    let lastName = user.name.last[0].toUpperCase() + user.name.last.slice(1);

    let userShort = jQuery("<div class='user-short'></div>");
    userShort.append("<div class='avatar'><img src='" + user.picture.thumbnail + "'><div>");

    let userText = jQuery("<div class='user-text'></div>");

    userText.append("<div class='last-name'>" + lastName + "</div>");
    userText.append("<div class='first-name'>" + firstName + "</div>");
    userText.append("<div class='username'>" + user.login.username + "</div>");
    userText.append("<div class='phone'>" + user.phone + "</div>");
    userText.append("<div class='location'>" + user.location.city + "</div>");
    userText.append("<img class='icon' src='img/plus-icon.png'>");

    userShort.append(userText);

    return userShort;
}

// data transform
function getDate(date) {

    date = date.slice(0, date.indexOf(" ")).split("-");
    return date[1] + "/" + date[2] + "/" + date[0];
}

// creating user information block
function createUserFull(user) {
    let firstName = user.name.first[0].toUpperCase() + user.name.first.slice(1);

    let userFullInfo = jQuery("<div class='user-full'></div>");

    let userFullInfoName = jQuery("<div class='user-full-header'></div>");
    userFullInfoName.append("<h1>" + firstName + "</h1>");
    let iconSource = (user.gender == "male") ? "img/man-icon.png" : "img/woman-icon.png";
    userFullInfoName.append("<img src='" + iconSource + "' alt='user-photo'>");

    userFullInfoContent = jQuery("<div class='user-full-content'></div>");

    let container = jQuery("<div></div>");
    container.append("<div><span class='bold'>Username</span> " + user.login.username + "</div>");
    container.append("<div><span class='bold'>Registered</span> " + getDate(user.registered) + "</div>");
    container.append("<div><span class='bold'>Email</span> " + user.email + "</div>");
    userFullInfoContent.append(container);

    container = jQuery("<div></div>");
    container.append("<div><span class='bold'>Address</span> " + user.location.street + "</div>");
    container.append("<div><span class='bold'>City</span> " + user.location.city + "</div>");
    container.append("<div><span class='bold'>Zip Code</span> " + user.location.postcode + "</div>");
    userFullInfoContent.append(container);

    container = jQuery("<div></div>");
    container.append("<div><span class='bold'>Birthday</span> " + getDate(user.dob) + "</div>");
    container.append("<div><span class='bold'>Phone</span> " + user.phone + "</div>");
    container.append("<div><span class='bold'>Cell</span> " + user.cell + "</div>");
    userFullInfoContent.append(container);

    userFullInfoContent.append("<div class='avatar'><img src='" + user.picture.large + "' alt='user-photo'><div>");

    userFullInfo.append(userFullInfoName);
    userFullInfo.append(userFullInfoContent);

    return userFullInfo;
}

// add User
function showOnPage(user) {
    let userInfo = jQuery("<div class='user'></div>");

    let userShort = createUserShort(user)
    let userFull = createUserFull(user);

    userInfo.append(userShort);
    userInfo.append(userFull);

    jQuery(".user-list .content").append(userInfo);
}

// recount gender
function recountGender(users) {
    let male = users.filter(function(user) {
        return user.gender === "male";
    })

    maleCount = male.length;
    femaleCount = users.length - maleCount;

    createAccordion();
    createChart(maleCount, femaleCount);
}

// helper
function MSOtoArray (obj) {
	var i,
		length,
		res;

	if (Object.prototype.toString.call(obj) === '[object Array]') {
		return obj;
	}
	length = obj.length;
	res = [];
	for (i = 0; i < length; i += 1) {
		res.push(obj[i]);
	}
	return res;
}

//recount gender for research (bad way - crutch!)
function recountGenderResearch(userNames) {
    userNames = MSOtoArray(userNames);
    let maleCount = 0;
    users.forEach(function(user){
        userNames.forEach(function(uNames) {
            if (uNames.innerHTML.toLowerCase() === user.name.first.toLowerCase()){
                maleCount++;
            }
        });
    });
    console.log(maleCount);
    femaleCount = userNames.length - maleCount;

    createAccordion();
    createChart(maleCount, femaleCount);
}

// add to to page
function getUserInformation(ajax_users) {
    users = ajax_users.results;
    users.forEach(showOnPage);
    recountGender(users);
    jQuery(".user:nth-child(odd)").addClass("bg-gray");
}
