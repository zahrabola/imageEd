const fileInput = document.querySelector(".fileinputimg"),
 chooseimgbtn = document.querySelector(".chooseimg"),
 previewImg = document.querySelector(".previewimg img"),
 filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
 filterValue = document.querySelector(".filter-info .value"),
 filterSlider = document.querySelector(".slider input");


let brightness = "100",
  saturation = "100",
  inversion = "0",
  grayscale = "0";

//////image loading
const loadImage = () => {
    let file =fileInput.files[0];
    if(!file) return;
    previewImg.src =URL.createObjectURL(file); ////passing file though url as preview img src
    previewImg.addEventListener("load", () => {
        document.querySelector (".container").classList.remove("disable")
    });
    //console.log(file);
}






////////filter 
filterOptions.forEach(option => {
  console.log(option);
  option.addEventListener("click", () => {

    document.querySelector(".active").classList.remove("active");
    option.classList.add("active");
    filterName.innerText = option.innerText;

    if (option.id === "brightness") {
      filterSlider.max = "200";
      filterSlider.value = brightness;
      filterValue.innerText = `${brightness}%`;
    } else if (option.id === "saturation") {
      filterSlider.max = "200";
      filterSlider.value = saturation;
      filterValue.innerText = `${saturation}%`;
    } else if (option.id === "inversion") {
      filterSlider.max = "100";
      filterSlider.value = inversion;
      filterValue.innerText = `${inversion}%`;
    } else {
      filterSlider.max = "100";
      filterSlider.value = grayscale;
      filterValue.innerText = `${grayscale}%`;
    }
  });
});


///update

const updateFilter = () => {
//console.log(filterSlider.value);
   filterValue.innerText = `${filterSlider.value}%`;
    const selectedFilter = document.querySelector(".filter .active"); //getting selected filter
  if (selectedFilter.id === "brightness") {
    brightness = filterSlider.value;
  } else if (selectedFilter.id === "saturation") {
    saturation = filterSlider.value;
  } else if (selectedFilter.id === "inversion") {
    inversion = filterSlider.value;
  } else {
    grayscale = filterSlider.value;
  }
  applyFilter();
};











fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
/// choose image event click
chooseimgbtn.addEventListener("click",() => fileInput.click());

