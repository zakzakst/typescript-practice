import { MyForm } from './components/MyForm';

const elements = {
  // TODO: Formの型の指定方法調べる
  form: document.myForm,
  text1: document.myForm.text1,
  text2: document.myForm.text2,
  select1: document.myForm.selectbox1,
  textarea1: document.myForm.textarea1,
  checkbox1: document.myForm.checkbox1,
  checkbox2: document.myForm.checkbox2,
  radio1: document.myForm.radio1,
  radio2: document.myForm.radio2,
  save: document.querySelector('.cookie--save'),
  clear: document.querySelector('.cookie--clear'),
}

const myForm = new MyForm(elements);

myForm.init();
