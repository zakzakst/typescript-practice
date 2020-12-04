import { KeywordForm } from './components/KeywordForm';
import { PlaceForm } from './components/PlaceForm';
import { PurposeForm } from './components/PurposeForm';

(() => {
  // キーワード選択の初期化
  const keywordFormConfig = {
    selector: {
      input: document.search.keyword,
      container: '.search__keyword-container',
      recommend: '.search__keyword-recommend',
    },
    dataUrl: './data/keyword.json',
    maxNum: 5,
  };
  const keywordForm = new KeywordForm(keywordFormConfig);
  keywordForm.init();

  // 場所選択の初期化
  const placeFormConfig = {
    selector: {
      prefecture: document.search.prefecture,
      district: document.search.district,
      town: document.search.town,
    },
    dataUrl: './data/place.json',
  };
  const placeForm = new PlaceForm(placeFormConfig);
  placeForm.init();

  // 目的選択の初期化
  const purposeFormConfig = {
    selector: {
      input: document.search.purpose,
      select: '.purpose-select',
      close: '.purpose-select__close',
      list: '.purpose-select__list',
      breadcrumb: '.purpose-select__breadcrumb',
    },
    dataUrl: './data/purpose.json',
  }
  const purposeForm = new PurposeForm(purposeFormConfig);
  purposeForm.init();
})();
