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