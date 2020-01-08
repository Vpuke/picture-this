"use strict";

/**
 *Preview the chosen image from form before submitting.
 */
const readImgURL = function(reader, chosenImage, preview) {
    reader.onload = e => {
        preview.src = e.target.result;

        const filterButtons = document.querySelectorAll(".filter__button");
        filterButtons.forEach(filterButton => {
            filterButton.style.backgroundImage = `url('${e.target.result}')`;
        });
    };

    chosenImage.addEventListener("change", e => {
        const image = e.target.files[0];
        reader.readAsDataURL(image);

        if (typeof filterButton != "undefined" && filterButton != null) {
            const filterButton = document.querySelector(".filter__button");
            filterButton.classList.toggle("hidden");
        }
    });
};

const reader = new FileReader();

//Preview choosen image to post.
if (window.location.pathname === "/create-post.php") {
    //Preview chosen image for new post
    const chooseImage = document.querySelector("#post-image");
    const previewImage = document.querySelector("#preview");

    readImgURL(reader, chooseImage, previewImage);
}

//Preview chosen image for avatar
if (window.location.pathname === "/settings.php") {
    const chooseAvatar = document.querySelector("#avatar");
    const previewAvatar = document.querySelector("#avatar-image");

    readImgURL(reader, chooseAvatar, previewAvatar);
}