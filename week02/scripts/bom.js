const input = document.querySelector('#favchap');
const button = document.querySelector('button');
const list = document.querySelector('_____');
const li = document.createElement('li');
const deleteButon = document.createElement('button');
li.textContent = input.value;
deleteButon.textContent="X";
li.append(deleteButon);
list.append(li);