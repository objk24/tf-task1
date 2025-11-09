<template>
  <div class="template-editor">
    <div class="editor-header">
      <h2>{{ isEditing ? '编辑模板' : '新建模板' }}</h2>
      <div class="header-actions">
        <button @click="reset" class="btn btn-secondary">重置</button>
        <button @click="save" class="btn btn-primary">保存</button>
      </div>
    </div>

    <div v-if="editingTemplate" class="editor-content">
      <div class="template-info">
        <div class="form-group">
          <label>模板名称:</label>
          <input 
            v-model="editingTemplate.name" 
            placeholder="输入模板名称"
          />
        </div>

        <div class="form-group">
          <label>描述:</label>
          <textarea 
            v-model="editingTemplate.description" 
            placeholder="输入模板描述"
            rows="3"
          />
        </div>

        <div class="form-group">
          <label>格式:</label>
          <select v-model="editingTemplate.format">
            <option value="yaml">YAML</option>
            <option value="xml">XML</option>
          </select>
        </div>
      </div>

      <FieldConfig 
        :template="editingTemplate"
        @update:template="updateEditingTemplate"
      />

      <PreviewPanel :template="editingTemplate" />
    </div>

    <div v-else class="empty-editor">
      <p>请选择一个模板或创建新模板开始编辑</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import FieldConfig from './FieldConfig.vue'
import PreviewPanel from './PreviewPanel.vue'

const props = defineProps({
  editingTemplate: {
    type: Object,
    default: null
  },
  isEditing: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['save', 'reset'])

const save = () => {
  if (!props.editingTemplate?.name) {
    alert('请输入模板名称')
    return
  }
  emit('save')
}

const reset = () => {
  emit('reset')
}

const updateEditingTemplate = (updatedTemplate) => {
  Object.assign(props.editingTemplate, updatedTemplate)
}
</script>

<style scoped>
.template-editor {
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
}

.editor-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e1e5e9;
  background: white;
}

.editor-header h2 {
  margin: 0;
  color: #2c3e50;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.editor-content {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.template-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  background: white;
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  padding: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.form-group:last-child {
  grid-column: 1 / -1;
}

.form-group label {
  font-weight: 600;
  margin-bottom: 8px;
  color: #5a6c7d;
}

.form-group input,
.form-group textarea,
.form-group select {
  padding: 8px 12px;
  border: 1px solid #d1d9e2;
  border-radius: 4px;
  font-size: 14px;
}

.form-group textarea {
  resize: vertical;
  min-height: 60px;
}

.empty-editor {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 16px;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-secondary {
  background: #6c757d;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}
</style>