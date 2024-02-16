// Search value
function searchValue() {
  const params = new URLSearchParams(window.location.search);
  const searchInput = document.querySelector("#search__input");

  searchInput.value = params.get("search") || "";
}
// searchValue();

// Count Products Filter
function countProducts() {
  const listQty = document.querySelector(".products__list-qty .list-qty");
  const listQtyValue = document.querySelectorAll(
    ".products__list .product-item"
  ).length;
  listQty.innerHTML = listQtyValue;
}
countProducts();

// SortControl
function sortControl() {
  const sortContainer = document.querySelector(".sort-select");
  const sortTitle = document.querySelector(".sort__title");
  const sortValue = document.querySelector(".sort__value");
  const sortList = document.querySelector(".sort__list");
  const sortItems = document.querySelectorAll(".sort__list .sort-item");

  sortTitle.addEventListener("click", () => {
    sortList.classList.toggle("active");
  });

  window.addEventListener("click", (e) => {
    if (!sortContainer.contains(e.target)) {
      sortList.classList.remove("active");
    }
  });

  const params = new URLSearchParams(window.location.search);
  sortItems.forEach((item) => {
    item.addEventListener("click", () => {
      params.set("sort", item.dataset.value);
      window.location.href = `Products.aspx?${params.toString()}`;
    });
  });

  //Render Sort
  if (params.has("sort"))
    sortItems.forEach((item) => {
      if (item.dataset.value == params.get("sort"))
        sortValue.innerHTML = item.innerHTML;
    });
}
sortControl();

