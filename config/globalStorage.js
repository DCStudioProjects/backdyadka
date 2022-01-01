const host = "kinopub.me";
const protocol = "https://";
const domain = protocol + host;

module.exports = {
  domain,
  host,
  headers: {
    api: {
      Accept: "application/json, text/javascript, */*; q=0.01",
      "Accept-Encoding": "gzip, deflate",
      "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "Content-Length": 102,
      "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      Host: host,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
    },
    page: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Encoding": "gzip, deflate",
      "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      Cookie:
        "PHPSESSID=2cke9m2g80rb24mjeb4ik714c6; dle_user_taken=1; dle_user_token=3b9ed4236fb8d1346f785490136847bc; rzk_theme=day",
      Host: host,
      Pragma: "no-cache",
      Referer: `${domain}/`,
      "Upgrade-Insecure-Requests": 1,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
    },

    index: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Encoding": "gzip, deflate",
      "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      Cookie:
        "PHPSESSID=2cke9m2g80rb24mjeb4ik714c6; dle_user_taken=1; dle_user_token=3b9ed4236fb8d1346f785490136847bc; rzk_theme=day",
      Host: host,
      Pragma: "no-cache",
      "Upgrade-Insecure-Requests": 1,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
    },

    prefetch: {
      Accept: "*/*",
      "Accept-Encoding": "gzip, deflate",
      "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      Cookie:
        "PHPSESSID=2cke9m2g80rb24mjeb4ik714c6; dle_user_taken=1; dle_user_token=3b9ed4236fb8d1346f785490136847bc; rzk_theme=day",
      Host: host,
      Pragma: "no-cache",
      Referer: `${domain}/`,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
      "X-Moz": "prefetch",
    },
  },
};
