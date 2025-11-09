import { ref, computed } from 'vue'
// 模拟数据
const initialTemplates = [
  {
    id: '1',
    name: '用户信息模板',
    description: '用户基本信息定义',
    createdAt: '2024-01-15',
    format: 'yaml',
    content: {
      fields: [
        { name: 'id', type: 'string', required: true, constraints: 'unique' },
        { name: 'name', type: 'string', required: true, format: 'length:2-50' },
        { name: 'age', type: 'number', required: false, constraints: 'min:0,max:150' },
        { name: 'email', type: 'string', required: true, format: 'email' }
      ]
    }
  }
]
export function useTemplateStore() {
  const templates = ref(initialTemplates)
  const currentTemplate = ref(null)
  const editingTemplate = ref(null)

  const addTemplate = (template) => {
    const newTemplate = {
      ...template,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0]
    }
    templates.value.push(newTemplate)
    return newTemplate
  }

  const updateTemplate = (id, updates) => {
    const index = templates.value.findIndex(t => t.id === id)
    if (index !== -1) {
      templates.value[index] = { ...templates.value[index], ...updates }
    }
  }

  const deleteTemplate = (id) => {
    templates.value = templates.value.filter(t => t.id !== id)
    if (currentTemplate.value?.id === id) {
      currentTemplate.value = null
    }
  }

  const setCurrentTemplate = (template) => {
    currentTemplate.value = template
    editingTemplate.value = template ? JSON.parse(JSON.stringify(template)) : null
  }

  const saveCurrentTemplate = () => {
    if (editingTemplate.value) {
      if (editingTemplate.value.id) {
        updateTemplate(editingTemplate.value.id, editingTemplate.value)
      } else {
        const newTemplate = addTemplate(editingTemplate.value)
        editingTemplate.value.id = newTemplate.id
      }
      currentTemplate.value = JSON.parse(JSON.stringify(editingTemplate.value))
    }
  }

  const resetTemplate = () => {
    editingTemplate.value = currentTemplate.value 
      ? JSON.parse(JSON.stringify(currentTemplate.value))
      : null
  }

  const createNewTemplate = () => {
    const newTemplate = {
      id: null,
      name: '新模板',
      description: '',
      format: 'yaml',
      content: { fields: [] }
    }
    setCurrentTemplate(newTemplate)
  }

  return {
    templates: computed(() => templates.value),
    currentTemplate: computed(() => currentTemplate.value),
    editingTemplate,
    addTemplate,
    updateTemplate,
    deleteTemplate,
    setCurrentTemplate,
    saveCurrentTemplate,
    resetTemplate,
    createNewTemplate
  }
}