<template>
  <div class="app">
    <header class="app-header">
      <h1>元数据模板管理系统</h1>
    </header>

    <main class="app-main">
      <div class="sidebar">
        <TemplateList 
          :templates="templates"
          :current-template="currentTemplate"
          @select="setCurrentTemplate"
          @delete="deleteTemplate"
          @create-new="createNewTemplate"
        />
      </div>

      <div class="main-content">
        <TemplateEditor 
          :editing-template="editingTemplate"
          :is-editing="!!currentTemplate"
          @save="saveTemplate"
          @reset="resetTemplate"
        />
      </div>
    </main>
  </div>
</template>

<script setup>
import { useTemplateStore } from './stores/templateStore.js'
import TemplateList from './components/TemplateList.vue'
import TemplateEditor from './components/TemplateEditor.vue'

const {
  templates,
  currentTemplate,
  editingTemplate,
  setCurrentTemplate,
  deleteTemplate,
  saveCurrentTemplate,
  resetTemplate: resetStoreTemplate,
  createNewTemplate
} = useTemplateStore()

const saveTemplate = () => {
  saveCurrentTemplate()
  alert('模板保存成功！')
}

const resetTemplate = () => {
  resetStoreTemplate()
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  background: #f5f7fa;
  color: #2c3e50;
}

.app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  background: white;
  border-bottom: 1px solid #e1e5e9;
  padding: 16px 24px;
}

.app-header h1 {
  font-size: 24px;
  font-weight: 600;
  color: #2c3e50;
}

.app-main {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.sidebar {
  width: 350px;
  min-width: 350px;
  background: white;
}

.main-content {
  flex: 1;
  background: #f8f9fa;
}

/* 滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>