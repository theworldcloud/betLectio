"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var init = {};
init.pathAsFormIdentifier = function () {
    var location = window.location.pathname;
    var paths = location.split("/");
    var path = paths[paths.length - 1];
    var name = path.split(".")[0];
    var href = window.location.href
        .replace(window.location.origin, "")
        .replace(location, "./".concat(path));
    var form = document.querySelector("form[action=\"".concat(href, "\"]"));
    if (!form)
        return;
    form.setAttribute("path", name);
};
Object.keys(init).forEach(function (func) { return init[func](); });
var absence = {};
absence.sortAbsenceColumns = function () {
    var table = document.querySelector("form[path='fravaerelev_fravaersaarsager'] #s_m_Content_Content_FatabAbsenceFravaerGV tbody");
    if (!table)
        return;
    var elements = Array.from(table.querySelectorAll(" tr:not(:first-child)"));
    if (elements.length === 0)
        return;
    var sortedElements = elements.reverse();
    elements.forEach(function (element) { return element.remove(); });
    sortedElements.forEach(function (element) { return table.append(element); });
};
Object.keys(absence).forEach(function (func) { return absence[func](); });
var changelog = {};
function parseVersion(version) {
    var _a = version.split("."), major = _a[0], minor = _a[1], patch = _a[2];
    return parseFloat("".concat(major, ".").concat(minor).concat(patch));
}
function getVersionNotes() {
    return __awaiter(this, void 0, void 0, function () {
        var versionNotes, changelog, version;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    versionNotes = [];
                    return [4 /*yield*/, chrome.runtime.sendMessage({ type: "changelog" })];
                case 1:
                    changelog = _a.sent();
                    version = chrome.runtime.getManifest().version;
                    changelog.forEach(function (item) {
                        if (parseVersion(item.version) > parseVersion(version))
                            return;
                        if (item.notes.length === 0)
                            item.notes.push("Ingen versionnoter.");
                        var tr = document.createElement("tr");
                        var th = document.createElement("th");
                        th.textContent = item.version;
                        tr.append(th);
                        var td = document.createElement("td");
                        var h4 = document.createElement("h4");
                        h4.textContent = item.date;
                        td.append(h4);
                        td.innerHTML += item.notes.join("<br>");
                        tr.append(td);
                        versionNotes.push(tr);
                    });
                    return [2 /*return*/, versionNotes];
            }
        });
    });
}
changelog.betLectio = function () {
    return __awaiter(this, void 0, void 0, function () {
        var params, key, value, input, label, container, loadingElement, versionNotes;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    params = window.location.search.split("&");
                    key = params.find(function (param) { return param.includes("betLectio="); });
                    if (!key)
                        return [2 /*return*/];
                    value = JSON.parse(key.replace("betLectio=", ""));
                    if (!value)
                        return [2 /*return*/];
                    input = document.querySelector("input#m_Content_HideFejlRettetChk");
                    label = document.querySelector("label[for='m_Content_HideFejlRettetChk']");
                    if (!input || !label)
                        return [2 /*return*/];
                    input.remove();
                    label.remove();
                    container = document.querySelector(".vinfo tbody");
                    if (!container)
                        return [2 /*return*/];
                    Array.from(container.querySelectorAll("tr")).forEach(function (item) { return item.remove(); });
                    loadingElement = document.createElement("span");
                    loadingElement.textContent = "Indlæser...";
                    container.append(loadingElement);
                    return [4 /*yield*/, getVersionNotes()];
                case 1:
                    versionNotes = _a.sent();
                    loadingElement.remove();
                    container.append.apply(container, versionNotes);
                    return [2 /*return*/];
            }
        });
    });
};
Object.keys(changelog).forEach(function (func) { return changelog[func](); });
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
    var spanElement = document.createElement("span");
    spanElement.id = "betlectiofootervesioninfoSpan";
    var element = document.querySelector("footer #s_m_VersionInfoLink") || document.querySelector("footer #m_VersionInfoLink");
    if (element) {
        var linkElement = document.createElement("a");
        var link = element.href.split("?")[0];
        linkElement.text = "betLectio version ".concat(version);
        linkElement.href = "".concat(link, "?prevurl=forside.aspx&betLectio=true");
        spanElement.append(linkElement);
    }
    else {
        spanElement.textContent = "betLectio version ".concat(version);
    }
    container.append(spanElement);
};
function updateVersion() {
    console.log("update");
}
footer.createUpdateButton = function () {
    var container = document.querySelector("footer");
    if (!container)
        return;
    var element = document.createElement("span");
    element.id = "betlectiofootervesionUpdate";
    element.textContent = "Opdater betLectio";
    // element.href = "file:///D:/Workbench/betLectio/dist/update.bat";
    element.onclick = updateVersion;
    container.append(element);
};
footer.changeVersionLink = function () {
    var element = document.querySelector("footer #s_m_VersionInfoLink") || document.querySelector("footer #m_VersionInfoLink");
    if (!element)
        return;
    var link = element.href.split("?")[0];
    element.title = "";
    element.href = "".concat(link, "?prevurl=forside.aspx&betLectio=false");
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
function getInitials(name) {
}
header.editUserText = function () {
    var _a;
    var container = document.querySelector("header .ls-master-header-institution");
    if (!container)
        return;
    container.innerHTML = container.innerHTML.replace("&nbsp; Bruger:", "").trim();
    var school = container.innerHTML.split("&nbsp;")[0].trim();
    container.innerHTML = container.innerHTML.replace(school, "").trim();
    container.innerHTML = container.innerHTML.replace("&nbsp;", "").trim();
    var profileText = document.querySelector("#s_m_HeaderContent_MainTitle .ls-hidden-smallscreen");
    var profileButton = document.querySelector("#s_m_HeaderContent_subnavigator_ctl12");
    var lastProfile = JSON.parse((_a = localStorage.getItem("lastProfileText")) !== null && _a !== void 0 ? _a : "{}");
    var navbarProfile = document.createElement("a");
    container.append(navbarProfile);
    var loginButton = Array.from(document.querySelectorAll("header nav a"))
        .find(function (link) { return link.text === "Log ind"; });
    if (loginButton)
        return;
    if (!profileText || !profileButton) {
        navbarProfile.text = lastProfile.text && lastProfile.text.includes(school) ? "".concat(lastProfile.text) : "".concat(school);
        navbarProfile.href = "";
        navbarProfile.style.pointerEvents = "none";
        if (lastProfile.link && lastProfile.text.includes(school)) {
            navbarProfile.href = lastProfile.link;
            navbarProfile.style.pointerEvents = "unset";
        }
        var element_1 = document.createElement("span");
        container.append(element_1);
        return;
    }
    var profileInnerText = profileText.innerText;
    var text = lastProfile.text && lastProfile.text.includes(school) ? "".concat(lastProfile.text) : "".concat(school);
    console.log(profileInnerText, text);
    if (profileInnerText.includes("Eleven")) {
        var student = profileInnerText
            .replace("Eleven", "")
            .replace("-", "")
            .trim();
        var _b = student.split(", "), fullname = _b[0], grade = _b[1];
        var names = fullname.split(" ");
        var name_1 = "".concat(names[0], " ").concat(names[names.length - 1]);
        text = "".concat(name_1, " - ").concat(grade, ", ").concat(school);
        localStorage.setItem("lastProfileText", JSON.stringify({ text: text, link: profileButton.href }));
    }
    else if (profileInnerText.includes("Læreren")) {
        var teacher = profileInnerText
            .replace("Læreren", "");
        var _c = teacher.split("-").map(function (str) { return str.trim(); }).filter(function (str) { return str.length > 0; }), initials = _c[0], fullname = _c[1];
        var names = fullname.split(" ");
        var name_2 = "".concat(names[0], " ").concat(names[names.length - 1]);
        text = "".concat(name_2, " (").concat(initials, "), ").concat(school);
        localStorage.setItem("lastProfileText", JSON.stringify({ text: text, link: profileButton.href }));
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
            if (name_3[name_3.length - 1] === "s") {
                text = "".concat(name_3, "' skema (").concat(grade, ")");
            }
            else {
                text = "".concat(name_3, "s skema (").concat(grade, ")");
            }
        }
        else if (impersonationText.includes("Læreren")) {
            var teacher = impersonationText
                .replace("Læreren", "").trim()
                .split("-");
            var _b = teacher.map(function (str) { return str.trim(); }), initials = _b[0], fullname = _b[1];
            var names = fullname.split(" ");
            var name_4 = names[0];
            if (name_4[name_4.length - 1] === "s") {
                text = "".concat(name_4, "' skema (").concat(initials, ")");
            }
            else {
                text = "".concat(name_4, "s skema (").concat(initials, ")");
            }
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
            if (element.text === "Medlemmer")
                links.splice(2, 0, link);
            if (element.text === "Modulregnskab")
                links.splice(3, 0, link);
            if (element.text === "Aktiviteter")
                links.splice(4, 0, link);
            if (element.text === "Studieplan")
                links.splice(5, 0, link);
        });
    }
    container.append.apply(container, links);
}
Object.keys(header).forEach(function (func) { return header[func](); });
var home = {};
home.absenceText = function () {
    var container = document.querySelector("#s_m_Content_Content_RegistreringerInfo");
    if (!container)
        return;
    var absenceElement = container.querySelector("td:nth-child(2) a span");
    var lecturesElement = container.querySelector("td:last-child");
    if (!absenceElement || !lecturesElement)
        return;
    var lectures = parseInt(lecturesElement.textContent || "0");
    var text = lectures > 1 ? "moduler" : "modul";
    absenceElement.textContent = "".concat(lectures, " ").concat(text, " mangler frav\u00E6rs\u00E5rsag");
};
Object.keys(home).forEach(function (func) { return home[func](); });
var login = {};
login.autoRedirect = function () {
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
login.removeText = function () {
    var container = document.querySelector("form[path='login'] #m_Content_panel");
    if (!container)
        return;
    var children = Array.from(container.children)
        .filter(function (child) { return child.localName !== "br"; });
    container.innerHTML = "";
    container.append.apply(container, children);
};
login.changeTitle = function () {
    var element = document.querySelector("form[path='login'] .islandHeaderContainer span");
    if (!element)
        return;
    element.innerHTML = "Log ind";
};
login.inputPlaceholders = function () {
    var containers = Array.from(document.querySelectorAll("form[path='login'] .ls-std-island-layout-ltr tr:has(input)"));
    containers.forEach(function (container) {
        var placeholder = container.querySelector("td");
        var input = container.querySelector("input");
        if (!placeholder || !input)
            return;
        if (input.type === "checkbox")
            return;
        input.placeholder = " ";
        var label = document.createElement("label");
        label.innerHTML = placeholder.innerHTML.replace(":", "");
        label.htmlFor = input.id;
        placeholder.innerHTML = "";
        placeholder.append(label);
    });
};
Object.keys(login).forEach(function (func) { return login[func](); });
var profile = {};
profile.changeLoginTimestamps = function () {
    var elements = [];
    var table = "form[path='AdgangIndstillinger'] table tr";
    elements.push.apply(elements, Array.from(document.querySelectorAll("".concat(table, " td:nth-child(1)"))));
    elements.push.apply(elements, Array.from(document.querySelectorAll("".concat(table, " td:nth-child(2)"))));
    elements.forEach(function (element) {
        var _a = element.innerHTML.split(" "), date = _a[0], time = _a[1];
        var _b = date.split("/"), day = _b[0], monthYear = _b[1];
        var _c = monthYear.split("-"), month = _c[0], year = _c[1];
        day = parseInt(day) > 9 ? day : "0" + day;
        month = parseInt(month) > 9 ? month : "0" + month;
        date = "".concat(day, "/").concat(month, "-").concat(year);
        time = time.replace(":", ".");
        element.innerHTML = "".concat(date, " ").concat(time);
    });
};
Object.keys(profile).forEach(function (func) { return profile[func](); });
