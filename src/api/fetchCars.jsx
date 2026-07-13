
function fetchCars() {
  return new Promise((resolve, reject) => {

    // Get a number between 0 to 4
    const RandomNumber = Math.floor(Math.random() * 5);
    if (RandomNumber === 0) {
      setTimeout(() => {
        reject(new Error("404: Failed to fetch cars data."));
      }, 800);
    } else {
      setTimeout(async () => {
        const response = await fetch('/data/cars.json');
        const cars = await response.json();
        resolve(cars);
      }, 1200); // Simulate a delay of 2 seconds
    }
  });
}

export default fetchCars;