// Filter Control
function filterHandle() {
  function toggleFilterNav() {
    const filterNavOpen = document.querySelector(".search-filter__open");
    const filterNavClose = document.querySelector(".search-filter__close");
    const filterNav = document.querySelector(".search-filter");
    const overlay = document.querySelector("#overlay");
    const html = document.querySelector("html");

    filterNavOpen.addEventListener("click", () => {
      filterNav.classList.add("active");
      overlay.classList.add("active");
      html.classList.add("dis-scroll");

      renderFilters();
    });

    filterNavClose.addEventListener("click", () => {
      filterNav.classList.remove("active");
      overlay.classList.remove("active");
      html.classList.remove("dis-scroll");
    });
    overlay.addEventListener("click", () => {
      filterNav.classList.remove("active");
      overlay.classList.remove("active");
      html.classList.remove("dis-scroll");
    });
    window.addEventListener("resize", () => {
      const windownWidth = window.innerWidth;

      if (windownWidth >= 992 && filterNav.className.includes("active")) {
        filterNav.classList.remove("active");
        overlay.classList.remove("active");
        html.classList.remove("dis-scroll");
      }
    });
  }
  toggleFilterNav();

  function checkFilterItem() {
    const filterItems = document.querySelectorAll(".filter__item");

    filterItems.forEach((item) => {
      item.addEventListener("click", () => {
        item.classList.toggle("active");
      });
    });
  }
  checkFilterItem();

  const params = new URLSearchParams(window.location.search);
  const priceFrom = document.querySelector(
    ".filter__price-input input[name='priceFrom']"
  );
  const priceTo = document.querySelector(
    ".filter__price-input input[name='priceTo']"
  );

  // Control Filter
  function filterControl() {
    // Click Apply Filter
    const applyFilter = document.querySelector(".filter__price-btn");
    applyFilter.addEventListener("click", () => {
      const colorFilters = document.querySelectorAll(
        ".filter__color .filter__item.active"
      );
      const sizeFilters = document.querySelectorAll(
        ".filter__size .filter__item.active"
      );

      if (priceFrom.value != "" || priceTo.value != "") {
        var priceF, priceT;

        if (parseFloat(priceFrom.value) > parseFloat(priceTo.value)) {
          priceF = priceTo.value;
          priceT = priceFrom.value;
        } else {
          priceF = priceFrom.value;
          priceT = priceTo.value;
        }
        params.set(
          "price",
          `${priceFrom.value == "" ? 0 : priceF}-${
            priceTo.value == "" ? "inf" : priceT
          }`
        );
      } else {
        params.delete("price");
      }

      if (colorFilters.length != 0) {
        var arrayTemplate = [];
        colorFilters.forEach((item) => {
          arrayTemplate.push(item.dataset.value);
        });
        params.set("color", arrayTemplate.join("-"));
      } else {
        params.delete("color");
      }

      if (sizeFilters.length != 0) {
        var arrayTemplate = [];
        sizeFilters.forEach((item) => {
          arrayTemplate.push(item.dataset.value);
        });
        params.set("size", arrayTemplate.join("-"));
      } else {
        params.delete("size");
      }

      window.location.href = `Products.aspx?${params.toString()}`;
    });
  }
  filterControl();

  // Render Filter
  function renderFilters() {
    const queryFilter = window.location.search.slice(1);
    const filters = queryFilter.split("&");
    var valueFilter = [];
    var hasPriceFilter = false;

    filters.forEach((filter) => {
      if (filter.includes("color")) {
        valueFilter = valueFilter.concat(filter.slice(6).split("-"));
      } else if (filter.includes("size")) {
        valueFilter = valueFilter.concat(filter.slice(5).split("-"));
      } else if (filter.includes("price")) {
        const priceFilter = filter.slice(6).split("-");

        priceFrom.value = priceFilter[0];
        priceTo.value = priceFilter[1] == "inf" ? "" : priceFilter[1];
        hasPriceFilter = true;
      }
    });

    const filterItems = document.querySelectorAll(".filter__item");
    filterItems.forEach((item) => {
      if (valueFilter.includes(item.dataset.value))
        item.classList.add("active");
      else item.classList.remove("active");
    });

    const filterClearBtn = document.querySelector(".search-filter-clearall");
    if (valueFilter.length > 0 || hasPriceFilter)
      filterClearBtn.classList.add("active");
    else filterClearBtn.classList.remove("active");
  }
  renderFilters();

  // Render Active Filter
  function renderActiveFilter() {
    const activeFilterList = document.querySelector(".active-filter__list");
    var arrayFilterActive = [];

    if (params.has("price"))
      arrayFilterActive.push(`Price: ${params.get("price")}`);
    if (params.has("color")) {
      params
        .get("color")
        .split("-")
        .forEach((item) => {
          arrayFilterActive.push("Color: " + item);
        });
    }
    if (params.has("size")) {
      params
        .get("size")
        .split("-")
        .forEach((item) => {
          arrayFilterActive.push("Size: " + item);
        });
    }

    const htmls = arrayFilterActive.map((item) => {
      return `
                <div class="filter-item" data-value="${item}">
                    <span class="filter-item__name">${item}</span>
                    <i class="fas fa-times filter-item__close"></i>
                </div>   
            `;
    });
    activeFilterList.innerHTML = htmls.join(" ");
  }
  renderActiveFilter();

  // Click Remove Active Filter Item
  function removeActiveFilter() {
    const activeFilters = document.querySelectorAll(".filter-item");
    activeFilters.forEach((item) => {
      const filter = item.dataset.value.split(":");
      const filterName = filter[0].toLowerCase();
      const filterValue = filter[1].trim();
      const removeFilterBtn = item.querySelector(".filter-item__close");

      removeFilterBtn.addEventListener("click", () => {
        var arrayFilterValue = params.get(filterName).split("-");
        if (filterName == "price") {
          params.delete("price");
        } else {
          arrayFilterValue.splice(arrayFilterValue.indexOf(filterValue), 1);
          params.set(filterName, arrayFilterValue.join("-"));

          if (arrayFilterValue.length == 0) params.delete(filterName);
        }
        window.location.href = `Products.aspx?${params.toString()}`;
      });
    });
  }
  removeActiveFilter();
}
filterHandle();
