const fileInput = document.querySelector(".fileinputimg"),
 chooseimgbtn = document.querySelector(".chooseimg"),
 previewImg = document.querySelector(".previewimg img"),
 filterOptions = document.querySelectorAll(".fcol btn button"),
filterName = document.querySelector(".filter-info .name"),
 filterValue = document.querySelector(".filter-info .value"),
 filterSlider = document.querySelector(".slider input");

let imageName,
  disableEditor = true;
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
    if (disableEditor) return;
    document.querySelector(".fcol .active").classList.remove("active");
    option.classList.add(" active");
    filterName.innerText = option.innerText;


  });
});
const updateFilter = () => {
//console.log(filterSlider.value);
   filterValue.innerText = `${filterSlider.value}%`;
};


fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
/// choose image event click
chooseimgbtn.addEventListener("click",() => fileInput.click());

