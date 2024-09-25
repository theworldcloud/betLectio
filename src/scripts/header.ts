editUserText();
createLogoutButton();

function editUserText() {
    const container: HTMLDivElement | null = document.querySelector("header .ls-master-header-institution");
    if (!container) return;

    container.innerHTML = container.innerHTML.replace("&nbsp; Bruger:", "").trim();
    const school = container.innerText.replace("&nbsp;", ``).trim();

    const profileText = document.querySelector("#s_m_HeaderContent_MainTitle .ls-hidden-smallscreen");
    const profileButton: HTMLAnchorElement | null = document.querySelector("#s_m_HeaderContent_subnavigator_ctl12");
    const navbarProfile: HTMLAnchorElement | null = document.querySelector("header .ls-master-header-institution .ls-user-name");
    if (!profileText || !profileButton || !navbarProfile) return;

    let [ name, grade ] = profileText.innerHTML.split(", ");
    grade = grade.replace("-", "").trim();
    name = name.split(" ")[1];

    navbarProfile.text = `${name}, ${grade} ${school}`;
    navbarProfile.href = profileButton.href;

    const element = document.createElement("span");
    container.append(element);
}

function createLogoutButton() {
    const container = document.querySelector("header .ls-master-header-institution");
    const logoutButton: HTMLAnchorElement | null = document.querySelector("#s_m_ctl18");
    if (!container || !logoutButton) return;

    const element = document.createElement("a");
    element.href = logoutButton.href;
    element.text = "Log ud";

    container.appendChild(element);
}