<template>
  <div class="template-list">
    <div class="list-header">
      <h2>模板列表</h2>
      <button @click="createNew" class="btn btn-primary">新建模板</button>
    </div>

    <div class="search-bar">
      <input 
        v-model="searchQuery"
        placeholder="搜索模板名称..."
        class="search-input"
      />
    </div>

    <div class="templates-grid">
      <div 
        v-for="template in filteredTemplates" 
        :key="template.id"
        :class="['template-card', { active: isActive(template) }]"
        @click="selectTemplate(template)"
      >
        <div class="card-header">
          <h3>{{ template.name }}</h3>
          <div class="card-actions">
            <button 
              @click.stop="deleteTemplate(template.id)" 
              class="btn-icon"
              title="删除"
            >
              🗑️
            </button>
          </div>
        </div>
        
        <p class="description">{{ template.description || '暂无描述' }}</p>
        
        <div class="card-footer">
          <span class="format-badge">{{ template.format.toUpperCase() }}</span>
          <span class="create-time">{{ template.createdAt }}</span>
        </div>

        <div class="field-count">
          {{ template.content?.fields?.length || 0 }} 个字段
        </div>
      </div>

      <div v-if="filteredTemplates.length === 0" class="empty-state">
        {{ searchQuery ? '未找到匹配的模板' : '暂无模板，点击"新建模板"开始创建' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  templates: {
    type: Array,
    required: true
  },
  currentTemplate: {
    type: Object,
    default: null
  }
})

const emit = defineEmits([
  'select',
  'delete',
  'create-new'
])

const searchQuery = ref('')

const filteredTemplates = computed(() => {
  if (!searchQuery.value) {
    return props.templates
  }
  
  const query = searchQuery.value.toLowerCase()
  return props.templates.filter(template => 
    template.name.toLowerCase().includes(query) ||
    template.description.toLowerCase().includes(query)
  )
})

const isActive = (template) => {
  return props.currentTemplate?.id === template.id
}

const selectTemplate = (template) => {
  emit('select', template)
}

const deleteTemplate = (id) => {
  if (confirm('确定要删除这个模板吗？')) {
    emit('delete', id)
  }
}

const createNew = () => {
  emit('create-new')
}
</script>

<style scoped>
.template-list {
  height: 100%;
  background: white;
  border-right: 1px solid #e1e5e9;
  display: flex;
  flex-direction: column;
}

.list-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #e1e5e9;
}

.list-header h2 {
  margin: 0;
  color: #2c3e50;
}

.search-bar {
  padding: 16px 20px;
  border-bottom: 1px solid #e1e5e9;
}

.search-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d9e2;
  border-radius: 4px;
  font-size: 14px;
}

.templates-grid {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.template-card {
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.2s;
  background: white;
  position: relative;
}

.template-card:hover {
  border-color: #3498db;
  box-shadow: 0 2px 8px rgba(52, 152, 219, 0.1);
}

.template-card.active {
  border-color: #3498db;
  background: #f8fafc;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 8px;
}

.card-header h3 {
  margin: 0;
  font-size: 16px;
  color: #2c3e50;
  flex: 1;
}

.card-actions {
  display: flex;
  gap: 4px;
}

.btn-icon {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  border-radius: 3px;
  font-size: 12px;
}

.btn-icon:hover {
  background: #e9ecef;
}

.description {
  margin: 0 0 12px 0;
  color: #6c757d;
  font-size: 14px;
  line-height: 1.4;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.format-badge {
  background: #e3f2fd;
  color: #1976d2;
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 600;
}

.create-time {
  color: #6c757d;
  font-size: 12px;
}

.field-count {
  position: absolute;
  top: 16px;
  right: 16px;
  background: #3498db;
  color: white;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 11px;
  font-weight: 600;
}

.empty-state {
  text-align: center;
  padding: 40px 20px;
  color: #6c757d;
  font-style: italic;
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

.btn:hover {
  opacity: 0.9;
}
</style>