export const modalOpen = () => {
    document.querySelector('.overlay').classList.add('active'); 
    modalClose();                   
 }

export const  modalClose = () => {
     document.body.addEventListener('click', function (e) {
         const target = e.target;
         if (target.classList.contains('overlay') || target.classList.contains('modal-close'))
             document.querySelector('.overlay').classList.remove('active');
     })
 }