const changelog: Record<string, () => void> = {};

async function getVersionNotes(): Promise<Array<Element>> {
    const res = await chrome.runtime.sendMessage({type: "changelog"});
    console.log(res);

    return [];
}

changelog.betLectio = async function() {
    const params = window.location.search.split("&");
    const key = params.find(param => param.includes("betLectio="));
    if (!key) return;

    const value = JSON.parse(key.replace("betLectio=", ""));
    console.log(value);
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
    loadingElement.textContent = "Indlæser versions noter...";
    container.append(loadingElement);
    
    const versionNotes = await getVersionNotes();
    loadingElement.remove();
    // container.append(...versionNotes);
}

Object.keys(changelog).forEach(func => changelog[func]());