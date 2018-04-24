"use strict";

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
var find_title = "//ul[@id='s-results-list-atf']//li[@id='result_0']//a[@class='a-link-normal s-access-detail-page  s-color-twister-title-link a-text-normal']";


function run() {
    browser.get('http://www.amazon.de/').then(() => {
        console.log('open browser');
        browser.wait(until.titleContains('Amazon.de'), 10000);

        console.log('Try to find ' + search_string);
        var query = browser.wait(until.elementLocated(By.By.id(find_search_field)), 10000);
        query.sendKeys(search_string);

        browser.wait(until.elementLocated(By.By.xpath(find_first_item)), 10000).then(() => {
            console.log('Check that results number above 0');
        });

        var title = browser.wait(until.elementLocated(By.By.xpath(find_title)), 10000);
        title.then(elm => {
            console.log('Check that title contains "Batman" word');
            return elm.getText().then(text => {
                console.log(text);
                assert.ok(text.includes('Batman'), 'Title doesn\'t contain "Batman" word');
            });
        });


        /*
        browser.findElements(webdriver.By.xpath(find_title)).then((elem) => {
            console.log('Try to find batman title ' + elem);
            var a = elem[0].text;
            if (a.indexOf('Batman') !== -1) {
                return 1
            }
        });
        */

        /*
        var title = browser.wait(until.elementLocated(By.By.xpath(find_title)), 10000);
        console.log('title ' + title);
        var a = title.text;
        console.log(typeof a);
        //assert.equal(a.toLowerCase().includes('batman'),);
        //assert.notStrictEqual(title.toLowerCase(), 'batman');

        */
        browser.close();
    });
}

run();