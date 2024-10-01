const footer: Record<string, () => void> = {};

footer.changeCopyrightText = function() {
    const element: HTMLAnchorElement | null = document.querySelector("#s_m_masterfootermacomSpan a");
    if (!element) return;

    element.innerHTML = "&copy; Copr. MaCom A/S";
}

footer.changeSupportText = function() {
    const element: HTMLAnchorElement | null = document.querySelector("#s_m_masterfootermacomsupportSpan a");
    if (!element) return;

    element.text = "Kontakt via email";
}

footer.createVersionText = function() {
    const container = document.querySelector("footer");
    if (!container) return;

    const manifest = chrome.runtime.getManifest();
    const version = manifest.version;

    const element = document.createElement("span");
    element.id = "betlectiofootervesioninfoSpan";
    element.innerHTML = `betLectio version ${version}`;
    container.append(element);
}

Object.keys(footer).forEach(func => footer[func]());
