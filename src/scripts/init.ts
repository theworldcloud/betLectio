const init: Record<string, () => void> = {};

init.loginRedirect = function() {
    const loginButton: HTMLAnchorElement | undefined = (Array.from(document.querySelectorAll("header nav a")) as Array<HTMLAnchorElement>)
        .find((link) => link.text === "Log ind");

    if (!loginButton) return;

    if (window.location.href === loginButton.href) return;
    window.location.href = loginButton.href;
}

Object.keys(init).forEach(func => init[func]());
