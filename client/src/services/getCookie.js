function getCookie(name) {
  const cookieName = `${name}=`;
  const cookies = document.cookie.split(";");

  for (let cookie of cookies) {
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }

  // Return null if the cookie is not found
  return null;
}

module.exports = getCookie;
