<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    <UNotifications />
  </div>
  <!-- <fs-form-provider> -->
  <!-- </fs-form-provider> -->
</template>

<style>
/* Force light mode */
:root {
  color-scheme: light;
}

html {
  color-scheme: light;
}

body {
  color-scheme: light;
  background-color: #ffffff;
  color: #000000;
}

/* Override dark mode classes */
.dark {
  color-scheme: light !important;
  background-color: #ffffff !important;
  color: #000000 !important;
}

/* Ensure Element Plus uses light mode */
.el-button,
.el-input,
.el-select,
.el-card,
.el-dialog,
.el-message,
.el-notification {
  --el-bg-color: #ffffff !important;
  --el-text-color-primary: #000000 !important;
  --el-border-color: #dcdfe6 !important;
}
</style>

<style scoped>
/* You can customise the default animation here. */

/* ::view-transition-old(root) {
  animation: 90ms cubic-bezier(0.4, 0, 1, 1) both fade-out;
}

::view-transition-new(root) {
  animation: 210ms cubic-bezier(0, 0, 0.2, 1) 90ms both fade-in;
} */
</style>