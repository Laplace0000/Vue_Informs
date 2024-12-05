
<script>
import { DataTable, Column, FileUpload, Toolbar, Button, InputText } from 'primevue';
import { FilterMatchMode } from '@primevue/core/api';
import { ref, onMounted } from 'vue'; // Import onMounted and ref


export default {
  props: {
    users: {
      type: String,
      required: true,
    },
  },
  components: {
    Toolbar,
    Button,
    InputText,
    Column,
    DataTable,
    FileUpload,
  },
  setup(props) {
    const deleteDialog = ref(false);
    const users = ref([]);
    const Products = ref([]);
    const columns = ref([]);
    const dt = ref();
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const fetchData = async () => {
      try {
        const response = await fetch(props.users); // Fetch the data from the prop path
        const data = await response.json(); // Parse and assign the data
        users.value = data; // Assign the fetched data to the users ref
        
        if (data.length > 0) {
          columns.value = Object.keys(data[0]).map((key) => ({
            field: key,
            header: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize key for header
            sortable: true,
          }));
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };


    onMounted(() => {
      fetchData(); // Trigger the data fetch when the component is mounted
    });

    const clearFilter = () => {
      filters.value = {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      };
    };
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

          reader.readAsText(file);
      }
    };



    return {
      users,
      columns,
      filters, 
      clearFilter, 
      openNew, 
      hideDialog, 
      saveProduct, 
      editProduct, 
      exportCSV,
      confirmDeleteProduct,
      deleteProduct,
      confirmDeleteSelected,
      handleJsonUpload,
      deleteSelected,
      dt
     };
  },
};
</script>

<template>
  <div class="card">

    <Toolbar class="mb-6">
      <template #start>
          <Button label="New" icon="pi pi-plus" class="mr-2" @click="openNew" />
          <Button label="Delete" icon="pi pi-trash" severity="danger" outlined @click="confirmDeleteSelected" :disabled="!selectedProducts || !selectedProducts.length" />
      </template>

      <template #end>
          <FileUpload mode="basic" accept="application/json" :maxFileSize="1000000" label="Import" customUpload chooseLabel="Import" class="mr-2" auto :chooseButtonProps="{ severity: 'secondary' }" />
          <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
      </template>
    </Toolbar>

    <div class="flex justify-between mb-2">
      <InputText v-model="filters['global'].value" placeholder="Search Entries..." />
    </div>
    <DataTable
      ref="dt"
      :value="users"
      :filters="filters"
      :globalFilterFields="columns.map(col => col.field)"
      :selection="selectedProduct"
      stripedRows
      sortMode="multiple"
      removableSort
      paginator
      :rows="5"
      tableStyle="min-width: 50rem"
    >
    <Column selectionMode="multiple" headerStyle="width: 3rem"></Column>
    <Column
      v-for="(column, index) in columns"
      :key="index"
      :field="column.field"
      :header="column.header"
      :sortable="column.sortable"
    ></Column>


    </DataTable>        
    <Column :exportable="false" style="min-width: 12rem">
      <template #body="slotProps">
          <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
          <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
      </template>
    </Column>
  </div>
  <Dialog v-model:visible="deleteDialog" :style="{ width: '450px' }" header="Confirm" :modal="true">
    <div class="flex items-center gap-4">
      <i class="pi pi-exclamation-triangle !text-3xl" />
      <span v-if="product">Are you sure you want to delete the selected products?</span>
    </div>
    <template #footer>
      <Button label="No" icon="pi pi-times" text @click="deleteDialog = false" />
      <Button label="Yes" icon="pi pi-check" text @click="deleteSelected" />
    </template>
  </Dialog>
</template>
