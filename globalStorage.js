const host = "livekinopoisk.com";
const protocol = "http://";
const domain = protocol + host;

module.exports = {
  domain,
  headers: {
    api: {
      Accept: "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate, br",
      "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
      Connection: "keep-alive",
      "Content-Length": 102,
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Cookie:
        "dle_user_taken=1; dle_user_token=3590c8e8b68818e64a1c54288189afb9; _ym_uid=16230045491042370027; _ym_d=1623004549; _ga=GA1.2.1857658373.1625915394; _gid=GA1.2.1836983075.1629488381; _ym_isad=1; PHPSESSID=ap1c2e8ie42id2hs3d1vtrtf41; _ym_visorc=w",
      Host: process.env.HOST || host,
      "sec-ch-ua":
        '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"',
      "sec-ch-ua-mobile": "?0",
      "Sec-Fetch-Dest": "empty",
      "Sec-Fetch-Mode": "cors",
      "Sec-Fetch-Site": "same-origin",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
      "X-Requested-With": "XMLHttpRequest",
    },
    page: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "Accept-Encoding": "gzip, deflate",
      "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      Cookie:
        "dle_user_taken=1; dle_user_token=6770af32755f0b025bdc01d9067583d9; _ym_uid=1629655021895396006; _ym_d=1629655021; PHPSESSID=c7no0mnlts226pt438hrf2fetq; _ym_visorc=b; _ym_isad=1",
      Host: process.env.HOST || host,
      Pragma: "no-cache",
      Referer: `${domain}/`,
      "Upgrade-Insecure-Requests": 1,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
    },
    search: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
      "Accept-Encoding": "gzip, deflate",
      "Accept-Language": "ru-RU,ru;q=0.9,en-US;q=0.8,en;q=0.7",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      Cookie:
        "dle_user_taken=1; PHPSESSID=qfet61ap42p25r65d4o24qakc2; dle_user_token=f1207b732e39313d029ca045c216194d; _ym_uid=1629655021895396006; _ym_d=1629655021; _ym_visorc=b; _ym_isad=1",
      Host: process.env.HOST || host,
      Pragma: "no-cache",
      Referer: `${domain}/`,
      "Upgrade-Insecure-Requests": 1,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36",
    },
  },
};
