
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
    const users = ref([]);
    const filters = ref({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });

    const fetchData = async () => {
      try {
        const response = await fetch(props.users); // Fetch the data from the prop path
        users.value = await response.json(); // Parse and assign the data
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
                product.value.id = createId();
                product.value.code = createId();
                product.value.image = 'product-placeholder.svg';
                product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
                products.value.push(product.value);
                toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
            }

            productDialog.value = false;
            product.value = {};
        }
    };
    const editProduct = (prod) => {
        product.value = {...prod};
        productDialog.value = true;
    };
    const confirmDeleteProduct = (prod) => {
        product.value = prod;
        deleteProductDialog.value = true;
    };
    const deleteProduct = () => {
        products.value = products.value.filter(val => val.id !== product.value.id);
        deleteProductDialog.value = false;
        product.value = {};
        toast.add({severity:'success', summary: 'Successful', detail: 'Product Deleted', life: 3000});
    };
    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.value.length; i++) {
            if (products.value[i].id === id) {
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
        deleteProductsDialog.value = true;
    };
    const deleteSelectedProducts = () => {
        products.value = products.value.filter(val => !selectedProducts.value.includes(val));
        deleteProductsDialog.value = false;
        selectedProducts.value = null;
        toast.add({severity:'success', summary: 'Successful', detail: 'Products Deleted', life: 3000});
    };

    const getStatusLabel = (status) => {
        switch (status) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warn';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    return {
      users,
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
      deleteSelectedProducts,
      getStatusLabel
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
          <FileUpload mode="basic" accept="image/*" :maxFileSize="1000000" label="Import" customUpload chooseLabel="Import" class="mr-2" auto :chooseButtonProps="{ severity: 'secondary' }" />
          <Button label="Export" icon="pi pi-upload" severity="secondary" @click="exportCSV($event)" />
      </template>
    </Toolbar>

    <div class="flex justify-between mb-2">
      <InputText v-model="filters['global'].value" placeholder="Search Entries..." />
    </div>
    <DataTable
      :value="users"
      :filters="filters"
      :globalFilterFields="['id', 'name', 'username', 'email']"
      stripedRows
      sortMode="multiple"
      removableSort
      paginator
      :rows="5"
      tableStyle="min-width: 50rem"
    >
      <Column field="id" header="ID" sortable></Column>
      <Column field="name" header="Name" sortable></Column>
      <Column field="username" header="Username" sortable></Column>
      <Column field="email" header="Email" sortable></Column>
    </DataTable>
    <Column :exportable="false" style="min-width: 12rem">
      <template #body="slotProps">
          <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" />
          <Button icon="pi pi-trash" outlined rounded severity="danger" @click="confirmDeleteProduct(slotProps.data)" />
      </template>
    </Column>



  </div>
</template>
