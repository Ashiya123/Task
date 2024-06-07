(() => {
    'use strict';
    const testInfo = {
        className: 'Alessa-test',
        debug: 0,
        testName: 'Alessa : Return Hero Copy - Watchlist & Sanction',
        testVersion: '0.0.1'
    };
    const waitForElement = (selector) => {
        return new Promise((resolve) => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            } else {
                window.DOMContentLoaded = () => {
                    return reject(document.querySelector(selector), "Target element not found.");
                };
            }
            const observer = new MutationObserver((mutations) => {
                if (document.querySelector(selector)) {
                    resolve(document.querySelector(selector));
                    observer.disconnect();
                }
            });
            observer.observe(document.documentElement, {
                childList: true,
                subtree: true
            });
        });
    };
    const loadTest = () => {
        const bodyEle = document.body;
        if (bodyEle.classList.contains(testInfo.className)) { return }
        bodyEle.classList.add(testInfo.className);
		
		
        waitForElement('body').then((e) => {
           if (!document.cookie.includes('previous_page_path') &&
				window.location.pathname === '/software-solutions/aml-compliance/sanction-watchlist-screening/') {
				document.cookie = 'previous_page_path=' + window.location.pathname + ';path=/';
			}
			if (document.querySelector("#content .main-banner-text .elementor-heading-title") && document.cookie.includes('previous_page_path=/software-solutions/aml-compliance/sanction-watchlist-screening/')) {
				document.querySelector("#content .main-banner-text .elementor-heading-title").innerText = 'Cost Effective Watchlist And PEP Screening';
				document.querySelector("#content .elementor-widget.elementor-widget-text-editor").innerText = 'Are you screening less than 5 million unique records a year for Sanctions and PEPs? You could be overpaying by as much as 50%.';
			}
			 
					});
    };
    waitForElement('body').then(() => {
        loadTest();
    });
    
})();
