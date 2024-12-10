const openNew = () => {
    product.value = {};
    submitted.value = false;
    productDialog.value = true;
};
const hideDialog = () => {
    productDialog.value = false;
    submitted.value = false;
};

const saveProduct = () => {
    submitted.value = true;

    if (product?.value.name?.trim()) {
        if (product.value.id) {
            product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
            products.value[findIndexById(product.value.id)] = product.value;
            toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
        }
        else {
            users.value.id = createId();
            users.value.code = createId();
            users.value.image = 'product-placeholder.svg';
            users.value.push(product.value);
            toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
        }

        productDialog.value = false;
        product.value = {};
    }
};
const editProduct = (prod) => {
    users.value = {...prod};
    productDialog.value = true;
};
const confirmDeleteProduct = (prod) => {
    product.value = prod;
    deleteDialog.value = true;
};
const deleteProduct = () => {
    users.value = users.value.filter(val => val.id !== product.value.id);
    deleteDialog.value = false;
    product.value = {};
    toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
};
const findIndexById = (id) => {
    let index = -1;
    for (let i = 0; i < users.value.length; i++) {
        if (users.value[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
};
const createId = () => {
    let id = '';
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for ( var i = 0; i < 5; i++ ) {
        id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
}
const exportCSV = () => {
    dt.value.exportCSV();
};
const confirmDeleteSelected = () => {
    deleteDialog.value = true;
};

const deleteSelected = () => {
    users.value = products.value.filter(
      val => !selectedProducts.value.includes(val)
    );
    deleteDialog.value = false;
    selectedProducts.value = null;
    toast.add({
      severity:'success', 
      summary: 'Successful',
      detail: 'Products Deleted', 
      life: 3000
    });
};
const handleJsonUpload = (event) => {
  const file = event.files[0];

  if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
          try {
              const jsonData = JSON.parse(e.target.result);
              console.log("Uploaded JSON Data:", jsonData);

              // Process the JSON data
              // Example: Merge with existing data or perform operations
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
  }
};