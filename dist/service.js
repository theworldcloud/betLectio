const keepAlive = (i => state => {
    if (state && !i) {
        if (performance.now() > 20e3) chrome.runtime.getPlatformInfo();
        i = setInterval(chrome.runtime.getPlatformInfo, 20e3);
    } else if (!state && i) {
        clearInterval(i);
        i = 0;
    }
})();

chrome.runtime.onMessage.addListener(async function(message, sender, sendResponse) {
    if (message.type === "changelog") {
        keepAlive(true);
            setTimeout(function() {
                sendResponse({status: true});
                keepAlive(false);   
            }, 1);
    }
});