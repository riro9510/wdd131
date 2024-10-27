function createNavbar() {
    const header = document.createElement('header');
    const title = document.createElement('h1');
    title.textContent = 'Easy Access Guide';
    header.appendChild(title); 
    const button = document.createElement('button');
    button.id = 'hamburger';
    button.className = 'hamburger';
    button.setAttribute('aria-label', 'Toggle menu');
    button.innerHTML = '☰';

    const nav = document.createElement('nav');
    nav.className = 'nav';

    const ul = document.createElement('ul');

    // Define the menu items
    const menuItems = [
        { name: 'Home', link: 'index.html' },
        { name: 'Best Practices', link: 'practices.html' },
        { name: 'Resources', link: 'resources.html' },
        { name: 'Contact us', link: 'form.html' },
    ];

    // Create list items for each menu item
    menuItems.forEach(item => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = item.link;
        a.textContent = item.name;
        li.appendChild(a);
        ul.appendChild(li);
    });

    // Append elements to the nav
    nav.appendChild(ul);
    header.appendChild(button);
    header.appendChild(nav);

    return header;
}
function createFloatingBar() {
    const floatingBar = document.createElement('div');
    floatingBar.className = 'floating-bar';
    
    const toggleDarkModeBtn = document.createElement('button');
    toggleDarkModeBtn.textContent = 'Toggle Dark Mode';
    toggleDarkModeBtn.onclick = () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode'));
    };
    
    const increaseFontSizeBtn = document.createElement('button');
    increaseFontSizeBtn.textContent = 'Increase Font Size';
    increaseFontSizeBtn.onclick = () => {
        const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize); // Obtiene tamaño en px
        document.documentElement.style.fontSize = `${currentSize + 1}px`; // Aumenta en 1px
    };

    const decreaseFontSizeBtn = document.createElement('button');
    decreaseFontSizeBtn.textContent = 'Decrease Font Size';
    decreaseFontSizeBtn.onclick = () => {
        const currentSize = parseFloat(getComputedStyle(document.documentElement).fontSize); // Obtiene tamaño en px
        document.documentElement.style.fontSize = `${currentSize - 1}px`; // Disminuye en 1px
    };

    floatingBar.appendChild(toggleDarkModeBtn);
    floatingBar.appendChild(increaseFontSizeBtn);
    floatingBar.appendChild(decreaseFontSizeBtn);

    document.body.appendChild(floatingBar);
}


// Function to replace the existing header
function replaceHeader() {
    const existingHeader = document.querySelector('header');
    const newHeader = createNavbar();

    if (existingHeader) {
        existingHeader.parentNode.replaceChild(newHeader, existingHeader);
    } else {
        // If no header exists, append the new one to the body
        document.body.prepend(newHeader);
    }
}
createFloatingBar();
const toggleButton = document.getElementById('toggle-dark-mode');
document.addEventListener('DOMContentLoaded', () => {
    replaceHeader();
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('header nav:first-of-type');

    hamburger.addEventListener('click', () => {
        nav.classList.toggle('open'); 
        hamburger.textContent = nav.classList.contains('open') ? '✖' : '☰'; 
    });
    const darkMode = localStorage.getItem('dark-mode') === 'true';
    if (darkMode) {
        document.body.classList.add('dark-mode');
        toggleButton.textContent = 'Switch to Light Mode';
    }
    toggleButton.addEventListener('click', () => {
        const isDarkMode = document.body.classList.toggle('dark-mode');
        toggleButton.textContent = isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode';
        localStorage.setItem('dark-mode', isDarkMode);
    });
});



