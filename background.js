chrome.runtime.onInstalled.addListener(function () {
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function () {
        chrome.declarativeContent.onPageChanged.addRules(
            [
                {
                    conditions: [
                        new chrome.declarativeContent.PageStateMatcher({
                            pageUrl: {
                                schemes: ['https', 'http']
                            }
                        })
                    ],
                    actions: [new chrome.declarativeContent.ShowPageAction()]
                }
            ]
        );
    });

    chrome.contextMenus.create({
        id: "incognitOpenRightClickMenu",
        title: "Open in Incognito Mode",
        contexts: ["all"]
    });

    chrome.contextMenus.onClicked.addListener(function (info, tab) {
        if (info.menuItemId == "incognitOpenRightClickMenu") {
            openToIncognito(tab);
        }
    });

    chrome.browserAction.onClicked.addListener(function (tab) {
        openToIncognito(tab);
    });

});

function openToIncognito(tab) {
    if (tab.url.startsWith('http')) {
        chrome.windows.getCurrent({ populate: true }, function (window) {
            const currentTab = window.tabs.find(tab => tab.active)
            chrome.windows.create({ url: currentTab.url, incognito: true });
        })
    };
};

