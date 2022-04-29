let myInput=document.getElementById('myInput')
let tasksArea=document.querySelector('#myOl')
let number=0;
let arr=[];
let id=0

function showfilterbtn(){
    document.getElementById('filterbtn').style.backgroundImage='url(/images/filterdowndark.svg)'
}

function taskcount(){
    console.log(document.getElementById('myOl'))
    if(document.getElementById('draggable').innerHTML==null){
        document.querySelector('input').style.display='flex'
        document.getElementById('myOl').style.display='none'
    }
  }
//clear input
 document.querySelector('.clear').addEventListener('click',function(event){
     event.preventDefault();
     document.querySelector('input').value=''
 })
 //show input
 function showInput(){
     document.querySelector('form').style.display='flex'
     document.querySelector('form').style.justifyContent='space-between'
     document.querySelector('form').style.flexDirection='row'
     document.querySelector('input').focus()
     document.getElementById('myOl').scrollTop=document.getElementById('myOl').scrollHeight+3
}
document.querySelector('#submit').addEventListener("click", showInput)
 //adding ol;
document.querySelector('input').addEventListener("keydown",function(event){    
    if(event.keyCode===13){
        if(document.querySelector('input').value.length== 0){
          alert('Please enter something')
        }
          else{
            id+=1
            number+=1
            console.log(number)
            document.querySelector('form').style.display='none'
            document.getElementById('myOl').style.display='flex'
            event.preventDefault()
            tasksArea.innerHTML += `
                <li draggable="true">
                        ${document.querySelector('input').value}
                <button class="delete">X
                    </button>
                </li>
            `;
            document.querySelector('input').value=''
            var current_tasks = document.querySelectorAll(".delete");
                    for(var i=0; i<current_tasks.length; i++){
                      current_tasks[i].onclick = function(){
                            this.parentNode.remove();
                            console.log(document.getElementById('myOl').childElementCount)
                            if(document.getElementById('myOl').childElementCount==0){
                                document.querySelector('form').style.display='flex'
                                document.getElementById('myOl').style.display='none'
                            }    
                    }
                }
              }  
        }  
})
// drag and drop
new Sortable(tasksArea,{
    animation: 250
});
//sorting the elements
document.querySelector('#filterbtn').addEventListener('click', sortListDir)
function sortListDir() {
    var list, i, switching, b, shouldSwitch, dir, switchcount = 0;
    list = document.getElementById("myOl");
    switching = true;
    dir = "asc";
    while (switching) {
      switching = false;
      b = list.getElementsByTagName('LI');
      for (i = 0; i < (b.length - 1); i++) {
        shouldSwitch = false;
        if (dir == "asc") {
          if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
            shouldSwitch = true;            
            document.getElementById('down').setAttribute('class', 'fa-solid fa-arrow-up-wide-short')
            break;
          }
        } else if (dir == "desc") {
            document.getElementById('down').setAttribute('class', 'fa-solid fa-arrow-down-wide-short')
          if (b[i].innerHTML.toLowerCase() < b[i + 1].innerHTML.toLowerCase()) {
            shouldSwitch= true;
            break;
          }
        }
      }
      if (shouldSwitch) {
        b[i].parentNode.insertBefore(b[i + 1], b[i]);
        switching = true;
        switchcount ++;
      } else {
        if (switchcount == 0 && dir == "asc") {
          dir = "desc";
          switching = true;
        }
      }
    }
  }