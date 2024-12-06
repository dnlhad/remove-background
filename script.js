document.getElementById('remove-bg').addEventListener('click', async () => {
    const fileInput = document.getElementById('upload');
    const file = fileInput.files[0];

    if (!file) {
        alert('Silakan pilih gambar terlebih dahulu!');
        return;
    }

    console.log('Mengupload gambar:', file.name); // Log nama file yang diupload

    const formData = new FormData();
    formData.append('image_file', file);
    formData.append('size', 'auto');

    const response = await fetch('https://api.remove.bg/v1.0/removebg', {
        method: 'POST',
        headers: {
            'X-Api-Key': 'RayqdaVRt3wBt5g66DDjSc6E', // Ganti dengan API Key kamu
        },
        body: formData,
    });

    console.log('Respons dari API:', response); // Log respons dari API

    if (response.ok) {
        const blob = await response.blob();
        const img = document.createElement('img');
        img.src = URL.createObjectURL(blob);
        document.getElementById('result').innerHTML = '';
        document.getElementById('result').appendChild(img);
    } else {
        const errorData = await response.json(); // Ambil data error
        alert('Gagal menghapus latar belakang: ' + errorData.message); // Tampilkan pesan error
    }
});