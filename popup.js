let openLinkBtn = document.getElementById('openLink');

openLinkBtn.onclick = function (element) {
    chrome.windows.getCurrent({ populate: true}, function(window){
        const currentTab = window.tabs.find(tab => tab.active)
        chrome.windows.create({ url: currentTab.url, incognito: true });
    })
};