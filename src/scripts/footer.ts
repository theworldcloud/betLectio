const footer: Record<string, () => void> = {};

footer.changeCopyrightText = function() {
    const element: HTMLAnchorElement | null = document.querySelector("#s_m_masterfootermacomSpan a") || document.querySelector("#m_masterfootermacomSpan a");
    if (!element) return;

    element.innerHTML = "&copy; Copr. MaCom A/S";
}

footer.changeSupportText = function() {
    const element: HTMLAnchorElement | null = document.querySelector("#s_m_masterfootermacomsupportSpan a") || document.querySelector("#m_masterfootermacomsupportSpan a");
    if (!element) return;

    element.text = "Kontakt via email";
}

footer.changeNowText = function() {
    const footer = document.querySelector("footer");
    const element = document.querySelector("#s_m_masterfooternowSpan") || document.querySelector("#m_masterfooternowSpan");
    if (!footer || !element) return;

    let [ date, time ] = element.innerHTML.split("&nbsp;&nbsp;");

    const dateElement = document.createElement("span");
    let [ day, monthYear ] = date.split("/");
    let [ month, year ] = monthYear.split("-");
    day = parseInt(day) > 9 ? day : "0" + day;
    month = parseInt(month) > 9 ? month : "0" + month;
    date = `${day}/${month}-${year}`;
    dateElement.innerHTML = date;

    const timeElement = document.createElement("span");
    time = time.replace("kl.", "").trim().replace(":", ".");
    timeElement.innerHTML = time;

    const container = document.createElement("div");
    container.id = "masterfooternow";
    container.append(...[ dateElement, timeElement ]);

    footer.append(container);
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
