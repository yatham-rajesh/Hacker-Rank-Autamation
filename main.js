const url = "https://www.hackerrank.com/auth/login";
const puppeteer = require("puppeteer");
const ansArray = require("./codes.js");
let email = "yiyek46523@wowcg.com";
let password = "Rajesh@1432";
let cpage;

//headless :false it will be used for opening a page

const borwserOpenpormise = puppeteer.launch({
  headless: false
  ,
  args: ['--start-maximized']
  , defaultViewport: null
})
borwserOpenpormise.then(function (browser) {//opens a new page
  let pagesOpened = browser.pages();
  return pagesOpened;
}).then(function (pagesOpened) {//selected tab/page 1
  cpage = pagesOpened[0];
  //we use goto for opening url
  let gotoPromise = cpage.goto(url);
  return gotoPromise;
}).then(function () {
  //now we need to enter dummy credentials
  //type==> we can type in selcted selctor 
  //we can add delay
  let emailEntered = cpage.type("Input[type='text']", email, { delay: 50 });
  return emailEntered;
}).then(function () {
  //enterng password
  let passwordEntered = cpage.type("Input[type='password']", password, { delay: 50 });
  return passwordEntered;
}).then(function () {
  //using click we are loging in using credentials
  let loginClicked = cpage.click("button[type='submit']");
  return loginClicked;
}).then(function () {//we are usingn waitigg promise
  let elementWait = cpage.waitForSelector("div[data-automation='algorithms']", { visible: true });
  return elementWait;
}).then(function () {
  let algorithmsSection = cpage.click("div[data-automation='algorithms']");
  return algorithmsSection;
}).then(function () {
  //wait and click funtion will wait until selector is found and it will click
  let warmupSelected = waitAndClick('input[value="warmup"]', cpage);
  return warmupSelected;
}).then(function () {
  let wiatfor3sec = cpage.waitFor(3000);
  return wiatfor3sec;
}).then(function(){

}).then(function () {
    let quetionArray = cpage.$$('button[class="ui-btn ui-btn-normal primary-cta ui-btn-line-primary ui-btn-styled"]');
    return quetionArray;
  }).then(function (quetionArray) {
    questionSolver(cpage, quetionArray[0], ansArray.answer[0]);
    return questionSolver;
  })
  





function waitAndClick(selector, cpage) {
  return new Promise(function (resolve, reject) {
    let waitForSelector = cpage.waitForSelector(selector, { visibility: true })
    waitForSelector.then(function () {
      let clickedOnPaage = cpage.click(selector,{delay:100});
      return clickedOnPaage;
    }).then(function () {
      resolve();
    }).then(function () {
      reject();
    })

  })
}
function questionSolver(page, question, answer) {
  return new Promise(function (resolve, reject) {
    let questionWillbeClickedPromise = question.click();
    questionWillbeClickedPromise
      .then(function () {
        let waitForEditor = waitAndClick(
          ".monaco-editor.no-user-select.vs",
          page
        );
        return waitForEditor;
      })
      .then(function () {
        let customInputClicked = waitAndClick(".checkbox-input", page);
        return customInputClicked;
      })
      .then(function () {
        return waitAndClick(".input.text-area.custominput.auto-width", page);
      })
      .then(function () {
        return page.type(".input.text-area.custominput.auto-width", answer, {
          delay: 20,
        });
      })
      .then(function () {
        let ctrlIsPressedPromise = page.keyboard.down("Control");
        return ctrlIsPressedPromise;
      })
      .then(function () {
        let AisPressedPromise = page.keyboard.press("A", { delay: 100 });
        return AisPressedPromise;
      })
      .then(function () {
        let XisPressedPromise = page.keyboard.press("X", { delay: 100 });
        return XisPressedPromise;
      })
      .then(function () {
        let ctrlIsReleasedPromise = page.keyboard.up("Control");
        return ctrlIsReleasedPromise;
      })
      .then(function () {
        let waitForCodeAreaPromise = waitAndClick(
          ".monaco-editor.no-user-select.vs",
          page
        );
        return waitForCodeAreaPromise;
      })
      .then(function () {
        let ctrlIsPressedPromise = page.keyboard.down("Control");
        return ctrlIsPressedPromise;
      })
      .then(function () {
        let AisPressedPromise = page.keyboard.press("A", { delay: 100 });
        return AisPressedPromise;
      }).then(function () {
        let XisPressedPromise = page.keyboard.press("V", { delay: 100 });
        return XisPressedPromise;
      }) .then(function () {
        let ctrlIsReleasedPromise = page.keyboard.up("Control");
        return ctrlIsReleasedPromise;
      }).then(function(){
        let runButtonClicked = page.click(' .hr-monaco__run-code' , {delay : 50})
        return runButtonClicked
      }).then(function(){
        resolve()
      }).catch(function(err){
         console.log(err)
      });
  });}