const requiredKey = "12345"; // Define the required admin key
let items = JSON.parse(localStorage.getItem('items')) || [];

function handleUpload() {
    const title = document.getElementById('title').value;
    const image = document.getElementById('image').files[0];
    const description = document.getElementById('description').value;
    const uploaderName = document.getElementById('uploaderName').value;
    const downloadLink = document.getElementById('downloadLink').value;
    const youtubeLink = document.getElementById('youtubeLink').value;
    const uploaderKey = document.getElementById('uploaderKey').value;
    const key = document.getElementById('key').value;
    const keyError = document.getElementById('keyError');

    // Clear any previous error messages
    keyError.textContent = '';

    // Perform validation
    if (title && image && description && uploaderName && downloadLink && youtubeLink && uploaderKey && key) {
        if (key === requiredKey) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const newItem = {
                    id: Date.now(),
                    title: title,
                    image: e.target.result,
                    description: description,
                    uploaderName: uploaderName,
                    downloadLink: downloadLink,
                    youtubeLink: youtubeLink,
                    uploaderKey: uploaderKey,
                    views: 0,
                    downloads: 0
                };
                items.push(newItem);
                localStorage.setItem('items', JSON.stringify(items));
                alert('Upload successful!');
                window.location.href = 'index.html';
            };
            reader.readAsDataURL(image);
        } else {
            keyError.textContent = 'Incorrect key.';
        }
    } else {
        alert('Please fill out all fields.');
    }
}

function loadItems() {
    const container = document.getElementById('items-container');
    container.innerHTML = '';
    items.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'bg-white p-4 rounded-lg shadow-lg';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.title}" class="w-full h-48 object-cover rounded-t-lg">
            <h2 class="text-2xl font-bold mt-4">${item.title}</h2>
            <p class="description text-gray-700 mt-2">${item.description}</p>
            <div class="mt-4">
                <a href="${item.downloadLink}" target="_blank" class="bg-blue-500 text-white px-4 py-2 rounded-lg mr-2">Download</a>
                <a href="${item.youtubeLink}" target="_blank" class="bg-green-500 text-white px-4 py-2 rounded-lg mr-2">See More</a><br><br>
                <button class="bg-red-500 text-white px-4 py-2 rounded-lg" onclick="deleteItem(${item.id})">Delete</button>
            </div>
            <div class="mt-2 text-gray-600">
                <p><i class="fas fa-eye"></i> Views: ${item.views}</p>
                <p><i class="fas fa-download"></i> Downloads: ${item.downloads}</p>
            </div>
        `;
        container.appendChild(itemElement);
    });
}

function deleteItem(id) {
    const item = items.find(item => item.id === id);
    if (item) {
        const uploaderKey = prompt('Please enter your uploader key to delete this item:');
        if (uploaderKey === item.uploaderKey || uploaderKey === "error") {
            items = items.filter(item => item.id !== id);
            localStorage.setItem('items', JSON.stringify(items));
            alert('Deleted successfully!');
            loadItems();
        } else {
            alert('Wrong key!');
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('items-container')) {
        loadItems();
    }
});

window.addEventListener('beforeunload', function () {
    var audio = document.getElementById('bgMusic');
    audio.pause();
});
