async function includeHTML() {
  const elements = document.querySelectorAll('[data-include]');
  
  for (const el of elements) {
    const file = el.getAttribute('data-include');
    
    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`Failed to fetch ${file}`);
      
      const data = await res.text();
      el.innerHTML = data;
    } catch (err) {
      el.innerHTML = "<p>Component not found. Please try again later.</p>";
      console.error(err);
    }
  }

  // Sample data for menu items
  const res = await fetch('../public/menu-tokens.json');
  if (!res.ok) {
    console.error('Failed to fetch menu items');
    return;
  }
  const itemsData = await res.json();
  // Function to render grid items
  function renderGrid(items) {
    const gridContainer = document.getElementById('menuGrid');

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

  const tokensNavItem = document.getElementById('tokensNavItem');
const dropdown = document.getElementById('tokensDropdown');

if (tokensNavItem && dropdown) {
  let hideTimeout;

  const show = () => {
    clearTimeout(hideTimeout);
    dropdown.classList.add('show');
  };

  const hide = () => {
    hideTimeout = setTimeout(() => {
      if (
        !tokensNavItem.matches(':hover') &&
        !dropdown.matches(':hover')
      ) {
        dropdown.classList.remove('show');
      }
    }, 100);
  };

  tokensNavItem.addEventListener('mouseenter', show);
  tokensNavItem.addEventListener('mouseleave', hide);
  dropdown.addEventListener('mouseenter', show);
  dropdown.addEventListener('mouseleave', hide);
}
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


