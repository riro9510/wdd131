const dataCreation = [
    { id: 1, label: "Your name", type: "text", require: true, class: "section-paragraph" },
    { id: 2, label: "What do you like of this site?", type: "textArea", require: true, class: "section-paragraph" },
    { id: 3, label: "Do you have any idea to improve it?", type: "textArea", require: false, class: "section-paragraph" },
];

const form = document.querySelector('.formStyle');


dataCreation.forEach(item => {
    let element;

    const labelText = item.require ? item.label : `${item.label} (opcional)`;
    const label = document.createElement('label');
    label.textContent = labelText;
    label.setAttribute('for', `input${item.id}`);

    switch (item.type) {
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

    }

    if (element) {
        element.classList.add(item.class);
        form.appendChild(label);
        form.appendChild(element);
    }
});

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
          value.value;
        }
    });

    const comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push(formData);
    localStorage.setItem('comments', JSON.stringify(comments));
    window.location.href = './thanks.html';
});