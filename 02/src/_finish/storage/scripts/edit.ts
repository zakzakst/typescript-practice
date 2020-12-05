import '../sass/style.scss';
import { EditForm } from './components/EditForm';

const formConfig = {
  selector: {
    form: document.taskForm,
    ttlForm: document.taskForm.taskTitle,
    ttlHelp: '.task-form__title-help',
    desForm: document.taskForm.taskDescription,
    desHelp: '.task-form__description-help',
    reset: '.task-form__reset',
  },
  ttlNum: 5,
  desNum: 10,
  storageKey: 'storage',
}

const editFormConfig = {
  selector: {
    update: '.task-form__add',
  }
}

const editForm = new EditForm(formConfig, editFormConfig);
editForm.init();
