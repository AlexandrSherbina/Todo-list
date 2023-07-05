export  class Task  {   
    constructor(description, importance, id ) {
        this.description = description;
        this.importance = importance;
        this.completed = false;
        this.id = id; 
    }

    complete() {
        return this.completed = true
    }
    cancelComplete() {
        return this.completed = false
    }

}

export class ToDoList   {    
    constructor() {             
        this.tasks = [];                                  
    } 
 
    addTask(task) {           
        this.tasks.push(task);       
    }

    removeTask(task) {
        const index = this.tasks.indexOf(task);
        if (index > -1) {
            this.tasks.splice(index, 1);
        }       
    }

    removeAll() {
       return this.tasks = []
    }

    getTasks() {
        return this.tasks;
    }

    getCompletedTasks() {
        return this.getTasks().filter(task => task.completed)
    }
    getPendingTasks() {
        return this.getTasks().filter(task => !task.completed)
    }

    updTaskDescription(taskId, content) {    
        this.findTask(taskId).description = content;    
    }

    findTask(id) {
      return  this.getTasks().find(tsk => tsk.id === Number(id));        
    } 

    addStorageTasks(tasks) {
        tasks.forEach(task => this.addTask(task));      
    }
}