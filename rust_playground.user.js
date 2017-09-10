// ==UserScript==
// @name         Rust Playground URL sharing
// @namespace    https://github.com/Noskcaj19/Rust-Playground-URL-Sharing
// @version      0.1
// @description  Export code in URL from Rust Playground
// @author       Noskcaj
// @match        *://play.rust-lang.org/*
// @updateURL    https://cdn.rawgit.com/Noskcaj19/Rust-Playground-URL-Sharing/master/rust_playground.user.js
// ==/UserScript==

// Thanks MDN
function fixedEncodeURIComponent(str) {
    return encodeURIComponent(str).replace(/[!'()*]/g, function(c) {
        return '%' + c.charCodeAt(0).toString(16);
    }).replace(/%20/g, "+");
}

function addCodeParam(code) {
    // Removing existing code component
    var search = window.location.search.replace(/^\?/, '').replace(/&?code=.*?(?=&|$)/g, '');
    var newSearch = "?";
    if (search === "") {
        newSearch += "code=" + code;
    } else {
        var key = /&$/.test(search) ? "code=" : "&code=";
        newSearch += search + key + code;
    }
    window.history.pushState('obj', '', newSearch);
}

(function() {
    'use strict';
    var shareGroup = document.getElementsByClassName("header-set__buttons")[2];
    var legend = document.createElement("legend");
    legend.className = "header-set__title";
    legend.innerText = "Sharing";
    shareGroup.appendChild(legend);

    var urlButton = document.createElement("button");
    urlButton.className = "header-set__btn";
    urlButton.innerText = "URL";
    shareGroup.appendChild(urlButton);

    urlButton.onclick = function save() {
        var code = JSON.parse(localStorage.getItem('redux')).code;
        var urlEncoded = fixedEncodeURIComponent(code);
        addCodeParam(urlEncoded);
    };
})();