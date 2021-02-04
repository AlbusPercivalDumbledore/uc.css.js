// ==UserScript==
// @name           tabAnimation.uc.js
// @namespace      https://github.com/aminomancer/uc.css.js/tabAnimation.uc.js
// @author         aminomancer
// @version        1.0
// @homepage       https://github.com/aminomancer/uc.css.js
// @description    A tiny script to clean up transitions/animations on Firefox tabs' close buttons, favicons, etc. By default, when Firefox's tab bar fills up enough, it starts hiding the tab close buttons. Then, it only shows the close button for the currently selected tab. This means you have to load a tab to close it. If you're like me and regularly have 250 tabs open, then chances are pretty high that 90% or more of your tabs are unloaded at any given time. (I use more CSS rules to make the unloaded tabs look faded out a bit, so I can tell which ones are unloaded) My stylesheet makes a tab's close button visible when you hover it, whether the tab is selected or not. It hides the close button if the tab isn't being hovered or dragged too, even if it's selected. This leaves more room for text and lets you further reduce the min-width of the tabs. To make even more room, I decided that we don't need to leave permanent space for the close button, favicon, and throbber. You never need to display all 3 at the same time. So my stylesheet puts them all in the same exact spot. In the idle/neutral state, the favicon displays. If the tab starts loading, the favicon disappears and the throbber appears. Likewise, if the tab is hovered, the favicon disappears and the close button appears. Or if the tab is loading when it's hovered, the favicon is already gone, so the throbber disappears and the close button appears. Anyway I've been using that setup for a long time but recently decided it'd look cool to add an animation. So now instead of simply disappearing/appearing, these buttons/icons have nice transitions where they shrink, fade in opacity, and move out of the way all at once. This looks nice but there's a lot going on in Firefox's built-in tab bar. It's easy to do these kinds of animations if you use tree style tabs, because it's a very simplified interface that doesn't flex. With the flexing and drag-and-drop behavior, animations can get a little dicey. This script is basically used to protect against that. It prevents animations from triggering in the infinitessimal point in time between the drag-and-drop release event, the movement of the tab in the DOM tree, and the consequent registration of the :hover pseudoclass. It's silly but necessary. I think it's because there's an unfathomably tiny amount of time where your mouse cursor is over the tab but the tab doesn't technically exist yet from CSS's point of view because it's being moved in the DOM. This is a crazy fraction of a millisecond but it's enough to cause a transition to start and therefore cause a jitter. So we need to disable the animation entirely during this tiny interval. We can't specify timeouts that short unfortunately but it's unlikely that you're able to move your cursor out of the way of the tab in less than a millisecond anyway. Anyway, this requires a lot of CSS and if you want to use it without my full stylesheet you'll have to do a search of the stylesheets for rules that reference .tabbrowser-tab, #tabbrowser-tabs, .tab-close-button, .tab-icon-image, .tab-icon-overlay, .tab-sharing-icon-overlay, .tab-throbber, and really anything that relates to tabs if you don't want to have to do the work of tweaking the appearance yourself. If you wanna use this for your own tab animations, the basic principle is that we add an attribute justmoved="true" when we start moving a tab, and we remove it when we finish moving the tab. BUT we don't remove it immediately, because the execution of the internal drag animation function isn't instantaneous. We set a really short timeout to remove it right at the perfect moment. Otherwise, there'd be no point in using this, you could just use #tabbrowser-tabs[movingtab] instead. The whole point of this is that you can use .tabbrowser-tab:hover:not([justmoved]) to add animations that only apply when it's safe to apply them.
// ==/UserScript==

(() => {
    function init() {
        const observer = new MutationObserver(tabMoveListener);
        function tabMoveListener(rec) {
            for (let mu of rec)
                mu.target.getAttribute("movingtab")
                    ? gBrowser.selectedTab.setAttribute("justmoved", "true")
                    : setTimeout(gBrowser.selectedTab.removeAttribute("justmoved"), 1);
        }

        observer.observe(gBrowser.tabContainer, {
            attributeFilter: ["movingtab"],
        });
    }

    if (gBrowserInit.delayedStartupFinished) {
        init();
    } else {
        let delayedListener = (subject, topic) => {
            if (topic == "browser-delayed-startup-finished" && subject == window) {
                Services.obs.removeObserver(delayedListener, topic);
                init();
            }
        };
        Services.obs.addObserver(delayedListener, "browser-delayed-startup-finished");
    }
})();
