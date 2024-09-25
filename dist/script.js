"use strict";
editUserText();
createLogoutButton();
function editUserText() {
    var container = document.querySelector("header .ls-master-header-institution");
    if (!container)
        return;
    var newText = container.innerText.replace("&nbsp; Bruger:", "").trim();
    var school = newText.replace("&nbsp;", "").trim();
    container.textContent = "";
    var profileText = document.querySelector("#s_m_HeaderContent_MainTitle .ls-hidden-smallscreen");
    var profileButton = document.querySelector("#s_m_HeaderContent_subnavigator_ctl12");
    var navbarProfile = document.querySelector("header .ls-master-header-institution .ls-user-name");
    if (!profileText || !profileButton || !navbarProfile)
        return;
    var _a = profileText.innerHTML.split(", "), name = _a[0], grade = _a[1];
    grade = grade.replace("-", "").trim();
    name = name.split(" ")[1];
    navbarProfile.text = "".concat(name, ", ").concat(grade, " ").concat(school);
    navbarProfile.href = profileButton.href;
    var element = document.createElement("span");
    container.append(element);
}
function createLogoutButton() {
    var container = document.querySelector("header .ls-master-header-institution");
    var logoutButton = document.querySelector("#s_m_ctl18");
    if (!container || !logoutButton)
        return;
    var element = document.createElement("a");
    element.href = logoutButton.href;
    element.text = "Log ud";
    container.appendChild(element);
}
