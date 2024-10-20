const products = [
    {
      id: "fc-1888",
      name: "flux capacitor",
      averagerating: 4.5
    },
    {
      id: "fc-2050",
      name: "power laces",
      averagerating: 4.7
    },
    {
      id: "fs-1987",
      name: "time circuits",
      averagerating: 3.5
    },
    {
      id: "ac-2000",
      name: "low voltage reactor",
      averagerating: 3.9
    },
    {
      id: "jj-1969",
      name: "warp equalizer",
      averagerating: 5.0
    }
  ];
const dataCreation = [
    { id: 1, label: "Product Name", type: "selector", options: products.map(product => product.name), placeHolder: "choose a product", require: true, class: "section1" },
    { id: 2, label: "Overall Rating", type: "starRating", require: true, class: "section2" },
    { id: 3, label: "Date of Installation", type: "calendarPicker", placeHolder: "mm/dd/yyyy", require: true, class: "section3" },
    { id: 4, label: "Which features did you find useful in the product", type: "checkBox", options: ["Durability", "Ease of use", "Performance", "Design"], require: true, class: "section4" },
    { id: 5, label: "Written review", type: "textArea", require: false, class: "section5" },
    { id: 6, label: "Your name", type: "text", require: false, class: "section6" },
];

const form = document.querySelector('.formStyle');
function starText(index) {
    let texto = ""; 
    for (let i = 1; i <= index; i++) {
        texto += '&#9733;'; 
    }
    return texto;
}

function createStars(section) {
    const ratingDiv = document.createElement('div');
    ratingDiv.classList.add("stars")

    for (let i = 1; i <= 5; i++) {
        const input = document.createElement('input');
        input.type = 'radio';
        input.id = `star${i}`;
        input.name = 'rating'; 
        input.value = i;
        if (section.require) input.required = true;

        const label = document.createElement('label');
        label.htmlFor = `star${i}`;
        label.className = 'star';
        label.innerHTML = starText(i); 

        ratingDiv.appendChild(input);
        ratingDiv.appendChild(label);
    }

    return ratingDiv;
}

dataCreation.forEach(item => {
    let element;

    const labelText = item.require ? item.label : `${item.label} (opcional)`;
    const label = document.createElement('label');
    label.textContent = labelText;
    label.setAttribute('for', `input${item.id}`);

    switch (item.type) {
        case "selector":
            element = document.createElement('select');
            element.setAttribute('name', `input${item.id}`);
            element.setAttribute('id', `input${item.id}`);
            if (item.require) element.required = true;

            const placeholderOption = document.createElement('option');
            placeholderOption.textContent = item.placeHolder;
            placeholderOption.value = '';
            placeholderOption.disabled = true;
            placeholderOption.selected = true;
            element.appendChild(placeholderOption);

            products.forEach(product => {
                const opt = document.createElement('option');
                opt.value = product.id; 
                opt.textContent = product.name;
                element.appendChild(opt);
            });
            break;

        case "RadioButton":
            element = document.createElement('div');
            item.options.forEach(option => {
                const radio = document.createElement('input');
                radio.setAttribute('type', 'radio');
                radio.setAttribute('name', `input${item.id}`);
                radio.setAttribute('value', option);
                if (item.require) radio.required = true;

                const labelRadio = document.createElement('label');
                labelRadio.textContent = option;
                labelRadio.appendChild(radio);
                element.appendChild(labelRadio);
            });
            break;

        case "calendarPicker":
            element = document.createElement('input');
            element.setAttribute('type', 'date');
            element.setAttribute('name', `input${item.id}`);
            element.setAttribute('id', `input${item.id}`);
            element.setAttribute('placeholder', item.placeHolder);
            if (item.require) element.required = true;
            break;

            case "checkBox":
                element = document.createElement('div');
                const checkboxes = []; 
            
                item.options.forEach(option => {
                    const checkbox = document.createElement('input');
                    checkbox.setAttribute('type', 'checkbox');
                    checkbox.setAttribute('name', `input${item.id}[]`);
                    checkbox.setAttribute('value', option);
            
                    const labelCheckbox = document.createElement('label');
                    labelCheckbox.textContent = option;
                    labelCheckbox.appendChild(checkbox);
                    element.appendChild(labelCheckbox);
            
                    checkboxes.push(checkbox); 
                });
            
                
                const requireCheckboxes = () => {
                    const isChecked = checkboxes.some(cb => cb.checked);
                    checkboxes.forEach(cb => {
                        cb.required = !isChecked; 
                    });
                };
            
                checkboxes.forEach(cb => cb.addEventListener('change', requireCheckboxes)); 
            
                break;
            

        case "textArea":
            element = document.createElement('textarea');
            element.setAttribute('name', `input${item.id}`);
            element.setAttribute('id', `input${item.id}`);
            if (item.require) element.required = true;
            break;

        case "text":
            element = document.createElement('input');
            element.setAttribute('type', 'text');
            element.setAttribute('name', `input${item.id}`);
            element.setAttribute('id', `input${item.id}`);
            if (item.require) element.required = true;
            break;

        case 'starRating':
            element = createStars(item);
            break;

        default:
            break;
    }

    if (element) {
        element.classList.add(item.class);
        form.appendChild(label);
        form.appendChild(element);
    }
}
);
const submit = document.createElement('button');
submit.className = "button";
submit.type = "submit"; 
submit.textContent = "Submit"; 
form.append(submit);

form.addEventListener('submit', function(event) {
    event.preventDefault(); 
    
    const formData = {};
    dataCreation.forEach(item => {
        const value = form.querySelector(`#input${item.id}`);
        if (value) {
            formData[item.label] = value.type === 'checkbox' ? [...form.querySelectorAll(`input[name="input${item.id}[]"]:checked`)].map(checkbox => checkbox.value) : value.value;
        }
    });

    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    reviews.push(formData);
    localStorage.setItem('reviews', JSON.stringify(reviews));


    let reviewCount = localStorage.getItem('reviewCount') ? parseInt(localStorage.getItem('reviewCount')) : 0;
    reviewCount++;
    localStorage.setItem('reviewCount', reviewCount);


    window.location.href = 'review.html';
});
