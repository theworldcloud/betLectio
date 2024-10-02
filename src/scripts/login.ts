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
    const containers = Array.from(document.querySelectorAll(".ls-std-island-layout-ltr tr:has(input)")) as Array<HTMLDivElement>;
    containers.forEach(function(container) {
        const placeholder = container.querySelector("td");
        const input = container.querySelector("input");

        if (!placeholder || !input) return;
        if (input.type === "checkbox") return;

        input.placeholder = " ";

        const label = document.createElement("label");
        label.innerHTML = placeholder.innerHTML.replace(":", "");
        label.htmlFor = container.id;
        placeholder.innerHTML = "";
        placeholder.append(label);
    });
}

Object.keys(login).forEach(func => login[func]());
