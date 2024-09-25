"use strict";
var header = {};
console.log(header);
header.editImageLink = function () {
    var image = document.querySelector(".ls-master-header-logo");
    var menu = document.querySelector("#s_m_ctl17") || document.querySelector("#m_ctl16");
    if (!image || !menu)
        return;
    image.href = menu.href;
};
header.editUserText = function () {
    var container = document.querySelector("header .ls-master-header-institution");
    if (!container)
        return;
    container.innerHTML = container.innerHTML.replace("&nbsp; Bruger:", "").trim();
    var school = container.innerHTML.split("&nbsp;")[0].trim();
    container.innerHTML = container.innerHTML.replace(school, "").trim();
    container.innerHTML = container.innerHTML.replace("&nbsp;", "").trim();
    var profileText = document.querySelector("#s_m_HeaderContent_MainTitle .ls-hidden-smallscreen");
    var profileButton = document.querySelector("#s_m_HeaderContent_subnavigator_ctl12");
    var navbarProfile = document.querySelector("header .ls-master-header-institution .ls-user-name");
    if (!profileText || !profileButton || !navbarProfile)
        return profileText === null || profileText === void 0 ? void 0 : profileText.remove();
    var _a = profileText.innerHTML.split(", "), name = _a[0], grade = _a[1];
    grade = grade.replace("-", "").trim();
    var names = name.split(" ");
    name = "".concat(names[1], " ").concat(names[names.length - 1]);
    navbarProfile.text = "".concat(name, ", ").concat(grade, " ").concat(school);
    navbarProfile.href = profileButton.href;
    var element = document.createElement("span");
    container.append(element);
};
header.createLogoutButton = function () {
    var container = document.querySelector("header .ls-master-header-institution");
    var logoutButton = document.querySelector("#s_m_ctl18 ");
    if (!container || !logoutButton)
        return;
    var element = document.createElement("a");
    element.href = logoutButton.href;
    element.text = "Log ud";
    container.appendChild(element);
};
header.createLoginButton = function () {
    var container = document.querySelector("header .ls-master-header-institution");
    var logoutButton = document.querySelector("#m_ctl17 ");
    if (!container || !logoutButton)
        return;
    var element = document.createElement("a");
    element.href = logoutButton.href;
    element.text = "Log ind";
    container.appendChild(element);
};
Object.keys(header).forEach(function (func) { return header[func](); });
