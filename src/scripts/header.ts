const header: Record<string,() => void> = {};

header.editImageLink = function() {
    const image: HTMLAnchorElement | null = document.querySelector(".ls-master-header-logo");
    const menu: HTMLAnchorElement | null = document.querySelector("#s_m_ctl17") || document.querySelector("#m_ctl17");
    if (!image || !menu) return;

    image.href = menu.href;
}

header.editUserText = function() {
    const container: HTMLDivElement | null = document.querySelector("header .ls-master-header-institution");
    if (!container) return;

    container.innerHTML = container.innerHTML.replace("&nbsp; Bruger:", "").trim();
    const school = container.innerHTML.split("&nbsp;")[0].trim();
    container.innerHTML = container.innerHTML.replace(school, "").trim();
    container.innerHTML = container.innerHTML.replace(`&nbsp;`, "").trim();

    const profileText = document.querySelector("#s_m_HeaderContent_MainTitle .ls-hidden-smallscreen");
    const profileButton: HTMLAnchorElement | null = document.querySelector("#s_m_HeaderContent_subnavigator_ctl12");
    const navbarProfile: HTMLAnchorElement | null = document.querySelector("header .ls-master-header-institution .ls-user-name");
    if (!profileText || !profileButton || !navbarProfile) {
        if (!navbarProfile) return;
        const username = navbarProfile.text;

        navbarProfile.text = `${school} (${username})`;
        navbarProfile.href = "";
        navbarProfile.style.pointerEvents = "none";

        const element = document.createElement("span");
        container.append(element);

        return;
    }

    let [ name, grade ] = profileText.innerHTML.split(", ");
    grade = grade.replace("-", "").trim();
    const names = name.split(" ");
    name = `${names[1]} ${names[names.length - 1]}`;

    navbarProfile.text = `${name}, ${grade} ${school}`;
    navbarProfile.href = profileButton.href;

    if (navbarProfile.href === window.location.pathname) {
        navbarProfile.classList.add("nav-active");
    }

    const element = document.createElement("span");
    container.append(element);
}

header.createLogoutButton = function() {
    const container = document.querySelector("header .ls-master-header-institution");
    const logoutButton: HTMLAnchorElement | null = document.querySelector("#s_m_ctl18") || document.querySelector("#m_ctl18");
    if (!container || !logoutButton) return;

    const element = document.createElement("a");
    element.href = logoutButton.href;
    element.text = "Log ud";

    container.appendChild(element);
}

header.createLoginButton = function() {
    const container = document.querySelector("header .ls-master-header-institution");
    const userText = document.querySelector("header .ls-master-header-institution .ls-user-name");
    if (userText) return;

    const logoutButton: HTMLAnchorElement | null = document.querySelector("#m_ctl17 ");
    if (!container || !logoutButton) return;

    const element = document.createElement("a");
    element.href = logoutButton.href;
    element.text = "Log ind";

    container.appendChild(element);
}

header.createNavLinks = function() {
    function _createLink(element: HTMLAnchorElement) {
        const link = document.createElement("a");

        link.href = element.href;
        link.text = element.text;

        if (element.id.includes("subnavigator_ctl04")) link.href = element.href.replace("fravaerelev_fravaersaarsager", "fravaerelev");

        let shouldSlice= false;
        const sliceLinks = [ "Karakterer", "Studieplan", "Bøger", "Dokumenter" ];
        sliceLinks.forEach(function(text) {
            if (shouldSlice) return;
            if (element.text === text) shouldSlice = true;
        });

        if (shouldSlice) link.href = element.href.slice(0, link.href.indexOf("?"));

        const windowHref = window.location.origin + window.location.pathname;
        if (link.href === windowHref) {
            link.classList.add("nav-active");
        }

        return link;
    }

    const container = document.querySelector("header nav");
    if (!container) return;

    const links: Array<HTMLAnchorElement> = [];
    const hiddenLinks: Array<HTMLAnchorElement> = [];

    const home: HTMLAnchorElement | null = document.querySelector("header nav #s_m_ctl16") || document.querySelector("header nav #m_ctl16");
    if (home) links.push(_createLink(home));

    const elements: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(".ls-subnav-container .ls-subnav1 div a");
    elements.forEach(function(element, index) {
        if (element.text == "Skema" && links.length === 1) return links.push(_createLink(element));
        if (element.text == "Fravær" && links.length === 2) return links.push(_createLink(element));
        if (element.text == "Opgaver" && links.length === 3) return links.push(_createLink(element));
        if (element.text == "Lektier" && links.length === 4) return links.push(_createLink(element));
        if (element.text == "Karakterer" && links.length === 5) return links.push(_createLink(element));
        if (element.text == "Beskeder" && links.length === 6) return links.push(_createLink(element));

        if (element.text == "Studieplan" && hiddenLinks.length === 0) return hiddenLinks.push(_createLink(element));
        if (element.text == "Bøger" && hiddenLinks.length === 1) return hiddenLinks.push(_createLink(element));
        if (element.text == "Dokumenter" && hiddenLinks.length === 2) return hiddenLinks.push(_createLink(element));

        return;
    });

    container.append(...links);
    if (elements.length < 2) return;

    const spanElement = document.createElement("span");
    container.append(spanElement);

    const hiddenLinkInput = document.createElement("input");
    hiddenLinkInput.type = "checkbox";
    hiddenLinkInput.id = "nav-toggle-hidden-links";

    let hiddenLinkActive = false;
    const hiddenLinkLabel = document.createElement("label");
    hiddenLinkLabel.htmlFor = "nav-toggle-hidden-links";
    hiddenLinks.forEach(function(link) {
        hiddenLinkLabel.append(link);

        if (link.classList.contains("nav-active")) {
            hiddenLinkActive = true;
        }
    });

    hiddenLinkInput.checked = hiddenLinkActive;

    container.append(hiddenLinkInput);
    container.append(hiddenLinkLabel);
}

Object.keys(header).forEach(func => header[func]());
