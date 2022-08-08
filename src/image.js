const fileInput = document.querySelector(".fileinputimg");
const chooseimgbtn = document.querySelector(".chooseimg");
const previewImg = document.querySelector(".previewimg img");


//////image loading
const loadImage = () => {
    let file =fileInput.files[0];
    if(!file) return;
    previewImg.src =URL.createObjectURL(file); ////passing file though url as preview img src
    previewImg.addEventListener("load", () => {
        document.querySelector (".container").classList.remove("disable")
    });
    console.log(file);
}

fileInput, addEventListener("change", loadImage);
/// choose image event click
chooseimgbtn.addEventListener("click",() => fileInput.click());

