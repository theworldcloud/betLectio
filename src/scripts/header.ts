const header: Record<string,() => void> = {};
console.log(header);

header.editImageLink = function() {
    const image: HTMLAnchorElement | null = document.querySelector(".ls-master-header-logo");
    const menu: HTMLAnchorElement | null = document.querySelector("#s_m_ctl17") || document.querySelector("#m_ctl16");
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
    if (!profileText || !profileButton || !navbarProfile) return profileText?.remove();

    let [ name, grade ] = profileText.innerHTML.split(", ");
    grade = grade.replace("-", "").trim();
    const names = name.split(" ");
    name = `${names[1]} ${names[names.length - 1]}`;

    navbarProfile.text = `${name}, ${grade} ${school}`;
    navbarProfile.href = profileButton.href;

    const element = document.createElement("span");
    container.append(element);
}

header.createLogoutButton = function() {
    const container = document.querySelector("header .ls-master-header-institution");
    const logoutButton: HTMLAnchorElement | null = document.querySelector("#s_m_ctl18 ");
    if (!container || !logoutButton) return;

    const element = document.createElement("a");
    element.href = logoutButton.href;
    element.text = "Log ud";

    container.appendChild(element);
}

header.createLoginButton = function() {
    const container = document.querySelector("header .ls-master-header-institution");
    const logoutButton: HTMLAnchorElement | null = document.querySelector("#m_ctl17 ");
    if (!container || !logoutButton) return;

    const element = document.createElement("a");
    element.href = logoutButton.href;
    element.text = "Log ind";

    container.appendChild(element);
}


Object.keys(header).forEach(func => header[func]());
