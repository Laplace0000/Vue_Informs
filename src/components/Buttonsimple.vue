<template>
    <button @click="handleClick" :class="buttonClass">
      <slot>Default Button</slot>
    </button>
  </template>
  
  <script>
  export default {
    name: "MyButton",
    props: {
      buttonClass: {
        type: String,
        default: "btn-primary", // Default class for styling
      },
    },
    methods: {
      handleClick() {
        this.$emit("click"); // Emit click event to the parent
      },
    },
  };
  </script>
  
  <style>
  /* Example button styles */
  .btn-primary {
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  .btn-primary:hover {
    background-color: #0056b3;
  }
  </style>
  