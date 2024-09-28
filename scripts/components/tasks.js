export class Tasks {
    constructor() {
        this.momentumTasksButtonElement = document.getElementById('momentum-tasks-button');
        this.buttonTasksAddElement = document.getElementById('button-tasks-add');
        this.inputTasksAddElement = document.getElementById('input-tasks-add');
        this.momentumTasksItemsElement = document.getElementById('momentum-tasks-items');
        this.momentumTasksTextElement = document.getElementById('momentum-tasks-text');
        this.momentumTasksDeleteElement = document.getElementById('momentum-tasks-delete');
        this.errorTasksAddElement = document.getElementById('error-tasks-add');

        this.momentumTasksButtonElement.addEventListener('click', this.showAndHide.bind(this));
        this.buttonTasksAddElement.addEventListener('click', this.showInput.bind(this));
        this.inputTasksAddElement.addEventListener('keydown', this.addTask.bind(this));
        this.momentumTasksDeleteElement.addEventListener('click', this.taskAllDelete.bind(this));
    }

    showAndHide() {
        if (!document.getElementsByClassName('task-block')) {
            this.momentumTasksItemsElement.classList.remove('checkbox');
            this.momentumTasksTextElement.setAttribute('style', 'display:block');
        }
        const momentumTasksListElement = document.getElementById('momentum-tasks-list');
        let momentumTasksListAttribute = momentumTasksListElement.getAttribute('style');
        if (momentumTasksListAttribute === "display: none") {
            momentumTasksListElement.setAttribute("style", "display: flex");
            momentumTasksListAttribute = momentumTasksListElement.getAttribute('style');
        } else if (momentumTasksListAttribute === "display: flex") {
            this.inputTasksAddElement.setAttribute("style", "display: block; outline: none;");
            this.errorTasksAddElement.setAttribute("style", "display: none;");
            momentumTasksListElement.setAttribute("style", "display: none");
            momentumTasksListAttribute = momentumTasksListElement.getAttribute('style');
            if (document.getElementsByClassName('task-block').length === 0) {
                this.buttonTasksAddElement.setAttribute("style", "display: block;");
                this.inputTasksAddElement.setAttribute("style", "display: none;");
            }
        }
    }

    showInput() {
        this.buttonTasksAddElement.setAttribute("style", "display: none;");
        this.inputTasksAddElement.setAttribute("style", "display: block;");
    }

    addTask(event) {
        const inputValue = this.inputTasksAddElement.value;
        this.errorTasksAddElement.setAttribute("style", "display: none;");
        this.inputTasksAddElement.setAttribute("style", "display: block; outline: none;");
        if (inputValue && event.key === "Enter") {
            this.buttonTasksAddElement.setAttribute("style", "display: none;");
            this.momentumTasksTextElement.setAttribute("style", "display: none;");
            this.createTaskBlock(inputValue);
        } else if (!inputValue && event.key === "Enter") {
            this.inputTasksAddElement.setAttribute("style", "display: block; border: 1px solid red;");
            this.errorTasksAddElement.setAttribute("style", "display: block;");
        }
    }

    createTaskBlock(inputValue) {
        this.inputTasksAddElement.value = '';
        const taskBlock = document.createElement('div');
        const taskCheckboxBlock = document.createElement('div');
        const taskCheckbox = document.createElement('input');
        const taskText = document.createElement('div');
        const taskDelete = document.createElement('div');

        taskCheckbox.setAttribute('type', 'checkbox');

        this.momentumTasksItemsElement.classList.add('checkbox');
        taskBlock.classList.add('task-block');
        taskText.classList.add('task-text');
        taskCheckboxBlock.classList.add('task-checkbox-block');
        taskDelete.classList.add('task-delete');
        taskCheckbox.classList.add('task-checkbox');

        taskText.innerText = inputValue;
        taskDelete.innerHTML =
            `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1"
                 x="0px" y="0px" width="11px" height="10px" viewBox="0 0 612.043 612.043"
                 style="enable-background:new 0 0 612.043 612.043;" xml:space="preserve">
<g>
	<g id="cross">
		<g>
			<path
                d="M397.503,306.011l195.577-195.577c25.27-25.269,25.27-66.213,0-91.482c-25.269-25.269-66.213-25.269-91.481,0     L306.022,214.551L110.445,18.974c-25.269-25.269-66.213-25.269-91.482,0s-25.269,66.213,0,91.482L214.54,306.033L18.963,501.61     c-25.269,25.269-25.269,66.213,0,91.481c25.269,25.27,66.213,25.27,91.482,0l195.577-195.576l195.577,195.576     c25.269,25.27,66.213,25.27,91.481,0c25.27-25.269,25.27-66.213,0-91.481L397.503,306.011z"/>
		</g>
	</g>
</g>
                <g>
</g>
                <g>
</g>
                <g>
</g>
                <g>
</g>
                <g>
</g>
                <g>
</g>
                <g>
</g>
                <g>
</g>
                <g>
</g>
                <g>
</g>
                <g>
</g>
                <g>
</g>
                <g>
</g>
                <g>
</g>
                <g>
</g>
</svg>`;

        taskCheckboxBlock.append(taskCheckbox, taskText);
        taskBlock.append(taskCheckboxBlock, taskDelete);
        this.momentumTasksItemsElement.append(taskBlock);

        taskDelete.addEventListener('click', this.taskDelete.bind(this, taskBlock));
    }

    taskDelete(taskBlock) {
        taskBlock.remove();
        if (document.getElementsByClassName('task-block').length === 0) {
            this.buttonTasksAddElement.setAttribute("style", "display: block;");
            this.inputTasksAddElement.setAttribute("style", "display: none;");
            this.momentumTasksItemsElement.classList.remove('checkbox');
            this.momentumTasksTextElement.setAttribute('style', 'display:block');
        }
    }

    taskAllDelete() {
        this.inputTasksAddElement.setAttribute("style", "display: block; outline: none;");
        this.errorTasksAddElement.setAttribute("style", "display: none;");
        const tasksListArray = Array.from(document.getElementsByClassName('task-block'));
        tasksListArray.filter(item => {
            return item.childNodes[0].childNodes[0].checked === true;
        }).forEach(item => {
            item.remove();
        });
        if (document.getElementsByClassName('task-block').length === 0) {
            this.buttonTasksAddElement.setAttribute("style", "display: block;");
            this.inputTasksAddElement.setAttribute("style", "display: none;");
            this.momentumTasksItemsElement.classList.remove('checkbox');
            this.momentumTasksTextElement.setAttribute('style', 'display:block');
        }
    }
}


