/**
 * NoahV i18n
 * 
 * Copyright (c) 2019 Baidu, Inc. All Rights Reserved.
 *
 * @file i18n tools
 * @author darren(darrenywyu@gmail.com)
 */
import VueI18n from 'vue-i18n';
import cookie from 'js-cookie';

let noahvI18n = {};

const install = (Vue, conf) => {
    Vue.use(VueI18n);

    Vue.locale = () => {};

    // Get locale
    noahvI18n.getLocale = function () {
        let localeCookie = cookie.get(conf.cookieName);
        if (localeCookie) {
            return localeCookie;
        }
        if (conf.baseNavigator) {
            let locales = Object.keys(conf.messages);
            let browserLocale = window.navigator.language || window.navigator.browserLanguage;
            if (locales.indexOf(browserLocale.split('-')[0]) > -1) {
                return browserLocale;
            }
        }
        return conf.defaultLocale;
    };

    // Create VueI18n instance with options
    noahvI18n.i18n = new VueI18n({
        locale: noahvI18n.getLocale(),
        fallbackLocale: conf.defaultLocale,
        messages: conf.messages
    });

    // Set locale
    noahvI18n.setLocale = function(lang) {
        if (!lang) {
            return;
        }
        noahvI18n.i18n.locale = lang;
    };


    // watch locale
    noahvI18n.i18n._vm.$watch(function() {
        return this.locale
    }, function(newVal, oldVal) {
        cookie.set(conf.cookieName, newVal);
    });
    
    Vue.$noahvI18n = noahvI18n;
    Vue.prototype.$noahvI18n = noahvI18n;

};

export default {noahvI18n, install};
