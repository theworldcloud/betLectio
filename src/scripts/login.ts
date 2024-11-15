const login: Record<string, () => void> = {};

login.autoRedirect = function() {
    const loginButton: HTMLAnchorElement | undefined = (Array.from(document.querySelectorAll("header nav a")) as Array<HTMLAnchorElement>)
        .find((link) => link.text === "Log ind");

    if (!loginButton) return;

    const location = window.location.href.replace(window.location.origin, "").split("?")[0];
    const pathnameArray = window.location.pathname.split("/");
    pathnameArray.pop();
    const pathname = pathnameArray.join("/");

    const allowedPaths = [ `${pathname}/login.aspx`, `${pathname}/VersionInfo.aspx` ]
    if (allowedPaths.includes(location)) return;
    window.location.href = loginButton.href;
}

login.removeText = function() {
    const container = document.querySelector("form[path='login'] #m_Content_panel");
    if (!container) return;

    const children = Array.from(container.children)
        .filter(child => child.localName !== "br");

    container.innerHTML = "";
    container.append(...children);
}

login.changeTitle = function() {
    const element = document.querySelector("form[path='login'] .islandHeaderContainer span");
    if (!element) return;

    element.innerHTML = "Log ind";
}

login.inputPlaceholders = function() {
    const containers = Array.from(document.querySelectorAll("form[path='login'] .ls-std-island-layout-ltr tr:has(input)")) as Array<HTMLDivElement>;
    containers.forEach(function(container) {
        const placeholder = container.querySelector("td");
        const input = container.querySelector("input");

        if (!placeholder || !input) return;
        if (input.type === "checkbox") return;

        input.placeholder = " ";

        const label = document.createElement("label");
        label.innerHTML = placeholder.innerHTML.replace(":", "");
        label.htmlFor = input.id;
        placeholder.innerHTML = "";
        placeholder.append(label);
    });
}

Object.keys(login).forEach(func => login[func]());
