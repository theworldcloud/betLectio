const init: Record<string, () => void> = {};

init.pathAsFormIdentifier = function() {
    const location = window.location.pathname;
    const paths = location.split("/");
    const path = paths[paths.length - 1];
    const name = path.split(".")[0];

    const href = window.location.href
        .replace(window.location.origin, "")
        .replace(location, `./${path}`);

    const form = document.querySelector(`form[action="${href}"]`);
    if (!form) return;

    form.setAttribute("path", name);
}

Object.keys(init).forEach(func => init[func]());
