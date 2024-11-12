async function handleChangelog() {
    const options = {
        mode: "no-cors"
    };

    const response = await fetch("https://storage.theworldcloud.dk/betLectio/changelog.json", options);
    const changelog = await response.json();

    return changelog;
}

async function handleVersion() {
    const options = {
        mode: "no-cors"
    };

    const response = await fetch("https://storage.theworldcloud.dk/betLectio/version.txt", options);
    const version = await response.text();

    return version;
}

chrome.runtime.onMessage.addListener( function(message, sender, sendResponse) {
    if (message.type === "changelog") {
        handleChangelog().then(sendResponse);
        return true;
    }

    if (message.type === "version") {
        handleVersion().then(sendResponse);
        return true;
    }
});

