export default class Todo {
    #root;  
    #fieldset;
    #legend;

    constructor() {
        this.#root = document.querySelector('#to-do');
        this.#fieldset = document.createElement('fieldset');
        this.#legend = document.createElement('legend');    
        this.index = 0;
    }

    #createList() {
        this.#legend.textContent = 'To Do List:'
        this.#legend.insertAdjacentHTML('beforeend', `
        <button id="btn-add-item" type="button">Add Item +</button>
        `)
        this.#fieldset.prepend(this.#legend);      
        this.#root.appendChild(this.#fieldset);
        this.#addItem()
    }
    
    createItem(content = 'Lorem ipsum') {
        if (document.getElementsByTagName('fieldset').length === 0) {
            this.#createList()
        }
        this.#fieldset.insertAdjacentHTML('beforeend', `
            <div class="container-item">
                <input class="checkbox-item" type="checkbox" name="scales" >         
                <input  disabled class="input-edit" type="text" value="${content + - +  this.index}" >
                <button id="id-edit-${this.index}" type="button"  class="btn-edit">Edit</button>
                <button id="id-del-${this.index}" class="btn-del" type="button">Delete</button>
            </div>
            `)
        this.index++;
        return this
    }

    edit() {
        document.querySelectorAll('.btn-edit').forEach((elem) => {           
            elem.addEventListener('click', function editFunc(e) {
             
                const input = this.parentNode.querySelector('.input-edit');
                const button = this.parentNode.querySelector('.btn-edit');
                console.log(input.disabled);
                console.log('input',input);
                if (input.disabled) {
                    input.disabled = false;                  
                    button.classList.add('disable')
                    button.textContent = 'Save'
                } else {
                    input.disabled = true;                 
                    button.classList.remove('disable')
                    button.textContent = 'Edit'
                }
              //  e.preventDefault();
               
            }, false)
        })
        return this;
    }

    delete() {
        document.querySelectorAll('.btn-del')
        .forEach( (elem) => elem.addEventListener('click', function (params) {
           const parent =   this.parentNode
           parent.remove();          
         }))     
         return this   
    }

   #addItem() {         
       document.querySelector('#btn-add-item')
           .addEventListener('click',  () => {               
              return  this.createItem().edit()
           })
       return this
   }
    itemsMax(max) {
        for (let i = 0; i < max; i++) {
            this.createItem()            
        }
        return this
    }

    log(msg) {
        return console.log('Message: ', msg);
    }
}