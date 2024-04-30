document.addEventListener("DOMContentLoaded", function() {
    const darkColor = getCookie("darkColor");
    const lightColor = getCookie("lightColor");
    const darkColorInput = document.getElementById("darkColor");
    const lightColorInput = document.getElementById("lightColor");

    if (darkColorInput && lightColorInput) {
        // Get saved colors from cookies
        const darkColor = getCookie("darkColor");
        const lightColor = getCookie("lightColor");

        // Set color picker values to saved colors
        if (darkColor && lightColor) {
            darkColorInput.value = darkColor;
            lightColorInput.value = lightColor;
        }
    }

    if (darkColor && lightColor) {
        document.documentElement.style.setProperty('--dark', darkColor);
        document.documentElement.style.setProperty('--light', lightColor);
    }

    function getCookie(name) {
        const cookieName = `${name}=`;
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.startsWith(cookieName)) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return null;
    }
});