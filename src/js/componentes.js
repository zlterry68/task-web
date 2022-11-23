import { Todo, TodoList } from '../classes';

import { todoList } from '../index';

//Referencias en Html
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltors = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro');
const countPendientes = document.querySelector('.todo-count');
const buttonclick = document.querySelector('.task-button');

export const crearTodoHtml = (todo) =>{
    const htmlTodo = `<li class="${(todo.completado) ? 'completed' : ''}" data-id="${todo.id}">
                    <div class="view">
                        <input id="miElementoCheckbox" class="toggle" type="checkbox" ${(todo.completado) ? 'checked' : ''}>
                        <label>${todo.tarea}</label>
                        <button class="destroy"></button>
                    </div>
                    <input class="edit" value="Create a TodoMVC template">
                </li>`;
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;
}


// Eventos para pc

txtInput.addEventListener('keyup', (event) => {

     if (event.keyCode == 13 && txtInput.value.length > 0) {
        console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        ejecuta();
        txtInput.value = '';
    } 

});

// Eventos para celular
buttonclick.addEventListener('click', (event) => {
   
    
        console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);
        todoList.nuevoTodo(nuevoTodo);
        crearTodoHtml(nuevoTodo);
        ejecuta();
        txtInput.value = '';
  

});

//Evento delete,check tasks
divTodoList.addEventListener('click', (event) => { 
    const nombreElemento = event.target.localName; //input, label, button ...etc.    
    const todoElemento = event.target.parentElement.parentElement;
    const todoId = todoElemento.getAttribute('data-id');   
    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed');
        ejecuta();
    } else if (nombreElemento.includes('button')) { // hay que borrar el todo
        todoList.eliminarTodo(todoId);       
        divTodoList.removeChild(todoElemento);
        ejecuta();
    } 
    console.log(todoList);
});
  

//Evento delete task complete

btnBorrar.addEventListener('click', () => {

  
    todoList.eliminarCompletados();
    for (let i = divTodoList.children.length - 1; i >= 0; i--){
        const elemento = divTodoList.children[i];
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
    ejecuta();
  
    
  
});

ulFiltors.addEventListener('click', (event) => {
   
    
    const filtro = event.target.text;
    if (!filtro) { return; };
    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    

    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');
        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');                    
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');                    
                }
                break;

        }

    };


});

//PENDIENTES
function ejecuta(){
    // const arreglojson = JSON.parse(localStorage.getItem('todo'));
    // const numpendientes = arreglojson.filter(todo => !todo.completado).length;    
    // countPendientes.innerHTML = `<strong>${numpendientes}</strong>` + ` pendiente(s)`;
    
    console.log("");
}

(() => {
    ejecuta();
   
} ) ();