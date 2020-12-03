import { SearchForm } from './components/SearchForm';
import { Result } from './components/Result';

(() => {
  const searchFormConfig = {
    elements: {
      form: document.search,
      input: document.search.searchInput,
      submit: document.search.searchSubmit,
    },
    key: '',
    cx: '',
  };
  const searchForm = new SearchForm(
    searchFormConfig.elements,
    searchFormConfig.key,
    searchFormConfig.cx
  );
  const result = new Result('.result');

  searchForm.searchHandler(result.resultView);
})();
