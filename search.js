"use strict";

require('./waitReady.js');
var assert = require('assert');
var webdriver = require('selenium-webdriver');
const until = require("selenium-webdriver/lib/until");
var By = require("selenium-webdriver/lib/by");
var browser = new webdriver.Builder()
    .forBrowser('chrome')
    .usingServer('http://localhost:4444/wd/hub')
    .build();

var find_search_field = "twotabsearchtextbox";
var search_string = "Batman comics\n";
var find_first_item = "//ul[@id='s-results-list-atf']//li[@id='result_0']";

function run() {
    browser.get('http://www.amazon.de/').then(() => {
        console.log('open browser');
        browser.wait(until.titleContains('Amazon.de'), 10000);
        var query = browser.wait(until.elementLocated(By.By.id(find_search_field)), 10000);
        query.sendKeys(search_string);
        console.log('Try to find' + search_string);
        browser.wait(until.elementLocated(By.By.xpath(find_first_item)), 10000);
        browser.close();
    });
}

run();