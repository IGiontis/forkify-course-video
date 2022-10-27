import icons from "url:../../img/icons.svg"; // Parcel 2
import View from "./View.js";
class PaginationView extends View {
  _parentElement = document.querySelector(".pagination");

  addHandlerClick(handler) {
    this._parentElement.addEventListener("click", function (e) {
      const btn = e.target.closest(".btn--inline");
      // console.log(btn);
      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      // console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;

    const prevBtnMarkup = `<button data-goto="${
      currentPage - 1
    }" class="btn--inline pagination__btn--prev">
    <svg class="search__icon">
      <use href="${icons}#icon-arrow-left"></use>
    </svg>
    <span>Page ${currentPage - 1}</span>
  </button>
`;

    const nextBtnMarkup = `
        <button data-goto="${currentPage + 1}" class="btn--inline pagination__btn--next">
            <span>Page ${currentPage + 1}</span>
            <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
            </svg>
        </button>
        `;

    const numPages = Math.ceil(this._data.resutls.length / this._data.resultsPerPage);

    //Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return nextBtnMarkup;
    }
    //Last page
    if (currentPage === numPages && numPages > 1) {
      return prevBtnMarkup;
    }
    // Other page
    if (currentPage < numPages) {
      return `${prevBtnMarkup} ${nextBtnMarkup}`;
    }
    //Page 1, and there are no  other pages
    return ``;
  }
}

export default new PaginationView();
