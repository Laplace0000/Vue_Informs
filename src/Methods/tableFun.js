export function openNew() {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
}

export function hideDialog() {
    productDialog.value = false;
    submitted.value = false;
}

export function saveProduct() {
    submitted.value = true;

    if (product?.value.name?.trim()) {
        if (product.value.id) {
            product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
            products.value[findIndexById(product.value.id)] = product.value;
            toast.add({severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        } else {
            users.value.id = createId();
            users.value.code = createId();
            users.value.image = 'product-placeholder.svg';
            users.value.push(product.value);
            toast.add({severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        }

        productDialog.value = false;
        product.value = {};
    }
}

export function editProduct(prod) {
    users.value = { ...prod };
    productDialog.value = true;
}

export function confirmDeleteProduct(prod) {
    product.value = prod;
    deleteDialog.value = true;
}

export function deleteProduct() {
    users.value = users.value.filter(val => val.id !== product.value.id);
    deleteDialog.value = false;
    product.value = {};
    toast.add({severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
}

export function findIndexById(id) {
    let index = -1;
    for (let i = 0; i < users.value.length; i++) {
        if (users.value[i].id === id) {
            index = i;
            break;
        }
    }
    return index;
}

export function createId() {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 5; i++) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}

export function exportCSV(dt) {
    dt.exportCSV();
}

export function confirmDeleteSelected() {
    deleteDialog.value = true;
}

export function deleteSelected() {
    users.value = products.value.filter(
        val => !selectedProducts.value.includes(val)
    );
    deleteDialog.value = false;
    selectedProducts.value = null;
    toast.add({
        severity: 'success',
        summary: 'Successful',
        detail: 'Products Deleted',
        life: 3000
    });
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
