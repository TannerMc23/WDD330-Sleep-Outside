// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
 // remove an Item from localStorage
export function removeItem(key){
  localStorage.removeItem(key)
}

// Redirection to another page

export function redirectTo(path){
  window.location.href = path;
}
//getParam function to handle URLSearchParam

export function getParam(param){
  const queryString= window.location.search;
  const urlParm = new URLSearchParams(queryString);
  return urlParm.get(param);
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

// get the product id from the query string
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product
}

export function renderListWithTemplate(template, parentElement, list, position = "afterbegin", clear = false) {
  const htmlStrings = list.map(template);
  // if clear is true we need to clear out the contents of the parent.
  if (clear) {
    parentElement.innerHTML = "";
  }
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}
// Counter cart
    export const CounterCart=(list,template)=>{
     //template && list && (template.innerHTML = list.length);
      if(!list || !template) return;
      
      template.innerHTML=list.length;
    }

export function renderListWithTemplate(templateFn, parentElement,list,position, clear=false){
  if(clear){
    parentElement.innerHTML = "";
  }
}

async function loadTemplate(path) {
  const res = await fetch(path);
  const template = await res.text();
  return template;
}

export async function loadHeaderFooter() {
  const headerTemplate = await loadTemplate("../partials/header.html");
  const footerTemplate = await loadTemplate("../partials/footer.html");

  const headerElement = document.querySelector("#main-header");
  const footerElement = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplate, headerElement);
  renderWithTemplate(footerTemplate, footerElement);
}

}

// Customizing the Alert messages

export function alertMessage(message, scroll = true) {
  const main = document.querySelector('main');
  if (!main) return;

  // Create an alerte container
  const alert = document.createElement('div');
  alert.classList.add('alert'); 

  // HTML Content : texte + bouton X
  alert.innerHTML = `
    <span class="alert-text">${message}</span>
    <button class="alert-close" aria-label="Close">&times;</button>
  `;

  // Logic to close the alert
  alert.addEventListener('click', (e) => {
    if (e.target.classList.contains('alert-close')) {
      main.removeChild(alert);
    }
  });

  // Insert into the main as firt chold
  main.prepend(alert);

  // Scroll up
  if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' });
}