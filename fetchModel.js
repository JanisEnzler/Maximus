window.onload = async function() {
    const container = document.getElementById('modelContainer');
  
    // Fetch information about the contents of the gltf folder from the GitHub API
    const response = await fetch('https://api.github.com/repos/JanisEnzler/Maximus/contents/gltf');
    const data = await response.json();
  
    // Loop through each item in the gltf folder
    for (const item of data) {
      if (item.type === 'dir') { // Check if the item is a directory
        // Fetch information about the contents of the subfolder
        const subfolderResponse = await fetch(item.url);
        const subfolderData = await subfolderResponse.json();
  
        // Find the .gltf file in the subfolder
        const gltfFile = subfolderData.find(file => file.name.endsWith('.gltf'));
  
        // If a .gltf file is found
        if (gltfFile) {
          // Extract the parent folder name from the .gltf file path
          const parentFolderName = gltfFile.path.split('/')[1];
  
          // Construct the URL for the thumbnail using the parent folder name
          const thumbnailSrc = `/img/${parentFolderName}_thumbnail.jpg`;
  
          // Construct the URL for the model
          const modelLink = `intent://arvr.google.com/scene-viewer/1.0?file=${gltfFile.download_url}#Intent;scheme=https;package=com.google.android.googlequicksearchbox;action=android.intent.action.VIEW;end;`;
  
          // Create the anchor element with the model link
          const modelAnchor = document.createElement('a');
          modelAnchor.href = modelLink;
  
          // Create the image element with the thumbnail
          const thumbnailImg = document.createElement('img');
          thumbnailImg.src = thumbnailSrc;
          thumbnailImg.alt = parentFolderName; // Set alt attribute to folder name
          thumbnailImg.width = 200;
          thumbnailImg.height = 200;
          thumbnailImg.classList.add('item');
  
          // Append the image element to the anchor element
          modelAnchor.appendChild(thumbnailImg);
  
          // Append the anchor element to the container
          container.insertBefore(modelAnchor, container.firstChild);
        }
      }
    }
  };
  