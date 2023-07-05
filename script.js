import {Task, ToDoList}  from "./class/todo-list.js";
import testTasksEvent from './js/tests.js';
import {modalOpen} from './js/modal.js'

        const myToDoList = new ToDoList();
        let index = 0;
        let id = 0;
        let storageTasks =  localStorage.getItem('storageTasks');
        let parse =  JSON.parse(storageTasks); 

        function createItem(content = 'Write note...') {
            document.querySelector('#list-1').insertAdjacentHTML('beforeend', `
                <div class="container-item" >
                    <input disabled class="checkbox-item" type="checkbox" name="scales" >         
                    <input  disabled class="input-edit" type="text" placeholder="${content +  index}" >
                    <div >
                        <select class="select-importance">
                            <option value="low">Low</option>
                            <option value="midlle" selected>Midlle</option>
                            <option value="high">High</option>
                        </select>
                    </div>
                    <button id="id-edit-${index}" type="button"  class="btn-edit">Edit</button>
                    <button id="id-del-${index}" class="btn-del" type="button">Delete</button>
                </div>
                `)
            index++;          
        };

        function addItem() {
            document.querySelector('#btn-add-item')
                .addEventListener('click', (e) => {
                    return createItem();
                })
        };    

        function removeAllTasks() {           
            document.querySelector('#btn-remove-items')
                .addEventListener('click', (e) => {
                   document.querySelectorAll('.container-item').forEach(item => item.remove())
                   myToDoList.removeAll();
                   localStorage.clear();
                })
        }

        function allTasks() {
            document.querySelector('#btn-all-tasks')
                .addEventListener('click', (e) => {                   
                    const allTasks = myToDoList.getTasks();
                    console.log("Все задачи:", allTasks);
                    modalOpen();
                    createTable(allTasks)
                })
        };

        function completedTasks() {
            document.querySelector('#btn-completed-tasks')
                .addEventListener('click', (e) => {                        
                    const completedTasks = myToDoList.getCompletedTasks();
                    console.log("Выполненные задачи:", completedTasks);
                    modalOpen();
                    createTable(completedTasks);
                })
        };

        function pendingTasks() {
            document.querySelector('#btn-pending-tasks')
                .addEventListener('click', (e) => {                   
                  const pendingTasks = myToDoList.getPendingTasks();
                  console.log("Невыполненные задачи:", pendingTasks);
                  modalOpen();
                  createTable(pendingTasks);
                })
        };

        function createTable(tasks = [{
            description: null,
            id: null,
            importance: null,
        }]) {

            if (tasks.length === 0) {
                tasks = [{
                    description: null,
                    id: null,
                    importance: null,
                }]
            };

            function addClassColor(value) {                
                switch (value) {
                 case 'low':
                     return 'green-bgc'
                     
                 case 'midlle': 
                     return 'yellow-bgc';
                   
                 case 'high': 
                     return 'red-bgc';
                                   
                 default:                  
                     break;
                }  
             } 

            const modal = document.querySelector('.modal > .table-wrapp');
            const table = modal.querySelector('table');

            if (table) {
                table.remove();
            }

            modal.insertAdjacentHTML('beforeend', ` 
               <table>
                <colgroup>
                        <col>
                        <col>
                        <col>                         
                        <col>                         
                </colgroup>
                    <tr>
                        <th>№</th>
                        <th>Description</th>
                        <th>Importance</th>
                        <th>Completed</th>
                    </tr>                 
               </table>
               `);

            return [...tasks].forEach(task => {             
                //console.log(Object.values(task).forEach(el => el));
               const {id,description, importance, completed } = task; 
            
                document.querySelector('table').insertAdjacentHTML('beforeend', `
                    <tr>
                        <td>${id}</td>
                        <td>${description}</td>
                        <td class=${addClassColor(importance)}>${importance}</td>                   
                        <td>${completed}</td>                   
                    </tr>
                    `);
            });

        };

        function listenerBtns() {           
            const body = document.body;
            body.addEventListener('click', function editFunc(e) {
                const target = e.target;                
                const hasClass = (className) => target.classList.contains(className);                

                if (hasClass('select-importance')) {
                    const parent = target.parentNode.parentNode;
                    const option = parent.querySelector('option:checked');
                     
                      if ( option && parent.hasAttribute('id-task')) {                       
                        const idItem = parent.getAttribute('id-task');
                        const task = myToDoList.findTask(idItem);
                        task.importance = option.value;
                    }
                }

                if (hasClass('btn-edit')) {
                    const parent = target.parentNode;
                    const input = parent.querySelector('.input-edit');
                    const checkbox = parent.querySelector('.checkbox-item');
                    const button = parent.querySelector('.btn-edit');

                    if (input.disabled) {
                        input.disabled = false;                        
                        button.classList.add('disable')
                        button.textContent = 'Save';                       
                    } else {
                        const option = parent.querySelector('option:checked');

                        input.disabled = true;
                        checkbox.disabled = false;
                        button.classList.remove('disable');
                        button.textContent = 'Edit';                                              

                        const idItem =  parent.getAttribute('id-task' );
                        const hasAttr =  parent.hasAttribute('id-task');

                      if (!hasAttr) {                      
                          const task = new Task(input.value, option.value, id);
                          parent.setAttribute('id-task', id)
                          myToDoList.addTask(task)
                          id++;
                      } else {
                          myToDoList.updTaskDescription(idItem, input.value);
                      }
                    }
                }

                if (hasClass('checkbox-item')) {
                    let parent = target.parentNode;
                    if (parent.querySelector('input:checked') && parent.hasAttribute('id-task')) {  
                        const idItem = parent.getAttribute('id-task');
                        const task = myToDoList.findTask(idItem);                        
                        //  task.complete();
                         task.completed = true;
                      
                    } else {     
                        if (!parent.hasAttribute('id-task')) return               
                        const idItem = parent.getAttribute('id-task');
                        const task = myToDoList.findTask(idItem);
                        // task.cancelComplete();
                        task.completed = false;
                    }                   
                }

                if (hasClass('btn-del')) {
                    let parent = target.parentNode;
                    if (parent.hasAttribute('id-task')) {
                        const idItem = parent.getAttribute('id-task');
                        const task = myToDoList.findTask(idItem);
                        parent.style.transition = '.4s all'
                        parent.style.opacity = '0.5';
                        parent.style.marginLeft = '-200px';

                       setTimeout(() => {
                        myToDoList.removeTask(task);
                        parent.remove();
                       }, 400);
                    }
                }
            })
        };

  
                
        if (!storageTasks || parse.length === 0) {
            createItem();
        } else {
            myToDoList.addStorageTasks(parse);
            const allTasks = myToDoList.getTasks();
            const content = 'Write note...';
           
            allTasks.forEach((task) => {
                const {description, importance} = task;              
                document.querySelector('#list-1').insertAdjacentHTML('beforeend', `
                <div class="container-item" id-task=${task.id}>
                    <input  class="checkbox-item" type="checkbox" name="scales" >         
                    <input  disabled value="${description}" class="input-edit" type="text" placeholder="${content +  task.id}" >
                    <div >
                        <select class="select-importance">
                            <option value="low" ${importance === 'low' ? 'selected': ''}>Low</option>
                            <option value="midlle" ${importance === 'midlle' ? 'selected': ''}>Midlle</option>
                            <option value="high" ${importance === 'high' ? 'selected': ''}>High</option>
                        </select>
                    </div>
                    <button id="id-edit-${task.id}" type="button"  class="btn-edit">Edit</button>
                    <button id="id-del-${task.id}" class="btn-del" type="button">Delete</button>
                </div>
                `)
                id = task.id + 1;
            })
            console.log(allTasks, 'allTasks');
        };

        allTasks();
        completedTasks();
        pendingTasks();
        addItem();
        removeAllTasks()
        listenerBtns();
        testTasksEvent(12);

        window.addEventListener('beforeunload', (event) => {
            const tasks =   myToDoList.getTasks();
            // Отмените событие, как указано в стандарте.
            event.preventDefault();
            // Chrome требует установки возвратного значения.
            event.returnValue = '';
            localStorage.setItem('storageTasks', `${JSON.stringify(tasks) }`)
          });
          