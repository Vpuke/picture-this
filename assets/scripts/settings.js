//Handle toggling of showing menu item and clearing messages
const settingsMenuItemsText = document.querySelectorAll(
    ".settings__menu__item h2"
);
const settingsMenuItems = document.querySelectorAll(".settings__menu__item");
const messages = document.querySelectorAll(".settings .message p");

settingsMenuItemsText.forEach(item => {
    item.addEventListener("click", () => {
        messages.forEach(message => {
            message.innerHTML = "";
            message.parentNode.classList.remove("message__success--color");
            message.parentNode.classList.remove("message__error--color");
            message.parentNode.classList.add("hidden");
        });

        settingsMenuItems.forEach(settingsMenuItem => {
            if (
                !settingsMenuItem.children[1].classList.contains("hidden") &&
                settingsMenuItem.children[0].innerText !== item.innerText
            ) {
                settingsMenuItem.children[1].classList.add("hidden");
            }
        });

        item.parentNode.children[1].classList.toggle("hidden");
    });
});

/**
 * Function for toggling messages for user
 */
const handleMessage = function handleMessage(
    message,
    messageHolder,
    messageText
) {
    messageHolder.classList.remove("hidden");

    if (message["error"]) {
        messageText.textContent = message.error;
        messageHolder.classList.remove("message__success--color");
        messageHolder.classList.add("message__error--color");
    }

    if (message["success"]) {
        messageText.textContent = message.success;
        messageHolder.classList.remove("message__error--color");
        messageHolder.classList.add("message__success--color");
    }
};

/**
 * Formhandler for changing avatar/profile picture
 */
const avatarForm = document.querySelector(".change-avatar__form");
const avatarMessage = document.querySelector(".change-avatar .message");

if (typeof avatarMessage != "undefined" && avatarMessage != null) {
    const avatarMessageText = avatarMessage.querySelector("p");

    avatarForm.addEventListener("submit", event => {
        event.preventDefault();

        const formData = new FormData(avatarForm);

        fetch("app/users/avatar.php", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(message => {
                handleMessage(message, avatarMessage, avatarMessageText);
            });
    });
}
/**
 * Formhandler for changing biography
 */
const biographyForm = document.querySelector(".change-biography__form");
const biographyMessage = document.querySelector(".change-biography .message");

if (typeof biographyMessage != "undefined" && biographyMessage != null) {
    const biographyMessageText = biographyMessage.querySelector("p");

    biographyForm.addEventListener("submit", event => {
        event.preventDefault();

        const formData = new FormData(biographyForm);

        fetch("app/users/biography.php", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(message => {
                biographyMessage.classList.remove("hidden");
                biographyMessageText.textContent = message[0].success;
                biographyMessage.classList.add("message__success--color");
            });
    });
}

/**
 * Forhandler for changing username
 */
const usernameForm = document.querySelector(".change-username__form");
const usernameMessage = document.querySelector(".change-username .message");

if (typeof usernameMessage != "undefined" && usernameMessage != null) {
    const usernameMessageText = usernameMessage.querySelector("p");

    usernameForm.addEventListener("submit", event => {
        event.preventDefault();

        const formData = new FormData(usernameForm);

        fetch("app/users/username.php", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(message => {
                handleMessage(message, usernameMessage, usernameMessageText);

                if (message.username) {
                    const currentUsername = document.querySelector(
                        ".change-username--active > p"
                    );

                    currentUsername.textContent = `Current username: ${message.username}`;

                    //Change search of href on profile icon.
                    const profileIcon = document.querySelector(
                        ".menu__icon--profile"
                    );

                    profileIcon.search = `?username=${message.username}`;
                }
            });
    });
}

/**
 * Formhandler for changing email
 */
const changeEmailForm = document.querySelector(".change-email__form");
const changeEmailMessage = document.querySelector(".change-email .message");

if (typeof changeEmailMessage != "undefined" && changeEmailMessage != null) {
    const changeEmailMessageText = changeEmailMessage.querySelector("p");

    changeEmailForm.addEventListener("submit", event => {
        event.preventDefault();

        const formData = new FormData(changeEmailForm);

        fetch("app/users/email.php", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(message => {
                handleMessage(
                    message,
                    changeEmailMessage,
                    changeEmailMessageText
                );

                if (message.email) {
                    const currentEmail = document.querySelector(
                        ".change-email--active > p"
                    );

                    currentEmail.textContent = `Current email adress: ${message.email}`;
                }
            });
    });
}

/**
 * Formhandler for changing password
 */
const changePasswordForm = document.querySelector(".change-password__form");
const changePasswordMessage = document.querySelector(
    ".change-password .message"
);

if (
    typeof changePasswordMessage != "undefined" &&
    changePasswordMessage != null
) {
    const changePasswordMessageText = changePasswordMessage.querySelector("p");

    changePasswordForm.addEventListener("submit", event => {
        event.preventDefault();

        const formData = new FormData(changePasswordForm);

        fetch("app/users/password.php", {
            method: "POST",
            body: formData
        })
            .then(response => response.json())
            .then(message => {
                handleMessage(
                    message,
                    changePasswordMessage,
                    changePasswordMessageText
                );
            });
    });
}
