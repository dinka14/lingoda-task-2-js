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
        return title;
    });
}

function page2() {
    return browser.findElements(webdriver.By.id('twotabsearchtextbox')).then((elem) => {
        console.log('Try to find batman comics ' + elem);
        elem[0].sendKeys('Batman comics');
        elem[0].sendKeys(webdriver.Key.RETURN);
        return elem[0];
    });
}

function page3() {
    console.log('Check that results number above 0');
    var find_first_item = browser.findElement(webdriver.By.xpath("//ul[@id='s-results-list-atf']//li[@id='result_0']"));
}

function handleFailure(err) {
    console.error('Something went wrong\n', err.stack, '\n');
    closeBrowser();
}

function checkPage1Open() {
    return browser.findElements(webdriver.By.css('[href="/ref=footer_logo"]')).then((result) => {
        console.log(result[0]);
        return result[0];
    });
}

function closeBrowser() {
    browser.close();
}

browser.get('https://www.amazon.de/');
console.log('open browser');
browser.wait(checkPage1Open, 11000).then(page1).then(page2);//.then(page3);//.then(closeBrowser, handleFailure);

