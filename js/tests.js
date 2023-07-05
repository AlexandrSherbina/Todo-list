

export  const   testTasksEvent = (count) => {
    document.querySelector('#testTasks').addEventListener('click', function (params) {
        const addItem = document.querySelector('#btn-add-item');
       //const storage =  localStorage.getItem('storageTasks');
       // let parse =  JSON.parse(storage);
      
        // if(parse.length > 0) return ;
        let index = 1;

        const eventClick = new Event('click', {
            bubbles: true,
            cancelable: true,
            composed: true
        });
        const eventMouse = new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            composed: true,
            clientX: 100,
            clientY: 100
        });

        for (let i = 0; i < count; i++) {           
            const edit = document.querySelectorAll('.input-edit');
            const btnEdit = document.querySelectorAll('.btn-edit');            
            // Click add Item
            addItem.dispatchEvent(eventClick);
            setTimeout(() => {
                // Click btn Edit
                btnEdit[i].dispatchEvent(eventClick);
                // Click input description
                edit[i].dispatchEvent(eventClick);
                // Add Text into input 
                edit[i].value = 'Test ' + i;

                if (index > 3) index = 1;
                // Selected Importance
                document.querySelectorAll(`.select-importance option:nth-child(${ index })`)[i].setAttribute('selected', undefined)
                index++;
            }, 150);

            setTimeout(() => {
                btnEdit[i].dispatchEvent(eventClick);
            }, 500);

        }
        const check =  document.querySelectorAll('.checkbox-item');

        setTimeout(() => {
            // Complete task
            check[1].dispatchEvent(eventMouse);
            check[3].dispatchEvent(eventMouse);
            check[5].dispatchEvent(eventMouse);
            // Remove task       
            //  document.querySelectorAll('.btn-del')[document.querySelectorAll('.btn-del').length - 2].dispatchEvent(eventClick);
        }, 2000);

    })
}

export default testTasksEvent;