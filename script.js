let pendingCount = 0
const task_form =  document.querySelector('#task-form')
const task_input = document.querySelector('#task-input')
const priority_select = document.querySelector('#priority-select')
const filter_bar = document.querySelector('#filter-bar')
const pending_count =document.querySelector('#pending-count')
const task_list = document.querySelector('#task-list')

task_form.addEventListener('submit',(event)=>{
    event.preventDefault()
    const taskText = task_input.value;
    const priority = priority_select.value; 
    const li = document.createElement("li")
    li.dataset.priority = priority 
    li.innerHTML =`<span class="task-text">...</span>
    <div>
        <button class="done-btn">Done</button>
        <button class="delete-btn">Delete</button>
    </div>`
    if (priority === "urgent") {
    li.classList.add("urgent");
    task_list.prepend(li);
    } else {
    task_list.append(li);
    }
    pendingCount = pendingCount+1
    pending_count.textContent = pendingCount
    task_form.reset()
})
task_list.addEventListener('click', (event) => {              
    if (event.target.classList.contains("done-btn")) {        
        const li = event.target.closest("li");
        li.classList.toggle("completed");

        if (li.classList.contains("completed")) {             
            pendingCount = pendingCount - 1;
        } else {
            pendingCount = pendingCount + 1;
        }

        pending_count.textContent = pendingCount;
    } else if (event.target.classList.contains("delete-btn")) { 
        const li = event.target.closest("li");

        if (!li.classList.contains("completed")) {            
            pendingCount = pendingCount - 1;
            pending_count.textContent = pendingCount;
        }

        li.remove();                                          
    }                                                         
});                                                           
filter_bar.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const filter = event.target.dataset.filter;
        const allTasks = task_list.querySelectorAll("li");

        allTasks.forEach((li) => {
            if (filter === "all" || li.dataset.priority === filter) {
                li.classList.remove("hidden");
            } else {
                li.classList.add("hidden");
            }
        });
    }
});