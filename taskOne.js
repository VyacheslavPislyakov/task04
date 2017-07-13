var webdriver = require("selenium-webdriver");
var chai = require('chai');
var assert = chai.assert;

var driver = new webdriver.Builder()
	.forBrowser('chrome')
	.build();


driver.manage().timeouts().implicitlyWait(2000);
// driver.manage().window().maximize(); //Firefox - тупо виснет;


function findElementAndSendText(locator, text) {
	return driver.findElement(locator).sendKeys(text);
}

function getLinkToCinema() {
	return driver.findElement(webdriver.By.linkText('Кино'));
}

function getTxt(locator, caption) {
	driver.findElement(webdriver.By.css(locator)).then(el => {
		el.getText().then(text => {
			console.log(caption + ' - ' + text);
		});
	});
}

function clickURL(currentLink) {
	currentLink.click();
}

driver.get('https://www.tut.by/').then(() => {
	return findElementAndSendText(webdriver.By.name('str'), 'афиша');
}).then(() => {
	return driver.findElement(webdriver.By.css('input[name=search]')).click();
}).then(() => {
	return driver.wait(getLinkToCinema, 5000);
}).then((currentLink) => {
	return clickURL(currentLink);
}).then(() => {
	return getTxt('.b-places_header', 'Title');
}).then(() => {
	return findElementAndSendText(webdriver.By.id('search-movie-str'), 'Анаболики');
}).then(() => {
	return driver.findElement(webdriver.By.css('input[class="button big"]')).click();
}).then(() => {
	return driver.findElement(webdriver.By.xpath('//*[@id="online-cinema"]/div/ul/li/a[2]/span')).getText();
}).then((txt) => {
	assert.equal(txt, 'Кровью и потом: Анаболики', 'Haven\'t element');
}).then(() => {
	driver.quit();
})
