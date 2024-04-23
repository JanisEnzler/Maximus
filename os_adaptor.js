// Function to detect the user's operating system
function detectOS() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Android detection
    if (/android/i.test(userAgent)) {
        return "Android";
    }

    // iOS detection
    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
        return "iOS";
    }

    // Default if no match
    return "Unknown";
}

// Function to adapt HTML based on the operating system
function adaptHTML() {
    const os = detectOS();
    const models = document.querySelector("#models");

    // Adds 3D model references for android
    if (os === "Android") {
        htmlFilePath = "android.html";

    // Adds 3D model references for ios
    } else if (os === "iOS") {
        htmlFilePath = "ios.html";
    
    // Tells the User to switch to a phone
    } else {
        models.innerHTML = '<p>Switch to an Android device or an IPhone to use the AR feature</p>';
    }

    // Load HTML content dynamically based on the detected OS
    fetch(htmlFilePath)
        .then(response => response.text())
        .then(html => {
            // Insert the loaded HTML content into the section
            models.innerHTML = html;
        })
        .catch(error => {
            console.error("Error fetching HTML:", error);
        });
}

// Call the adaptHTML function when the page loads
window.onload = adaptHTML;