export const decodeHtmlEntities = (html) => {
  var doc = new DOMParser().parseFromString(html, "text/html");
  return doc.documentElement.textContent;
};
