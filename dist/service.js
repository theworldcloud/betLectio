async function handleChangelog(callback) {
    const options = {
        mode: "no-cors"
    };

    const response = await fetch("https://storage.theworldcloud.dk/betLectio/changelog.json", options);
    const changelog = await response.json();

    return changelog;
}

chrome.runtime.onMessage.addListener( function(message, sender, sendResponse) {
    if (message.type === "changelog") {
        handleChangelog().then(sendResponse);
        return true;
    }
});

