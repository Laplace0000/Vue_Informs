export function openNew() {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
}

export function hideDialog() {
    productDialog.value = false;
    submitted.value = false;
}


export function deleteObjects(objects){
    console.log('deleting objects', objects);

}

export function exportCSV(dt) {
    dt.exportCSV();
}

export function handleJsonUpload(event) {
    const file = event.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            try {
                const jsonData = JSON.parse(e.target.result);
                console.log("Uploaded JSON Data:", jsonData);

                // Process the JSON data
                products.value = [...products.value, ...jsonData];
                toast.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'JSON data uploaded successfully',
                    life: 3000,
                });
            } catch (error) {
                console.error("Error parsing JSON file:", error);
                toast.add({
                    severity: 'error',
                    summary: 'Error',
                    detail: 'Invalid JSON file',
                    life: 3000,
                });
            }
        };
        reader.readAsText(file);
    }
}
