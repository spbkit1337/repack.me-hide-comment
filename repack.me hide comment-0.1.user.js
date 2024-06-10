// ==UserScript==
// @name         repack.me hide comment
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Скрывает комментарии пользователей xtwiker и frostbitten на repack.me
// @author       Maxim
// @match        https://repack.me/*
// @icon         https://digiseller.ru/preview/1181478/p1_3763567_4470a5a8.png
// @run-at       document-idle
// @grant        none
// ==/UserScript==

var enabled = localStorage.xtwikerBlockerEnabled || "true";
//массив пользователей
var usersToBlock = ["xtwiker", "frostbitten"];

// Функция для блура комментариев
function blurComments() {
    var comments = document.querySelectorAll('.comments-tree-item');
    comments.forEach(function(comment) {
        var username = comment.querySelector('.direct-chat-name a').textContent.trim();
        if (usersToBlock.includes(username)) {
            comment.style.filter = "blur(5px)"
            comment.style.pointerEvents = "none"
            comment.style.userSelect = "none"
        } else {
            comment.style.filter = ""
            comment.style.pointerEvents = ""
            comment.style.userSelect = ""
        }
    });

    // Блок последних комментариев слева
    var lastComments = document.querySelectorAll("div.panel-body > div.panel.panel-default");
    lastComments.forEach(function(comment) {
        var username = comment.querySelector("div.panel-body > div > div > img").getAttribute("alt");
        if (usersToBlock.includes(username)) {
            if (enabled == "true") {
                comment.style.filter = "blur(5px)"
                comment.style.pointerEvents = "none"
                comment.style.userSelect = "none"
            } else if (enabled == "false") {
                comment.style.filter = ""
                comment.style.pointerEvents = ""
                comment.style.userSelect = ""
            }
        }
    });

}

// Вызов функции для блура комментариев
blurComments();

// Скрываем комментарии . Таймер
setInterval(blurComments, 100);

// Скрываем комментарии при добавлении новых
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if (mutation.type === 'childList') {
            blurComments();
        }
    });
});

var commentsContainer = document.querySelector('.comments-tree');
observer.observe(commentsContainer, { childList: true });
