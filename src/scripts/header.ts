const header: Record<string, () => void> = {};

header.editImageLink = function() {
    const image: HTMLAnchorElement | null = document.querySelector(".ls-master-header-logo");
    const menu: HTMLAnchorElement | undefined = (Array.from(document.querySelectorAll("header nav a")) as Array<HTMLAnchorElement>)
        .find((link) => link.text === "Hovedmenu");

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

    const profileText: HTMLSpanElement | null = document.querySelector("#s_m_HeaderContent_MainTitle .ls-hidden-smallscreen");
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

    const profileInnerText = profileText.innerText;
    const username = navbarProfile.text;
    let text = `${school} (${username})`;

    if (profileInnerText.includes("Eleven")) {
        const student = profileInnerText
            .replace("Eleven", "")
            .replace("-", "")
            .trim();

        const [ fullname, grade ] = student.split(", ");
        const names = fullname.split(" ");
        const name = `${names[0]} ${names[names.length - 1]}`;

        text = `${name} - ${grade}, ${school}`;
    } else if (profileInnerText.includes("Læreren")) {
        const teacher = profileInnerText
            .replace("Læreren", "");

        const [ initials, fullname] = teacher.split("-").map(str => str.trim()).filter(str => str.length > 0);
        const names = fullname.split(" ");
        const name = `${names[0]} ${names[names.length - 1]}`;

        text = `${name} (${initials}), ${school}`;
    }

    navbarProfile.text = text;
    navbarProfile.href = profileButton.href;

    const windowHref = window.location.origin + window.location.pathname;
    if (navbarProfile.href === windowHref) {
        navbarProfile.classList.add("nav-active");
    }

    const element = document.createElement("span");
    container.append(element);
}

header.createLogoutButton = function() {
    const container = document.querySelector("header .ls-master-header-institution");
    const logoutButton: HTMLAnchorElement | undefined = (Array.from(document.querySelectorAll("header nav a")) as Array<HTMLAnchorElement>)
        .find((link) => link.text === "Log ud");

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

    const loginButton: HTMLAnchorElement | undefined = (Array.from(document.querySelectorAll("header nav a")) as Array<HTMLAnchorElement>)
        .find((link) => link.text === "Log ind");

    if (!container || !loginButton) return;

    const nav: HTMLDivElement | null = document.querySelector("#m_mastermenu");
    if (nav) nav.style.display = "none";

    const image: HTMLAnchorElement | null = document.querySelector(".ls-master-header-logo");
    if (image) image.href = loginButton.href;

    const element = document.createElement("a");
    element.href = loginButton.href;
    element.text = "Log ind";

    const windowHref = window.location.origin + window.location.pathname;
    if (element.href === windowHref) element.classList.add("nav-active");

    container.appendChild(element);
}

function _createLink(element: HTMLAnchorElement) {
    const link = document.createElement("a");

    link.href = element.href;
    link.text = element.text;

    if (element.text === "Fravær") link.href = element.href.replace("fravaerelev_fravaersaarsager", "fravaerelev");

    let shouldSlice= false;
    const sliceLinks = [ "Karakterer", "Studieplan", "Bøger", "Dokumenter" ];
    sliceLinks.forEach(function(text) {
        if (shouldSlice) return;
        if (element.text === text) shouldSlice = true;
    });

    if (shouldSlice) link.href = element.href.slice(0, link.href.indexOf("?"));
    const windowHref = window.location.origin + window.location.pathname;

    let subNavActive = false;
    const subNavElement = document.querySelector(".ls-subnav2");
    if (subNavElement) {
        const subNavLinks = subNavElement.querySelectorAll("a");
        subNavLinks.forEach(function(subNavLink) {
            if (subNavActive) return;
            if (subNavLink.href.includes("?")) subNavLink.href = subNavLink.href.slice(0, subNavLink.href.indexOf("?"));
            if (subNavLink.href === windowHref) subNavActive = true;
        });
    }

    if (link.href === windowHref) {
        link.classList.add("nav-active");
    }

    const navActiveElement: HTMLAnchorElement | null = document.querySelector(".ls-content-container nav .ls-subnav-active a");
    if (navActiveElement && subNavActive) {
        if (navActiveElement.text === element.text) link.classList.add("nav-active");
    }

    return link;
}

