const init: Record<string, () => void> = {};

init.loginRedirect = function() {
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

Object.keys(init).forEach(func => init[func]());
