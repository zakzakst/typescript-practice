import '../sass/style.scss';
import { IndexForm } from './components/IndexForm';

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

const indexFormConfig = {
  selector: {
    add: '.task-form__add',
    list: '.task-list',
  },
  class: {
    item: 'task-list__item',
    btn: 'task-list__btn',
  },
}

const indexForm = new IndexForm(formConfig, indexFormConfig);
indexForm.init();
