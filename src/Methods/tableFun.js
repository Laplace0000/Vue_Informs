export function openNew() {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
}

export function hideDialog() {
    productDialog.value = false;
    submitted.value = false;
}


export function deleteObjects0(allData, objects) {
    if (!Array.isArray(allData.value) || !Array.isArray(objects.value)) {
        throw new Error("Both allData.value and objects.value must be arrays.");
    }
    updatedData.value = allData.value.filter(val => !objects.value.includes(val));
    console.log('deleting objects', objects);
    objects.value = null;
    return updatedData.value;
}
function deleteObjects1() {
    if (!Array.isArray(objects.value) || !Array.isArray(selectedObjects.value)) {
          throw new Error("Both allData.value and objects.value must be arrays.");
      }
      objects.value = objects.value.filter(val => !selectedObjects.value.includes(val));
      selectedObjects.value = null;
  }

const deleteObjects2 = () => {
    if (!selectedObjects.value || !selectedObjects.value.length) {
        toast.add({ severity: 'warn', summary: 'Warning', detail: 'No objects selected', life: 3000 });
        return;
    }

    // Filter out the selected objects from the userData
    objects.value = objects.value.filter(
        obj => !selectedObjects.value.some(selected => selected.id === obj.id)
    );

    // Clear the selection
    selectedObjects.value = [];

    // Show success message
    toast.add({ severity: 'success', summary: 'Successful', detail: 'Selected Objects Deleted', life: 3000 });
};


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
