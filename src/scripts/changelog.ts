const changelog: Record<string, () => void> = {};

interface VersionLog {
    version: string;
    date: string;
    notes: Array<string>;
}

function parseVersion(version: string): number {
    const [ major, minor, patch ] = version.split(".");
    return parseFloat(`${major}.${minor}${patch}`);
}

async function getVersionNotes() {
    const versionNotes: Array<HTMLTableRowElement> = [];
    const changelog: Array<VersionLog> = await chrome.runtime.sendMessage({type: "changelog"})

    const version = chrome.runtime.getManifest().version;
    changelog.forEach(function(item) {
        if (parseVersion(item.version) > parseVersion(version)) return;
        if (item.notes.length === 0) item.notes.push("Ingen versionnoter.")

        const tr = document.createElement("tr");

        const th = document.createElement("th");
        th.textContent = item.version;
        tr.append(th);

        const td = document.createElement("td");
        const h4 = document.createElement("h4");
        h4.textContent = item.date;

        td.append(h4);
        td.innerHTML += item.notes.join("<br>");

        tr.append(td);
        versionNotes.push(tr);
    });

    return versionNotes;
}

changelog.betLectio = async function() {
    const params = window.location.search.split("&");
    const key = params.find(param => param.includes("betLectio="));
    if (!key) return;

    const value = JSON.parse(key.replace("betLectio=", ""));
    if (!value) return;

    const input = document.querySelector("input#m_Content_HideFejlRettetChk");
    const label = document.querySelector("label[for='m_Content_HideFejlRettetChk']");
    if (!input || !label) return;

    input.remove();
    label.remove();

    const container = document.querySelector(".vinfo tbody");
    if (!container) return;

    Array.from(container.querySelectorAll("tr")).forEach(item => item.remove());

    const loadingElement = document.createElement("span");
    loadingElement.textContent = "Indlæser...";
    container.append(loadingElement);
    
    const versionNotes = await getVersionNotes();
    loadingElement.remove();
    container.append(...versionNotes);
}

Object.keys(changelog).forEach(func => changelog[func]());