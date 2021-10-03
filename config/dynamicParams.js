const { domain, host } = require("./globalStorage");

exports.tileHeader = (slug) => {
  return {
    Accept: "*/*",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    Cookie:
      "PHPSESSID=2cke9m2g80rb24mjeb4ik714c6; dle_user_taken=1; dle_user_token=3b9ed4236fb8d1346f785490136847bc; rzk_theme=day",
    Host: host,
    Pragma: "no-cache",
    Referer: `${domain}${slug}.html`,
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
  };
};

exports.ajaxHeader = (length, slug) => {
  return {
    Accept: "*/*",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Content-Length": length,
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Cookie:
      "PHPSESSID=2cke9m2g80rb24mjeb4ik714c6; dle_user_taken=1; dle_user_token=3b9ed4236fb8d1346f785490136847bc; rzk_theme=day",
    Host: host,
    Origin: domain,
    Pragma: "no-cache",
    Referer: `${domain}${slug}.html`,
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
    "X-Requested-With": "XMLHttpRequest",
  };
};
exports.apiHeader = (length, slug) => {
  return {
    Accept: "application/json, text/javascript, */*; q=0.01",
    "Accept-Encoding": "gzip, deflate",
    "Accept-Language": "ru-RU,ru;q=0.8,en-US;q=0.5,en;q=0.3",
    "Cache-Control": "no-cache",
    Connection: "keep-alive",
    "Content-Length": length,
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
    Cookie:
      "PHPSESSID=2cke9m2g80rb24mjeb4ik714c6; dle_user_taken=1; dle_user_token=3b9ed4236fb8d1346f785490136847bc; rzk_theme=day",
    Host: host,
    Origin: domain,
    Pragma: "no-cache",
    Referer: `${domain}${slug}.html`,
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
    "X-Requested-With": "XMLHttpRequest",
  };
};
