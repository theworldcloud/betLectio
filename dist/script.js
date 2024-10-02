"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var footer = {};
footer.changeCopyrightText = function () {
    var element = document.querySelector("#s_m_masterfootermacomSpan a") || document.querySelector("#m_masterfootermacomSpan a");
    if (!element)
        return;
    element.innerHTML = "&copy; Copr. MaCom A/S";
};
footer.changeSupportText = function () {
    var element = document.querySelector("#s_m_masterfootermacomsupportSpan a") || document.querySelector("#m_masterfootermacomsupportSpan a");
    if (!element)
        return;
    element.text = "Kontakt via email";
    element.title = "";
};
footer.changeNowText = function () {
    var footer = document.querySelector("footer");
    var element = document.querySelector("#s_m_masterfooternowSpan") || document.querySelector("#m_masterfooternowSpan");
    if (!footer || !element)
        return;
    var _a = element.innerHTML.split("&nbsp;&nbsp;"), date = _a[0], time = _a[1];
    var dateElement = document.createElement("span");
    var _b = date.split("/"), day = _b[0], monthYear = _b[1];
    var _c = monthYear.split("-"), month = _c[0], year = _c[1];
    day = parseInt(day) > 9 ? day : "0" + day;
    month = parseInt(month) > 9 ? month : "0" + month;
    date = "".concat(day, "/").concat(month, "-").concat(year);
    dateElement.innerHTML = date;
    var timeElement = document.createElement("span");
    time = time.replace("kl.", "").trim().replace(":", ".");
    timeElement.innerHTML = time;
    var container = document.createElement("div");
    container.id = "masterfooternow";
    container.append.apply(container, [dateElement, timeElement]);
    footer.append(container);
};
footer.createVersionText = function () {
    var container = document.querySelector("footer");
    if (!container)
        return;
    var manifest = chrome.runtime.getManifest();
    var version = manifest.version;
    var element = document.createElement("span");
    element.id = "betlectiofootervesioninfoSpan";
    element.innerHTML = "betLectio version ".concat(version);
    container.append(element);
};
Object.keys(footer).forEach(function (func) { return footer[func](); });
var header = {};
header.editImageLink = function () {
    var image = document.querySelector(".ls-master-header-logo");
    var menu = Array.from(document.querySelectorAll("header nav a"))
        .find(function (link) { return link.text === "Hovedmenu"; });
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
        var username_1 = navbarProfile.text;
        navbarProfile.text = "".concat(school, " (").concat(username_1, ")");
        navbarProfile.href = "";
        navbarProfile.style.pointerEvents = "none";
        var element_1 = document.createElement("span");
        container.append(element_1);
        return;
    }
    var profileInnerText = profileText.innerText;
    var username = navbarProfile.text;
    var text = "".concat(school, " (").concat(username, ")");
    if (profileInnerText.includes("Eleven")) {
        var student = profileInnerText
            .replace("Eleven", "")
            .replace("-", "")
            .trim();
        var _a = student.split(", "), fullname = _a[0], grade = _a[1];
        var names = fullname.split(" ");
        var name_1 = "".concat(names[0], " ").concat(names[names.length - 1]);
        text = "".concat(name_1, " - ").concat(grade, ", ").concat(school);
    }
    else if (profileInnerText.includes("Læreren")) {
        var teacher = profileInnerText
            .replace("Læreren", "");
        var _b = teacher.split("-").map(function (str) { return str.trim(); }).filter(function (str) { return str.length > 0; }), initials = _b[0], fullname = _b[1];
        var names = fullname.split(" ");
        var name_2 = "".concat(names[0], " ").concat(names[names.length - 1]);
        text = "".concat(name_2, " (").concat(initials, "), ").concat(school);
    }
    navbarProfile.text = text;
    navbarProfile.href = profileButton.href;
    var windowHref = window.location.origin + window.location.pathname;
    if (navbarProfile.href === windowHref) {
        navbarProfile.classList.add("nav-active");
    }
    var element = document.createElement("span");
    container.append(element);
};
header.createLogoutButton = function () {
    var container = document.querySelector("header .ls-master-header-institution");
    var logoutButton = Array.from(document.querySelectorAll("header nav a"))
        .find(function (link) { return link.text === "Log ud"; });
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
    var loginButton = Array.from(document.querySelectorAll("header nav a"))
        .find(function (link) { return link.text === "Log ind"; });
    if (!container || !loginButton)
        return;
    var nav = document.querySelector("#m_mastermenu");
    if (nav)
        nav.style.display = "none";
    var image = document.querySelector(".ls-master-header-logo");
    if (image)
        image.href = loginButton.href;
    var loginElement = document.createElement("a");
    loginElement.href = loginButton.href;
    loginElement.text = "Log ind";
    var windowHref = window.location.origin + window.location.pathname;
    if (loginElement.href === windowHref)
        loginElement.classList.add("nav-active");
    var elements = [];
    var infoElement = document.querySelector("#schoolnametr #m_Content_schoolnametd");
    if (infoElement) {
        var schoolElement = document.createElement("a");
        schoolElement.text = infoElement.innerHTML;
        schoolElement.style.pointerEvents = "none";
        elements.push(schoolElement);
        var spanElement = document.createElement("span");
        elements.push(spanElement);
    }
    container.innerHTML = container.innerHTML.replace("&nbsp;", "");
    container.append.apply(container, __spreadArray(__spreadArray([], elements, true), [loginElement], false));
};
function _createLink(element) {
    var link = document.createElement("a");
    link.href = element.href;
    link.text = element.text;
    if (element.text === "Fravær")
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
    var subNavActive = false;
    var subNavElement = document.querySelector(".ls-subnav2");
    if (subNavElement) {
        var subNavLinks = subNavElement.querySelectorAll("a");
        subNavLinks.forEach(function (subNavLink) {
            if (subNavActive)
                return;
            if (subNavLink.href.includes("?"))
                subNavLink.href = subNavLink.href.slice(0, subNavLink.href.indexOf("?"));
            if (subNavLink.href === windowHref)
                subNavActive = true;
        });
    }
    if (link.href === windowHref) {
        link.classList.add("nav-active");
    }
    var navActiveElement = document.querySelector(".ls-content-container nav .ls-subnav-active a");
    if (navActiveElement && subNavActive) {
        if (navActiveElement.text === element.text)
            link.classList.add("nav-active");
    }
    return link;
}
header.createNavLinks = function () {
    var container = document.querySelector("header nav");
    if (!container)
        return;
    var links = [];
    var hiddenLinks = [];
    var navLinks = Array.from(document.querySelectorAll("header nav div a"));
    var home = navLinks.find(function (link) { return link.text === "Forside"; });
    if (home)
        links.splice(0, 0, _createLink(home));
    var menu = navLinks.find(function (link) { return link.text === "Hovedmenu"; });
    if (menu)
        hiddenLinks.splice(0, 1, _createLink(menu));
    var userContainer = document.querySelector("#s_m_HeaderContent_MainTitle");
    var userText = document.querySelector("#s_m_HeaderContent_MainTitle .ls-hidden-smallscreen");
    if (userContainer && !userText) {
        var allLinks = __spreadArray(__spreadArray([], hiddenLinks, true), links, true);
        return _createImpersonationNavLinks(allLinks);
    }
    container.append.apply(container, links);
    var elements = document.querySelectorAll(".ls-subnav-container div a");
    if (elements.length === 0)
        return container.prepend.apply(container, hiddenLinks);
    if (elements.length <= 1)
        return;
    elements.forEach(function (element, index) {
        if (element.text === "Skema")
            return links.splice(1, 0, _createLink(element));
        if (element.text === "Fravær")
            return links.splice(2, 0, _createLink(element));
        if (element.text === "Opgaver")
            return links.splice(3, 0, _createLink(element));
        if (element.text === "Lektier")
            return links.splice(4, 0, _createLink(element));
        if (element.text === "Karakterer")
            return links.splice(5, 0, _createLink(element));
        if (element.text === "Beskeder")
            return links.splice(6, 0, _createLink(element));
        if (element.text === "Studieplan")
            return hiddenLinks.splice(1, 0, _createLink(element));
        if (element.text === "Bøger")
            return hiddenLinks.splice(2, 0, _createLink(element));
        if (element.text === "Dokumenter")
            return hiddenLinks.splice(3, 0, _createLink(element));
        return;
    });
    container.append.apply(container, links);
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
function _createImpersonationNavLinks(navLinks) {
    var container = document.querySelector("header nav");
    if (!container)
        return;
    container.append.apply(container, navLinks);
    var elements = document.querySelectorAll("#s_m_HeaderContent_subnav_div nav a");
    if (elements.length === 0)
        return;
    var impersonation = document.querySelector("#s_m_HeaderContent_MainTitle");
    if (!impersonation)
        return;
    var impersonationText = impersonation.innerHTML;
    if (impersonationText.includes("Gruppen"))
        return;
    var spanElement = document.createElement("span");
    container.append(spanElement);
    var ignoredLinks = ["Studieplan", "Studieretninger", "Dokumenter", "Bøger", "Materialer"];
    var links = [];
    if (impersonationText.includes("Eleven") || impersonationText.includes("Læreren")) {
        var text = "";
        if (impersonationText.includes("Eleven")) {
            var student = impersonationText.split(" - Skema")[0].trim()
                .replace("Eleven", "")
                .trim();
            var _a = student.split(", "), fullname = _a[0], grade = _a[1];
            var names = fullname.split(" ");
            var name_3 = names[0];
            text = "".concat(name_3, "'s skema (").concat(grade, ")");
        }
        else if (impersonationText.includes("Læreren")) {
            var teacher = impersonationText
                .replace("Læreren", "").trim()
                .split("-");
            var _b = teacher.map(function (str) { return str.trim(); }), initials = _b[0], fullname = _b[1];
            var names = fullname.split(" ");
            var name_4 = names[0];
            text = "".concat(name_4, "'s skema (").concat(initials, ")");
        }
        var element = document.querySelector("#s_m_HeaderContent_subnavigator_ctl01");
        if (!element)
            return;
        var link = document.createElement("a");
        link.text = text;
        link.href = element.href;
        var windowHref = window.location.href;
        if (link.href === windowHref)
            link.classList.add("nav-active");
        links.push(link);
    }
    else if (impersonationText.includes("Klassen")) {
        elements.forEach(function (element) {
            if (ignoredLinks.includes(element.text))
                return;
            var link = document.createElement("a");
            var grade = impersonationText.split("-")[0].trim()
                .replace("Klassen", "").trim();
            link.href = element.href;
            if (element.text === "Medlemsskema")
                element.text = "Skema";
            link.text = "".concat(element.text, " (").concat(grade, ")");
            if (link.href === window.location.href)
                link.classList.add("nav-active");
            links.push(link);
        });
    }
    else if (impersonationText.includes("Holdet")) {
        elements.forEach(function (element) {
            if (ignoredLinks.includes(element.text))
                return;
            var link = document.createElement("a");
            var team = impersonationText.split("-")[0].trim()
                .replace("Holdet", "").trim();
            link.href = element.href;
            if (element.text === "Lærere-Elever")
                element.text = "Medlemmer";
            link.text = "".concat(element.text, " (").concat(team, ")");
            if (link.href === window.location.href)
                link.classList.add("nav-active");
            if (element.text === "Skema")
                links.splice(0, 0, link);
            if (element.text === "Medlemsskema")
                links.splice(1, 0, link);
            if (element.text === "Aktiviteter")
                links.splice(2, 0, link);
            if (element.text === "Modulregnskab")
                links.splice(3, 0, link);
            if (element.text === "Medlemmer")
                links.splice(4, 0, link);
            if (element.text === "Studieplan")
                links.splice(5, 0, link);
        });
    }
    container.append.apply(container, links);
}
Object.keys(header).forEach(function (func) { return header[func](); });
var init = {};
init.loginRedirect = function () {
    var loginButton = Array.from(document.querySelectorAll("header nav a"))
        .find(function (link) { return link.text === "Log ind"; });
    if (!loginButton)
        return;
    var location = window.location.href.replace(window.location.origin, "").split("?")[0];
    var pathnameArray = window.location.pathname.split("/");
    pathnameArray.pop();
    var pathname = pathnameArray.join("/");
    var allowedPaths = ["".concat(pathname, "/login.aspx"), "".concat(pathname, "/VersionInfo.aspx")];
    if (allowedPaths.includes(location))
        return;
    window.location.href = loginButton.href;
};
Object.keys(init).forEach(function (func) { return init[func](); });
var login = {};
login.removeText = function () {
    var container = document.querySelector("#m_Content_panel");
    if (!container)
        return;
    var children = Array.from(container.children)
        .filter(function (child) { return child.localName !== "br"; });
    container.innerHTML = "";
    container.append.apply(container, children);
};
login.changeTitle = function () {
    var element = document.querySelector(".islandHeaderContainer span");
    if (!element)
        return;
    element.innerHTML = "Log ind";
};
login.inputPlaceholders = function () {
    var inputs = Array.from(document.querySelectorAll(".ls-std-island-layout-ltr input"));
    inputs.forEach(function (input) {
        if (input.type === "checkbox")
            return;
        input.placeholder = " ";
    });
};
Object.keys(login).forEach(function (func) { return login[func](); });
