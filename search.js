"use strict";
var assert = require('assert');
var webdriver = require('selenium-webdriver');
var browser = new webdriver.Builder()
    .forBrowser('chrome')
    .usingServer('http://localhost:4444/wd/hub')
    .build();

function logTitle() {
    browser.getTitle().then((title) => {
        console.log('Current Page Title: ' + title);
        assert.equal(title.toLowerCase().indexOf("amazon.de"), 0, "Title isn't equal to amazon.de");
    });
}

function handleFailure(err) {
    console.error('Something went wrong\n', err.stack, '\n');
    closeBrowser();
}

function checkPageOpen() {
    return browser.findElements(webdriver.By.css('[href="/ref=footer_logo"]')).then((result) => {
        return result[0];
    });
}

function closeBrowser() {
    browser.quit();
}

browser.get('https://www.amazon.de/');
console.log('open browser');
browser.wait(checkPageOpen, 5000).then(logTitle).then(closeBrowser, handleFailure);
