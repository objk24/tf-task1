<template>
  <div class="field-config">
    <div class="field-header">
      <h3>字段配置</h3>
      <button @click="addField" class="btn btn-primary">添加字段</button>
    </div>

    <div class="fields-list">
      <div v-for="(field, index) in fields" :key="index" class="field-item">
        <div class="field-row">
          <div class="field-group">
            <label>字段名:</label>
            <input 
              v-model="field.name" 
              @input="updateTemplate"
              placeholder="字段名称"
            />
          </div>

          <div class="field-group">
            <label>类型:</label>
            <select v-model="field.type" @change="updateTemplate">
              <option value="string">字符串</option>
              <option value="number">数字</option>
              <option value="integer">整数</option>
              <option value="boolean">布尔值</option>
              <option value="date">日期</option>
              <option value="datetime">日期时间</option>
            </select>
          </div>

          <div class="field-group">
            <label class="checkbox-label">
              <input 
                type="checkbox" 
                v-model="field.required" 
                @change="updateTemplate"
              />
              必填
            </label>
          </div>

          <button @click="removeField(index)" class="btn btn-danger">删除</button>
        </div>

        <div class="field-row">
          <div class="field-group full-width">
            <label>约束:</label>
            <input 
              v-model="field.constraints" 
              @input="updateTemplate"
              placeholder="如: unique, min:0, max:100"
            />
          </div>

          <div class="field-group full-width">
            <label>格式:</label>
            <input 
              v-model="field.format" 
              @input="updateTemplate"
              placeholder="如: email, length:2-50"
            />
          </div>
        </div>
      </div>

      <div v-if="fields.length === 0" class="empty-state">
        暂无字段，点击"添加字段"开始配置
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  template: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:template'])

const fields = computed({
  get: () => props.template.content?.fields || [],
  set: (value) => {
    const updated = { ...props.template }
    if (!updated.content) updated.content = {}
    updated.content.fields = value
    emit('update:template', updated)
  }
})

const addField = () => {
  const newField = {
    name: `field_${fields.value.length + 1}`,
    type: 'string',
    required: false,
    constraints: '',
    format: ''
  }
  fields.value = [...fields.value, newField]
}

const removeField = (index) => {
  fields.value = fields.value.filter((_, i) => i !== index)
}

const updateTemplate = () => {
  // 自动触发更新，因为使用了计算属性的setter
}
</script>

<style scoped>
.field-config {
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  padding: 20px;
  background: white;
}

.field-header {
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 20px;
}

.field-header h3 {
  margin: 0;
  color: #2c3e50;
}

.fields-list {
  margin-top: 1rem;
}

.field-item {
  border: 1px solid #e1e5e9;
  border-radius: 6px;
  padding: 16px;
  background: #f8f9fa;
}

.field-row {
  display: flex;
  gap: 12px;
  margin-bottom: 12px;
  align-items: end;
}

.field-row:last-child {
  margin-bottom: 0;
}

.field-group {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.field-group.full-width {
  flex: 2;
}

.field-group label {
  font-size: 12px;
  font-weight: 600;
  margin-bottom: 4px;
  color: #5a6c7d;
}

.field-group input,
.field-group select {
  padding: 8px 12px;
  border: 1px solid #d1d9e2;
  border-radius: 4px;
  font-size: 14px;
}

.checkbox-label {
  flex-direction: row;
  align-items: center;
  gap: 8px;
}

.checkbox-label input {
  margin: 0;
}

.empty-state {
  text-align: center;
  padding: 40px;
  color: #6c757d;
  font-style: italic;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  white-space: nowrap;
}

.btn-primary {
  background: #3498db;
  color: white;
}

.btn-danger {
  background: #e74c3c;
  color: white;
}

.btn:hover {
  opacity: 0.9;
}
</style>