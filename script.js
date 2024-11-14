document.addEventListener("DOMContentLoaded", function () {
  const carContainer = document.getElementById("cars-container");

  function renderCars(cars) {
    carContainer.innerHTML = "";
    if (cars.length === 0) {
      carContainer.innerHTML =
        "<p>No cars match your criteria. Try adjusting your filters.</p>";
    } else {
      cars.forEach((car) => {
        const carCard = document.createElement("div");
        carCard.className = "car-card";
        carCard.innerHTML = `
                    <h3>${car.make} ${car.year} ${car.model}</h3>
                    <p>Mileage: ${car.mileage} miles</p>
                    <p>Price: $${car.price}</p>
                    <p>Color: ${car.color}</p>
                    <p>${car.gasMileage}</p>
                `;
        carContainer.appendChild(carCard);
      });
    }
  }

  function getFilteredCars() {
    const minYear = parseInt(document.getElementById("min-year").value) || 0;
    const maxYear =
      parseInt(document.getElementById("max-year").value) ||
      new Date().getFullYear();
    const minMileage =
      parseInt(document.getElementById("min-mileage").value) || 0;
    const maxMileage =
      parseInt(document.getElementById("max-mileage").value) || Infinity;
    const minPrice = parseInt(document.getElementById("min-price").value) || 0;
    const maxPrice =
      parseInt(document.getElementById("max-price").value) || Infinity;

    // Capture selected makes and colors as arrays
    const selectedMakes = Array.from(
      document.getElementById("make").selectedOptions
    ).map((option) => option.value);
    const selectedColors = Array.from(
      document.getElementById("color").selectedOptions
    ).map((option) => option.value);

    return usedCars.filter((car) => {
      return (
        car.year >= minYear &&
        car.year <= maxYear &&
        car.mileage >= minMileage &&
        car.mileage <= maxMileage &&
        car.price >= minPrice &&
        car.price <= maxPrice &&
        (selectedMakes.length === 0 || selectedMakes.includes(car.make)) &&
        (selectedColors.length === 0 || selectedColors.includes(car.color))
      );
    });
  }

  function populateFilters() {
    const makes = [...new Set(usedCars.map((car) => car.make))];
    const colors = [...new Set(usedCars.map((car) => car.color))];

    const makeSelect = document.getElementById("make");
    const colorSelect = document.getElementById("color");

    // Populate makes
    makes.forEach((make) => {
      const option = document.createElement("option");
      option.value = make;
      option.textContent = make;
      makeSelect.appendChild(option);
    });

    // Populate colors
    colors.forEach((color) => {
      const option = document.createElement("option");
      option.value = color;
      option.textContent = color;
      colorSelect.appendChild(option);
    });
  }

  function clearFilters() {
    document.getElementById("min-year").value = "";
    document.getElementById("max-year").value = "";
    document.getElementById("min-mileage").value = "";
    document.getElementById("max-mileage").value = "";
    document.getElementById("min-price").value = "";
    document.getElementById("max-price").value = "";

    // Clear selected options in the make and color multi-selects
    document.getElementById("make").selectedIndex = -1;
    document.getElementById("color").selectedIndex = -1;

    // Re-render all cars
    renderCars(usedCars);
  }

  document.getElementById("filter-btn").addEventListener("click", () => {
    const filteredCars = getFilteredCars();
    renderCars(filteredCars);
  });

  document.getElementById("clear-btn").addEventListener("click", clearFilters);

  populateFilters();
  renderCars(usedCars);
});
