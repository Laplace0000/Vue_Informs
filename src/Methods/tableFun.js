import { nextTick } from 'vue';
import { inject } from 'vue';


export function openNew(object, objectDialog, submitted) {
    object = {};
    objectDialog = true;
    submitted = false;
    return {object: object, objectDialog: objectDialog, submitted: submitted};
}


export function hideDialog (objectDialog, submitted){

  objectDialog = false;
  submitted = false;

  return {objectDialog: objectDialog, submitted: submitted};
};


export function createID0(objects) {
  return objects.value.length
      ? Math.max(...objects.value.map(obj => obj.id)) + 1
      : 1;
}


//med tilfældige id'er seje hashmaps og sådan så vi undgår dubletter     bygger nyt hashmap hver gang hvilket jo kan blive en smule træslt i længden
export function createID1(objects) {
  // Extract existing IDs from objects
  const idList = objects.value.map(obj => obj.id);

  // make hashmap 
  const hashmap = {};
  for (const num of idList) {
    hashmap[num] = true;
  }

  // generate a new random 8 cifre ID
  function generateID() {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 8; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  let id = generateID();
  while (hashmap[id] === true) {
    id = generateID(); // Generate a new ID if duplicate is found
  }

  return id;
}

//ny version af createID1 der bruger et existerende hashmap
export function createID2() {
  // Access global hashmap (see main.js)
  const hashmap = inject('dataIDs');

  // Generate random 8-character ID
  function generateID() {
    let id = '';
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 8; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }

  let id = generateID();
  while (hashmap[id] === true) {
    id = generateID(); // Generate a new ID if duplicate is found
  }

  // add the new ID to the hashmap
  hashmap[id] = true;

  return id;
}


export async function deleteObjects0(objects, selectedObjects) { 
    console.log('deleting', selectedObjects.value)
    if (!selectedObjects.value || !selectedObjects.value.length) {
        toast.add({ severity: 'warn', summary: 'Warning', detail: 'No objects selected', life: 3000 });
        return;
    }

    // Filter out the selected objects from the userData
    objects.value = objects.value.filter(
        obj => !selectedObjects.value.some(selected => selected.id === obj.id)
    );

    await nextTick();
    console.log('new state:', objects.value);


    // Clear the selection
    selectedObjects.value = [];


    return objects.value;
}

export function exportCSV(objects) {
    objects.exportCSV();
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



// Table-related functions
export function addRow(context, token, endpoint, postData) {
  if (context.validateFields(context.newRow, 'add')) {
    const newRowData = { ...context.newRow };
    delete newRowData.id;

    postData(token, endpoint, newRowData)
      .then(responseId => {
        newRowData.id = responseId || context.generateUUID();
        context.tableData.push(newRowData);
        context.resetNewRow();
        context.showAddOverlay = false;
      })
      .catch(error => console.error('Error adding row:', error));
  }
}

export function startAdd(context) {
  context.resetNewRow();
  context.errors.add = '';
  context.showAddOverlay = true;
}

export function resetNewRow(context) {
  context.newRow = { id: '', field1: '', field2: '', field3: '' };
}

export function startEdit(context, rowIndex) {
  context.editingRowIndex = rowIndex;
  context.editingRow = { ...context.tableData[rowIndex] };
  context.errors.edit = '';
  context.showEditOverlay = true;
}

export function updateRow(context, token, endpoint, putData) {
  if (context.validateFields(context.editingRow, 'edit')) {
    if (context.editingRowIndex !== null) {
      Vue.set(
        context.tableData,
        context.editingRowIndex,
        { ...context.editingRow }
      );

      const json = context.tableData[context.editingRowIndex];
      putData(token, `${endpoint}`, json.id, JSON.stringify(json));
    }
    context.cancelEdit();
  }
}

export function cancelEdit(context) {
  context.editingRowIndex = null;
  context.editingRow = { id: '', field1: '', field2: '', field3: '' };
  context.showEditOverlay = false;
}

export function confirmDelete(context, rowIndex) {
  context.deletingRowIndex = rowIndex;
  context.showDeleteConfirmation = true;
}

export function deleteRow(context, token, endpoint, deleteData) {
  const json = context.tableData[context.deletingRowIndex];
  deleteData(token, `${endpoint}`, json.id);
  context.tableData.splice(context.deletingRowIndex, 1);
  context.cancelDelete();
}

export function cancelDelete(context) {
  context.deletingRowIndex = null;
  context.showDeleteConfirmation = false;
}