header.createNavLinks = function() {
    const container = document.querySelector("header nav");
    if (!container) return;

    const links: Array<HTMLAnchorElement> = [];
    const hiddenLinks: Array<HTMLAnchorElement> = [];

    const navLinks = Array.from(document.querySelectorAll("header nav div a")) as Array<HTMLAnchorElement>;

    const home: HTMLAnchorElement | undefined = navLinks.find((link) => link.text === "Forside");
    if (home) links.splice(0, 0, _createLink(home));

    const menu: HTMLAnchorElement | undefined = navLinks.find((link) => link.text === "Hovedmenu");
    if (menu) hiddenLinks.splice(0, 1, _createLink(menu));

    const userContainer = document.querySelector("#s_m_HeaderContent_MainTitle");
    const userText = document.querySelector("#s_m_HeaderContent_MainTitle .ls-hidden-smallscreen");
    if (userContainer && !userText) {
        const allLinks: Array<HTMLAnchorElement> = [ ...hiddenLinks, ...links ];
        return _createImpersonationNavLinks(allLinks);
    }

    container.append(...links);
    const elements: NodeListOf<HTMLAnchorElement> = document.querySelectorAll(".ls-subnav-container div a");
    if (elements.length === 0) return container.prepend(...hiddenLinks);
    if (elements.length <= 1) return;

    elements.forEach(function(element, index) {
        if (element.text === "Skema") return links.splice(1, 0, _createLink(element));
        if (element.text === "Fravær") return links.splice(2, 0, _createLink(element));
        if (element.text === "Opgaver") return links.splice(3, 0, _createLink(element));
        if (element.text === "Lektier") return links.splice(4, 0, _createLink(element));
        if (element.text === "Karakterer") return links.splice(5, 0, _createLink(element));
        if (element.text === "Beskeder") return links.splice(6, 0, _createLink(element));

        if (element.text === "Studieplan") return hiddenLinks.splice(1, 0, _createLink(element));
        if (element.text === "Bøger") return hiddenLinks.splice(2, 0, _createLink(element));
        if (element.text === "Dokumenter") return hiddenLinks.splice(3, 0, _createLink(element));

        return;
    });

    container.append(...links);

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

function _createImpersonationNavLinks(navLinks: Array<HTMLAnchorElement>) {
    const container = document.querySelector("header nav");
    if (!container) return;

    container.append(...navLinks);

    const elements: NodeListOf<HTMLAnchorElement> = document.querySelectorAll("#s_m_HeaderContent_subnav_div nav a");
    if (elements.length === 0) return;

    const impersonation = document.querySelector("#s_m_HeaderContent_MainTitle");
    if (!impersonation) return;

    const impersonationText = impersonation.innerHTML;
    if (impersonationText.includes("Gruppen")) return;

    const spanElement = document.createElement("span");
    container.append(spanElement);

    const ignoredLinks =  [ "Studieplan", "Studieretninger", "Dokumenter", "Bøger", "Materialer" ];
    const links: Array<HTMLAnchorElement> = [];

    if (impersonationText.includes("Eleven") || impersonationText.includes("Læreren")) {
        let text = "";

        if (impersonationText.includes("Eleven")) {
            const student = impersonationText.split(" - Skema")[0].trim()
                .replace("Eleven", "")
                .trim();

            const [ fullname, grade ] = student.split(", ");
            const names = fullname.split(" ");
            const name = names[0];

            text = `${name}'s skema (${grade})`;
        } else if (impersonationText.includes("Læreren")) {
            const teacher = impersonationText
                .replace("Læreren", "").trim()
                .split("-");

            const [ initials, fullname ] = teacher.map(str => str.trim());
            const names = fullname.split(" ");
            const name = names[0];

            text = `${name}'s skema (${initials})`;
        }

        const element: HTMLAnchorElement | null = document.querySelector("#s_m_HeaderContent_subnavigator_ctl01");
        if (!element) return;

        const link = document.createElement("a");
        link.text = text;
        link.href = element.href;

        const windowHref = window.location.href;
        if (link.href === windowHref) link.classList.add("nav-active");

        links.push(link);
    } else if (impersonationText.includes("Klassen")) {
        elements.forEach(function(element) {
            if (ignoredLinks.includes(element.text)) return;

            const link = document.createElement("a");
            const grade = impersonationText.split("-")[0].trim()
                .replace("Klassen", "").trim();

            link.href = element.href;

            if (element.text === "Medlemsskema") element.text = `Skema`;
            link.text = `${element.text} (${grade})`;

            if (link.href === window.location.href) link.classList.add("nav-active");

            links.push(link);
        });
    } else if (impersonationText.includes("Holdet")) {
        elements.forEach(function(element) {
            if (ignoredLinks.includes(element.text)) return;

            const link = document.createElement("a");
            const team = impersonationText.split("-")[0].trim()
                .replace("Holdet", "").trim();

            link.href = element.href;

            if (element.text === "Lærere-Elever") element.text = `Medlemmer`;
            link.text = `${element.text} (${team})`;

            if (link.href === window.location.href) link.classList.add("nav-active");
            if (element.text === "Skema") links.splice(0, 0, link);
            if (element.text === "Medlemsskema") links.splice(1, 0, link);
            if (element.text === "Aktiviteter") links.splice(2, 0, link);
            if (element.text === "Modulregnskab") links.splice(3, 0, link);
            if (element.text === "Medlemmer") links.splice(4, 0, link);
            if (element.text === "Studieplan") links.splice(5, 0, link);
        });
    }

    container.append(...links);
}

Object.keys(header).forEach(func => header[func]());
