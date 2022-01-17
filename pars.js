const puppeteer = require("puppeteer");

(async () => {
  //Запуск браузера сделан под деплоер!!!

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage(); //новая вкладка
  await page.goto(`https://voidboost.net/embed/306084?s=1&e=1&h=voidboost.net`);

  //await page.waitForSelector("Селектор последнего DOM-элемента");
  await page.mouse.click(400, 300); //в моём случае нужен был клик
  const res = await page.waitForResponse((response) =>
    response.url().includes("m3u8")
  );
  const url = await res.url(); //вынимаем ссылку
  console.log(url); //здесь я отправлял результат в API, можно сделать любой вывод
  await browser.close(); //закрываем браузер
})();
