const login: Record<string, () => void> = {};

login.removeText = function() {
    const container = document.querySelector("#m_Content_panel");
    if (!container) return;

    const children = Array.from(container.children)
        .filter(child => child.localName !== "br");

    container.innerHTML = "";
    container.append(...children);
}

login.changeTitle = function() {
    const element = document.querySelector(".islandHeaderContainer span");
    if (!element) return;

    element.innerHTML = "Log ind";
}

login.inputPlaceholders = function() {
    const inputs = Array.from(document.querySelectorAll(".ls-std-island-layout-ltr input")) as Array<HTMLInputElement>;
    inputs.forEach(function(input) {
        if (input.type === "checkbox") return;
        input.placeholder = " ";
    });
}

Object.keys(login).forEach(func => login[func]());
