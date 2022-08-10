const fileInput = document.querySelector(".fileinputimg"),
 chooseimgbtn = document.querySelector(".chooseimg"),
 previewImg = document.querySelector(".previewimg img"),
 filterOptions = document.querySelectorAll(".filter button"),
filterName = document.querySelector(".filter-info .name"),
 filterValue = document.querySelector(".filter-info .value"),
 filterSlider = document.querySelector(".slider input"),
 rotateOptions = document.querySelectorAll(".rotate button"),
resetFilterBtn = document.querySelector(".resetfilter"),
saveImgBtn = document.querySelector(".saveimg");



let imageName,
  disableEditor = true;
let brightness = "100",
  saturation = "100",
  inversion = "0",
  grayscale = "0";
  let rotate = 0,
    flipHorizontal = 1,
    flipVertical = 1;

//////image loading
const loadImage = () => {
    let file =fileInput.files[0];
    if(!file) return;
    previewImg.src =URL.createObjectURL(file); ////passing file though url as preview img src
    previewImg.addEventListener("load", () => {
      disableEditor = false;
      resetFilterBtn.click();
      imageName = file.name.replace(/^.*[\\\/]/, "");

        document.querySelector (".container").classList.remove("disable")
    });
    //console.log(file);
}
/////// apply filter 
const applyFilter = () => {

  previewImg.style.transform = `rotate(${rotate}deg) scale(${flipHorizontal}, ${flipVertical})`;
  previewImg.style.filter = `brightness(${brightness}%) saturate(${saturation}%)invert(${inversion}%) grayscale(${grayscale}%)`;
}
//////// rotate add click event listner
rotateOptions.forEach(option => {
  option.addEventListener("click", () => {
////console.log(option);
if (option.id === "left") {
rotate -= 90;
} else if (option.id === "right") {
  rotate += 90;
} else if (option.id === "horizontal") {
  flipHorizontal = flipHorizontal === 1 ? -1 : 1 ;
} else {
  flipVertical = flipVertical === 1 ? -1 : 1 ; 
}

applyFilter();

  })
})



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

/////////// reset filter 
const resetFilter = () => {
/// resting all variables value to default
 brightness = "100",
  saturation = "100",
  inversion = "0",
  grayscale = "0";
 rotate = 0,
  flipHorizontal = 1,
  flipVertical = 1;
filterOptions[0].click();
   applyFilter();
};
//////////// save image
const saveImage = () => {
  if (disableEditor) return;
  saveImgBtn.innerText = "Saving image...";
  saveImgBtn.classList.add("disable");
 ///console.log("save image btn clicked");
    setTimeout(() => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = previewImg.naturalWidth;
      canvas.height = previewImg.naturalHeight;

      /// applying user selected filter to canvas filter
      ctx.filter = `brightness(${brightness}%) saturate(${saturation}%) invert(${inversion}%) grayscale(${grayscale}%)`;
      ctx.translate(canvas.width / 2, canvas.height / 2);
      if (rotate !== 0) {
        ctx.rotate((rotate * Math.PI) / 180);
      }
      ctx.scale(flipHorizontal, flipVertical); //flip canvas fliph flipv
      ctx.drawImage(
        previewImg,
        -canvas.width / 2,
        -canvas.height / 2,
        canvas.width,
        canvas.height
      );
      //////document.body.appendChild(canvas);
      const link = document.createElement("a");
      link.download = imageName;
      link.href = canvas.toDataURL();
      link.click();
      saveImgBtn.innerText = "Save Image";
      saveImgBtn.classList.remove("disable");
    });
}





fileInput.addEventListener("change", loadImage);
filterSlider.addEventListener("input", updateFilter);
resetFilterBtn.addEventListener("click", resetFilter);
saveImgBtn.addEventListener("click", saveImage);
/// choose image event click
chooseimgbtn.addEventListener("click",() => fileInput.click());

