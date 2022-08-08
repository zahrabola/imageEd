const fileInput = document.querySelector(".fileinputimg");
const chooseimgbtn = document.querySelector(".chooseimg");

const loadImage = () => {
    let file =fileInput.files[0];
    console.log(file);
}

fileInput, addEventListener("change", loadImage);
/// choose image event click
chooseimgbtn.addEventListener("click",() => fileInput.click());

