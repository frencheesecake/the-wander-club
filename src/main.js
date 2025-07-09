function includeHTML() {
  const elements = document.querySelectorAll('[data-include]');
  elements.forEach(el => {
    const file = el.getAttribute('data-include');
    fetch(file)
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch ${file}");
        return res.text();
      })
      .then(data => {
        el.innerHTML = data;
      })
      .catch(err => {
        el.innerHTML = "<p>Component not found.</p>";
        console.error(err);
      });
  });
}
document.addEventListener('DOMContentLoaded', includeHTML);

// Show mobile-left div on mobile
function handleResize() {
  const mobileLeft = document.querySelector('.mobile-left');
  if (window.innerWidth <= 1040) {
    mobileLeft.style.display = 'flex';
  } else {
    mobileLeft.style.display = 'none';
  }
}

window.addEventListener('resize', handleResize);
window.addEventListener('load', handleResize);


document.addEventListener("DOMContentLoaded", function() {
  // Dropdown menu for desktop
  const itemsData = [
    {
        "image_file": "mexico.png",
        "title": "Mexico",
        "token_count": 230
    },
    {
        "image_file": "mexico.png",
        "title": "Thailand",
        "token_count": 60
    },
    {
        "image_file": "mexico.png",
        "title": "Italy",
        "token_count": 45
    }
  ];

  function renderGrid(items) {
    const gridContainer = document.getElementById('menuBody');

    items.forEach(item => {
        const gridItem = document.createElement('div');
        gridItem.classList.add('grid-item');
        
        gridItem.innerHTML = `
          <a href="#">
            <img src="../public/menu-tokens/${item.image_file}" alt="${item.image_file}">
            <span class="item-info">
              <span class="item__title">${item.title}</span>
              <span class="item__description">${item.token_count} Tokens</span>
            </span>
          </a>
        `;
        
        gridContainer.appendChild(gridItem);
    });
  }

  // Call function to render grid
  renderGrid(itemsData);
});