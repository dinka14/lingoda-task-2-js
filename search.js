"use strict";
var assert = require('assert');
var webdriver = require('selenium-webdriver');
var browser = new webdriver.Builder()
    .forBrowser('chrome')
    .usingServer('http://localhost:4444/wd/hub')
    .build();

function page1() {
    browser.getTitle().then((title) => {
        console.log('Current Page Title: ' + title);
        assert.equal(title.toLowerCase().indexOf("amazon.de"), 0, "Title isn't equal to amazon.de");
    });
    /*
    var elem = browser.findElement(webdriver.By.id('twotabsearchtextbox'));
    elem.sendKeys('Batman comics');
    elem.sendKeys(webdriver.Key.RETURN);
    */
}

function page2() {
    var elem = browser.findElement(webdriver.By.id('twotabsearchtextbox'));
    elem.sendKeys('Batman comics');
    elem.sendKeys(webdriver.Key.RETURN);
}

function handleFailure(err) {
    console.error('Something went wrong\n', err.stack, '\n');
    closeBrowser();
}



function checkPage1Open() {
    return browser.findElements(webdriver.By.css('[href="/ref=footer_logo"]')).then((result) => {
        return result[0];
    });
}

function closeBrowser() {
    browser.close();
}

browser.get('https://www.amazon.de/');
console.log('open browser');
browser.wait(checkPage1Open, 9000).then(page1).then(page2);//.then(closeBrowser, handleFailure);
