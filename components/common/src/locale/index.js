import Vue from 'vue';

import defaultLang from './zh-CN';

const lang = defaultLang;

function i18nTrans() {
	const vuei18n = Object.getPrototypeOf(this || Vue).$t;
	if (typeof vuei18n === 'function') {
		return vuei18n.apply(this, arguments);
	}
}

let t = function(path, args) {
	let value = i18nTrans.apply(this, arguments);
	if (value !== null && value !== undefined) {
		return value;
	}

	let pathList = path.split('.');
	let target = lang;
	while (pathList.length > 0) {
		let key = pathList.shift();
		if (target && target[key]) {
			target = target[key];
		}
		else {
			target = path;
			break;
		}
	}

	if (/\{.*?\}/g.test(target)) {
        let matches = target.match(/\{.*?\}/g);
        matches.forEach( item => {
            let key = item.substring(1, item.length - 1);
            if (args && args[key] !== 'undefined' && args[key] !== '') {
                target = target.replace(item, args[key]);
            }
        });
    }

	return target;
};

export {t};

