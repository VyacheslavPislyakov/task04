var webdriver = require("selenium-webdriver");

var driver = new webdriver.Builder()
	.forBrowser('firefox')
	.build();


driver.manage().timeouts().implicitlyWait(2000);
// driver.manage().window().maximize(); //Firefox - тупо виснет;


function findElementAndSendText(locator, text) {
	return driver.findElement(locator).sendKeys(text);
}

function getLinkToCinema() {
	return driver.findElement(webdriver.By.linkText('Кино'));
}

function getText(locator, caption) {
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
	return getText('.b-places_header', 'Title');
}).then(() => {
	return findElementAndSendText(webdriver.By.id('search-movie-str'), 'Анаболики');
}).then(() => {
	return driver.findElement(webdriver.By.css('input[class="button big"]')).click();
}).then(() => {
	return driver.sleep(5000);
// }).then(() => {
// 	return driver.navigate().back();
}).then(() => {
	return assert.eventually.equal(Promise.resolve(driver.findElement(webdriver.By.css('a.name > span')).then(el => {
		el.getText().then(text => {
			return text;
		})
	})), Кровью и потом: Анаболики, "This had better be true, eventually");
	// return getText('a.name > span', 'Name of film - ')
}).then(() => {
	driver.quit();
})
