"use strict";
var header = {};
header.editImageLink = function () {
    var image = document.querySelector(".ls-master-header-logo");
    var menu = document.querySelector("#s_m_ctl17") || document.querySelector("#m_ctl17");
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
    if (!profileText || !profileButton || !navbarProfile) {
        if (!navbarProfile)
            return;
        var username = navbarProfile.text;
        navbarProfile.text = "".concat(school, " (").concat(username, ")");
        navbarProfile.href = "";
        navbarProfile.style.pointerEvents = "none";
        var element_1 = document.createElement("span");
        container.append(element_1);
        return;
    }
    var _a = profileText.innerHTML.split(", "), name = _a[0], grade = _a[1];
    grade = grade.replace("-", "").trim();
    var names = name.split(" ");
    name = "".concat(names[1], " ").concat(names[names.length - 1]);
    navbarProfile.text = "".concat(name, ", ").concat(grade, " ").concat(school);
    navbarProfile.href = profileButton.href;
    if (navbarProfile.href === window.location.pathname) {
        navbarProfile.classList.add("nav-active");
    }
    var element = document.createElement("span");
    container.append(element);
};
header.createLogoutButton = function () {
    var container = document.querySelector("header .ls-master-header-institution");
    var logoutButton = document.querySelector("#s_m_ctl18") || document.querySelector("#m_ctl18");
    if (!container || !logoutButton)
        return;
    var element = document.createElement("a");
    element.href = logoutButton.href;
    element.text = "Log ud";
    container.appendChild(element);
};
header.createLoginButton = function () {
    var container = document.querySelector("header .ls-master-header-institution");
    var userText = document.querySelector("header .ls-master-header-institution .ls-user-name");
    if (userText)
        return;
    var logoutButton = document.querySelector("#m_ctl17 ");
    if (!container || !logoutButton)
        return;
    var element = document.createElement("a");
    element.href = logoutButton.href;
    element.text = "Log ind";
    container.appendChild(element);
};
header.createNavLinks = function () {
    function _createLink(element) {
        var link = document.createElement("a");
        link.href = element.href;
        link.text = element.text;
        if (element.id.includes("subnavigator_ctl04"))
            link.href = element.href.replace("fravaerelev_fravaersaarsager", "fravaerelev");
        var shouldSlice = false;
        var sliceLinks = ["Karakterer", "Studieplan", "Bøger", "Dokumenter"];
        sliceLinks.forEach(function (text) {
            if (shouldSlice)
                return;
            if (element.text === text)
                shouldSlice = true;
        });
        if (shouldSlice)
            link.href = element.href.slice(0, link.href.indexOf("?"));
        var windowHref = window.location.origin + window.location.pathname;
        if (link.href === windowHref) {
            link.classList.add("nav-active");
        }
        return link;
    }
    var container = document.querySelector("header nav");
    if (!container)
        return;
    var links = [];
    var hiddenLinks = [];
    var home = document.querySelector("header nav #s_m_ctl16") || document.querySelector("header nav #m_ctl16");
    if (home)
        links.push(_createLink(home));
    var elements = document.querySelectorAll(".ls-subnav-container .ls-subnav1 div a");
    elements.forEach(function (element, index) {
        if (element.text == "Skema" && links.length === 1)
            return links.push(_createLink(element));
        if (element.text == "Fravær" && links.length === 2)
            return links.push(_createLink(element));
        if (element.text == "Opgaver" && links.length === 3)
            return links.push(_createLink(element));
        if (element.text == "Lektier" && links.length === 4)
            return links.push(_createLink(element));
        if (element.text == "Karakterer" && links.length === 5)
            return links.push(_createLink(element));
        if (element.text == "Beskeder" && links.length === 6)
            return links.push(_createLink(element));
        if (element.text == "Studieplan" && hiddenLinks.length === 0)
            return hiddenLinks.push(_createLink(element));
        if (element.text == "Bøger" && hiddenLinks.length === 1)
            return hiddenLinks.push(_createLink(element));
        if (element.text == "Dokumenter" && hiddenLinks.length === 2)
            return hiddenLinks.push(_createLink(element));
        return;
    });
    container.append.apply(container, links);
    if (elements.length < 2)
        return;
    var spanElement = document.createElement("span");
    container.append(spanElement);
    var hiddenLinkInput = document.createElement("input");
    hiddenLinkInput.type = "checkbox";
    hiddenLinkInput.id = "nav-toggle-hidden-links";
    var hiddenLinkActive = false;
    var hiddenLinkLabel = document.createElement("label");
    hiddenLinkLabel.htmlFor = "nav-toggle-hidden-links";
    hiddenLinks.forEach(function (link) {
        hiddenLinkLabel.append(link);
        if (link.classList.contains("nav-active")) {
            hiddenLinkActive = true;
        }
    });
    hiddenLinkInput.checked = hiddenLinkActive;
    container.append(hiddenLinkInput);
    container.append(hiddenLinkLabel);
};
Object.keys(header).forEach(function (func) { return header[func](); });
