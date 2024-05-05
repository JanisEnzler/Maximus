document.addEventListener("DOMContentLoaded", function() {
    const colorForm = document.getElementById("colorForm");
    const resetButton = document.getElementById("resetColors");
    
    colorForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const darkColor = document.getElementById("darkColor").value;
        const lightColor = document.getElementById("lightColor").value;

        var contrastRatio = getContrast(darkColor, lightColor);

        // Check if contrast meets W3C standards
        if (contrastRatio < 4.5) {
        // Contrast ratio doesn't meet standards, show notification
        alert('The color contrast is too low.');
        return;
    }

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

    function getContrast(hexcolor1, hexcolor2) {
        // Convert hex colors to RGB
        function hexToRgb(hex) {
            var r = parseInt(hex.slice(1, 3), 16),
                g = parseInt(hex.slice(3, 5), 16),
                b = parseInt(hex.slice(5, 7), 16);
            return [r, g, b];
        }
    
        // Calculate luminance
        function luminance(r, g, b) {
            var a = [r, g, b].map(function (v) {
                v /= 255;
                return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
            });
            return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
        }
    
        var rgb1 = hexToRgb(hexcolor1);
        var rgb2 = hexToRgb(hexcolor2);
    
        var lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
        var lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
    
        // Calculate contrast ratio
        var contrast = (Math.max(lum1, lum2) + 0.05) / (Math.min(lum1, lum2) + 0.05);
    
        return contrast;
    }
});