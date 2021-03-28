import 'babel-polyfill';

import { Builder, By, until, WebElement } from 'selenium-webdriver';
import moment from 'moment';

const fiveThirtyMatch = /5:30pm/;
const sevenThirtyMatch = /7:30pm/;

async function GetAvailableButtonForMatch(
  buttons: WebElement[],
  match: RegExp,
): Promise<WebElement | null> {
  const validButtons = await Promise.all(
    buttons.map(async (button) => {
      const text = await button.getText();

      const matches = text.match(match);

      if (!matches || matches.length === 0) {
        return null;
      }

      return button;
    }),
  );

  const button = validButtons.find((item) => Boolean(item));

  if (!button) {
    console.log('Could not find a button for 5:30.');
    return null;
  }

  console.log('Found button for tomorrow');

  const parent = await button.findElement(By.xpath('./..'));
  const title = await parent.getAttribute('title');
  if (title === 'UnAvailable') {
    console.log('Button is unavailable for tomorrow.');
    return null;
  }

  console.log('Button is available for tomorrow.');
  return parent;
}

(async function example() {
  const driver = await new Builder().forBrowser('firefox').build();

  try {
    // STEP 1: Login
    await driver.get(
      'https://web1.myvscloud.com/wbwsc/ohdublinwt.wsc/splash.html',
    );

    // click on the login link
    const loginLink = await driver.findElement(By.className('login-link'));
    await loginLink.click();

    // wait until the popup form is located
    await driver.wait(until.elementLocated(By.id('weblogin')), 10000);

    const usernameField = await driver.findElement(By.id('weblogin_username'));
    const passwordField = await driver.findElement(By.id('weblogin_password'));

    await usernameField.sendKeys('6147180188');
    await passwordField.sendKeys('Harder');

    const loginButton = await driver.findElement(By.id('weblogin_buttonlogin'));
    await loginButton.click();

    // STEP 2: Go To Calendar
    await driver.get(
      'https://web1.myvscloud.com/wbwsc/ohdublinwt.wsc/search.html?SessionID=&display=Calendar&module=Activity&primarycode=fitness',
    );

    const nextDay = moment().add(1, 'days').date();
    const cells = await driver.findElements(By.className('calinner'));

    // TODO make sure only if selectable
    const availableCells = await Promise.all(
      cells.map(async (cell) => {
        let header;

        try {
          header = await cell.findElement(By.className('ui-widget-header'));
        } catch (error) {
          return null;
        }

        if (!header) {
          return null;
        }

        const text = await header.getText();

        // check if it's the next day
        // example: '4' === '4'
        if (`${nextDay}` !== text) {
          return null;
        }

        console.log('Found a match for tomorrow');
        const buttons = await cell.findElements(By.className('ui-button-text'));

        let availableButton = await GetAvailableButtonForMatch(
          buttons,
          fiveThirtyMatch,
        );

        if (!availableButton) {
          console.log('Count not get 5:30 time. Trying 7:30');
          availableButton = await GetAvailableButtonForMatch(
            buttons,
            sevenThirtyMatch,
          );
        }

        if (!availableButton) {
          console.log('Count not get an available time.');
          return null;
        }

        // get the wrapping a tag
        await availableButton.click();
        return true;
      }),
    );

    const didSelect = availableCells.find((item) => item);

    if (!didSelect) {
      return;
    }

    await driver.wait(
      until.elementLocated(By.id('websearch_multiselect_group')),
      10000,
    );

    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });

    const addToCart = await driver.findElement(
      By.className('websearch_multiselect_buttonaddtocart'),
    );

    await addToCart.click();

    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });

    const memberContainers = await driver.findElements(
      By.className('webaddtocartmatrix__membergroup'),
    );

    console.log('Containers: ', memberContainers.length);
    await Promise.all(
      memberContainers.map(async (memberContainer) => {
        const header = await memberContainer.findElement(
          By.className('ui-widget-header'),
        );

        const text = await header.getText();
        console.log('Header Text: ', text);

        if (
          ![
            'Brent Harder',
            'Nicholas Harder',
            'Susan Harder',
            'Mitchell Harder',
          ].includes(text)
        ) {
          return null;
        }

        const checkbox = await memberContainer.findElement(
          By.className('checkbox'),
        );

        const selected = await checkbox.isSelected();
        if (!selected) {
          console.log('Selecting: ', text);
          await checkbox.click();
        }
      }),
    );

    console.log('Waiting after selecting users.');
    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });

    const submitButton = await driver.findElement(By.name('button201'));

    await submitButton.click();

    await new Promise((resolve) => {
      setTimeout(resolve, 5000);
    });

    for (let i = 0; i < 4; i += 1) {
      const agreeButton = await driver.findElement(
        By.id('processingprompts_waivercheckbox'),
      );
      agreeButton.click();

      const oneClickFinish = await driver.findElement(
        By.id('processingprompts_buttononeclicktofinish'),
      );

      oneClickFinish.click();
    }
  } finally {
    await driver.quit();
  }
})();
