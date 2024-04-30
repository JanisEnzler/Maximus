document.addEventListener("DOMContentLoaded", function() {
    const colorForm = document.getElementById("colorForm");
    const resetButton = document.getElementById("resetColors");
    
    colorForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const darkColor = document.getElementById("darkColor").value;
        const lightColor = document.getElementById("lightColor").value;

        setCookie("darkColor", darkColor, 30);
        setCookie("lightColor", lightColor, 30);

        location.reload();
    });

    resetButton.addEventListener("click", function() {
        deleteCookie("darkColor");
        deleteCookie("lightColor");

        location.reload();
    });

    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
    }

    function deleteCookie(name) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;`;
    }
});