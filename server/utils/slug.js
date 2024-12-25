function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function createSlug(s) {
  let now = Date.now();
  return s
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-")
    .concat(`-${now + getRandomInt(100)}`);
}

module.exports = { createSlug };
