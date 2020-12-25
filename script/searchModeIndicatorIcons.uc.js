(function () {
    const searchModeIndicatorFocused = document.getElementById("urlbar-search-mode-indicator-title");
    const urlbar = document.getElementById("urlbar");
    const identityIcon = document.getElementById("identity-icon");
    const options = {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["actiontype", "searchmode", "actionoverride"],
    };
    const observer = new MutationObserver(searchModeCallback);

    function searchModeCallback(mutationsList, observer) {
        for (let mutation of mutationsList) {
            switch (searchModeIndicatorFocused.textContent) {
                case "Google":
                    identityIcon.className = "googleIndicator";
                    break;
                case "Google Images":
                    identityIcon.className = "googleImagesIndicator";
                    break;
                case "Google Videos":
                    identityIcon.className = "googleVideosIndicator";
                    break;
                case "Google Shopping":
                    identityIcon.className = "googleShoppingIndicator";
                    break;
                case "Gmail":
                    identityIcon.className = "gmailIndicator";
                    break;
                case "Google Drive":
                    identityIcon.className = "googleDriveIndicator";
                    break;
                case "Google Maps":
                    identityIcon.className = "googleMapsIndicator";
                    break;
                case "Netflix":
                    identityIcon.className = "netflixIndicator";
                    break;
                case "YouTube":
                    identityIcon.className = "youtubeIndicator";
                    break;
                case "DoorDash":
                    identityIcon.className = "doorDashIndicator";
                    break;
                case "Amazon":
                    identityIcon.className = "amazonIndicator";
                    break;
                case "Prime Now":
                    identityIcon.className = "primeNowIndicator";
                    break;
                case "Wikipedia":
                    identityIcon.className = "wikipediaIndicator";
                    break;
                case "GitHub":
                    identityIcon.className = "gitHubIndicator";
                    break;
                case "XVIDEOS":
                    identityIcon.className = "xVideosIndicator";
                    break;
                case "Scryfall":
                    identityIcon.className = "scryIndicator";
                    break;
                case "Gatherer":
                    identityIcon.className = "mtgIndicator";
                    break;
                case "Bookmarks":
                    identityIcon.className = "bookmarksIndicator";
                    break;
                case "History":
                    identityIcon.className = "historyIndicator";
                    break;
                case "Tabs":
                    identityIcon.className = "tabsIndicator";
                    break;
                case "Twitter":
                    identityIcon.className = "twitterIndicator";
                    break;
                case "Instagram":
                    identityIcon.className = "instagramIndicator";
                    break;
                default:
                    if (urlbar.getAttribute("actiontype") == "switchtab" && urlbar.getAttribute("actionoverride") != "true") {
                        identityIcon.className = "tabsIndicator";
                    } else {
                        identityIcon.className = "otherIndicator";
                    }
            }
        }
    }

    observer.observe(urlbar, options);
})();
