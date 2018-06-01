"use strict";

const until = require("selenium-webdriver/lib/until"),
    assert = require('assert'),
    webdriver = require('selenium-webdriver'),
    By = require("selenium-webdriver/lib/by"),
    browser = new webdriver.Builder()
    .forBrowser('chrome')
    .usingServer('http://localhost:4444/wd/hub')
    .build();

const find_search_field = "twotabsearchtextbox",
    search_string = "Batman comics",
    find_first_item = "//ul[@id='s-results-list-atf']//li[@id='result_0']",
    find_title = "//ul[@id='s-results-list-atf']//li[@id='result_0']//a[@class='a-link-normal s-access-detail-page  s-color-twister-title-link a-text-normal']",
    find_price = "//ul[@id='s-results-list-atf']//li[@id='result_0']//div[@class='a-fixed-left-grid-col a-col-right']//div[@class='a-row']//a[@class='a-link-normal a-text-normal']//span[@class='a-size-base a-color-price s-price a-text-bold']",
    find_rating = "//ul[@id='s-results-list-atf']//li[@id='result_0']//span[@class='a-declarative']//span[@class='a-icon-alt']",
    find_title_second_page = "//div[@id='centerCol']//div[@id='booksTitle']//span[@id='productTitle']",
    find_price_second_page = "//div[@id='tmmSwatches']//span[@class='a-size-base a-color-price a-color-price']";


function run() {
        browser.get('http://www.amazon.de/').then(() => {
            console.log('Open browser');
            browser.wait(until.titleContains('Amazon.de'), 10000);
        });
        console.log('Try to find ' + search_string);
        let query = browser.wait(until.elementLocated(By.By.id(find_search_field)), 10000);
        query.sendKeys(search_string);
        query.sendKeys(webdriver.Key.RETURN);

        browser.wait(until.elementLocated(By.By.xpath(find_first_item)), 10000).then(() => {
            console.log('Check that results number above 0');
        });

        let title = browser.wait(until.elementLocated(By.By.xpath(find_title)), 10000);
        let title_text = '';
        title.then(elm => {
            console.log('Check that title contains "Batman" word');
            return elm.getText().then(text => {
                //console.log('1st item title ' + text);
                assert.ok(text.includes('Batman'), 'Title doesn\'t contain "Batman" word');
                title_text = text;
            });
        });


        let price = browser.wait(until.elementLocated(By.By.xpath(find_price)), 10000);
        let price_text = '';
        price.then(elm => {
            console.log('Check that price is above 0');
            return elm.getText().then(text => {
                //console.log('price =' + text);
                let float_price = Number((text.slice(text.indexOf('EUR') + 'EUR'.length)).replace(',', '.'));
                //console.log('float  =' + typeof float_price + " " + float_price);
                if (float_price > 0)
                    console.log('Price is above 0. Test passed');
                else
                    throw new Error('Price is lower than 0. Test failed');
                console.log('Check that price contains EUR postfix');
                assert.ok(text.includes('EUR'), 'Price doesn\'t contain "EUR" postfix');
                price_text = text;
            });
        });

        let rating = browser.wait(until.elementLocated(By.By.xpath(find_rating)), 10000).then(() => {
            console.log('Check that item has rating');
        });

        title.then(elm => {
            console.log('Open 1st item page');
            elm.click();
        });

        let title_second_page_text = browser.wait(until.elementLocated(By.By.xpath(find_title_second_page)), 10000);
        title_second_page_text.then(elm => {
            //console.log('title_text='+ title_text);
            return elm.getText().then(text => {
                //console.log('title_second_page_text=' + text);
                console.log('Check that title is equal to the ones in result search');
                assert.equal(title_text, text, 'Titles of 1st item on first and second pages are not equal')
            })
        });

        let price_second_page_text = browser.wait(until.elementLocated(By.By.xpath(find_price_second_page)), 10000);
        price_second_page_text.then(elm => {
            //console.log('price_text=' + price_text);
            return elm.getText().then(text => {
                //console.log('price_second_page_text=' + text);
                console.log('Check that price is equal to the ones in result search');
                assert.equal(price_text, text, 'Prices of 1st item on first and second pages are not equal')
            })
        });
    browser.close();
}

run();