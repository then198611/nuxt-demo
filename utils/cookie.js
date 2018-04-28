const Cookie = {
  getCookie: (name, cookie) => {
    let cookieValue = "";
    let search = name + "=";
    if (cookie && cookie.length > 0) {
      let offset = cookie.indexOf(search);
      if (offset != -1) {
        offset += search.length;
        let end = cookie.indexOf(";", offset);
        if (end == -1) end = cookie.length;
        cookieValue = decodeURIComponent(cookie.substring(offset, end));
      }
    }
    return cookieValue;
  }
}

module.exports = Cookie