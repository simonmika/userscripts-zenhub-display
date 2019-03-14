// ==UserScript==
// @name         ZenHub Board Display Mode
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       smika
// @match        https://app.zenhub.com/workspaces/*/boards?repos=*
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
	'use strict';

	// remove borders and menus once
	succeedOnce(() => { document.querySelector('div.zhc-sidebar').remove() })
	succeedOnce(() => { document.querySelector('div.zhc-pipeline.zhc-pipeline--add-placeholder').remove() })
	succeedOnce(() => { document.querySelector('div.zhc-board__menu').remove() })
	succeedOnce(() => { document.querySelector('div.zhc-topbar').remove() })
	// change cards regularly
	let timerId = setInterval(() => {
		// width: 100%;
		document.querySelector('div.zh-workspace__container.zhu-flex--column > div > div').style['max-width'] = '100vw'
		document.querySelectorAll('div.zhc-pipelines > div > div').forEach(element => { element.style = 'flex-grow: 1' })
		document.querySelectorAll('div.zhc-pipeline-body > div').forEach(element => { element.style.width = '100%' })
		document.querySelectorAll('div.zhc-pipeline-body > div > div').forEach(element => { element.style.width = '100%' })
		document.querySelectorAll('div.zhc-pipeline-body > div > div > div').forEach(element => { element.style.width = '100%'; element.style['max-width'] = 'none' })
		document.querySelectorAll('div.zhc-pipeline-body > div > div > div > div').forEach(element => { element.style.width = '100%' })
		document.querySelectorAll('div.zhc-pipeline-body > div > div > div > div > div').forEach(element => { element.style['max-width'] = 'none' })
		// remove filter by epic button
		document.querySelectorAll('div.zhc-issue-card__epic-filter').forEach(element => { element.remove() })
		// move estimate badge
		document.querySelectorAll('span.zhc-badge.zhc-badge--estimate').forEach(element => { element.style.position = "absolute"; element.style.right = "1em"; element.style.top = "1.5em" })

	}, 2000)
})();

function succeedOnce(apply) {
	let timerId = setInterval(() => {
		apply()
		clearInterval(timerId)
	}, 2000)
}