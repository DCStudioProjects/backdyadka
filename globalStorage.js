const host = "aghdrezka.com";
const protocol = "http://";
const domain = protocol + host;

module.exports = {
  domain,
  headers: {
    api: {
      "Accept-Encoding": "gzip",
      Connection: "Keep-Alive",
      "Content-Length": 43,
      "Content-Type": "application/x-www-form-urlencoded; charset=utf-8",
      Host: host,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
    },
    page: {
      "Accept-Encoding": "gzip",
      Connection: "Keep-Alive",
      Cookie:
        "dle_user_token=5d7fcc999a037654876581fd584d6734; dle_user_taken=1;",
      Host: host,
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:91.0) Gecko/20100101 Firefox/91.0",
    },
  },
};
