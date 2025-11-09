<template>
  <div class="preview-panel">
    <div class="preview-tabs">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        :class="['tab-btn', { active: activeTab === tab.id }]"
        @click="activeTab = tab.id"
      >
        {{ tab.label }}
      </button>
    </div>

    <div class="preview-content">
      <div v-if="activeTab === 'yaml'" class="code-preview">
        <div class="preview-header">
          <h4>YAML 预览</h4>
          <button @click="copyCode(yamlContent)" class="btn btn-secondary">复制</button>
        </div>
        <pre><code class="language-yaml">{{ yamlContent }}</code></pre>
      </div>

      <div v-if="activeTab === 'proto'" class="code-preview">
        <div class="preview-header">
          <h4>Protobuf 预览</h4>
          <button @click="copyCode(protoContent)" class="btn btn-secondary">复制</button>
        </div>
        <pre><code class="language-protobuf">{{ protoContent }}</code></pre>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { YamlParser } from '../utils/yamlParser.js'
import { ProtoGenerator } from '../utils/protoGenerator.js'
import hljs from 'highlight.js/lib/core'
import yaml from 'highlight.js/lib/languages/yaml'
import protobuf from 'highlight.js/lib/languages/protobuf'
import 'highlight.js/styles/github.css'

// 注册语言
hljs.registerLanguage('yaml', yaml)
hljs.registerLanguage('protobuf', protobuf)

const props = defineProps({
  template: {
    type: Object,
    required: true
  }
})

const activeTab = ref('yaml')

const tabs = [
  { id: 'yaml', label: 'YAML 格式' },
  { id: 'proto', label: 'Protobuf 格式' }
]

const yamlContent = computed(() => {
  try {
    return YamlParser.stringify(props.template.content)
  } catch (error) {
    return `# 生成YAML时出错:\n# ${error.message}`
  }
})

const protoContent = computed(() => {
  try {
    return ProtoGenerator.generateProto(props.template)
  } catch (error) {
    return `// 生成Protobuf时出错:\n// ${error.message}`
  }
})

const copyCode = async (text) => {
  try {
    await navigator.clipboard.writeText(text)
    alert('代码已复制到剪贴板')
  } catch (error) {
    console.error('复制失败:', error)
  }
}

// 高亮代码
onMounted(() => {
  hljs.highlightAll()
})
</script>

<style scoped>
.preview-panel {
  border: 1px solid #e1e5e9;
  border-radius: 8px;
  background: white;
  overflow: hidden;
}

.preview-tabs {
  display: flex;
  background: #f8f9fa;
  border-bottom: 1px solid #e1e5e9;
}

.tab-btn {
  padding: 12px 24px;
  border: none;
  background: none;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  color: #6c757d;
  font-weight: 500;
}

.tab-btn.active {
  color: #3498db;
  border-bottom-color: #3498db;
  background: white;
}

.tab-btn:hover {
  background: #e9ecef;
}

.preview-content {
  padding: 0;
}

.code-preview {
  height: 400px;
  display: flex;
  flex-direction: column;
}

.preview-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  border-bottom: 1px solid #e1e5e9;
  background: #f8f9fa;
}

.preview-header h4 {
  margin: 0;
  color: #2c3e50;
}

.code-preview pre {
  flex: 1;
  margin: 0;
  padding: 20px;
  overflow: auto;
  background: #f8f9fa;
}

.code-preview code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
  font-size: 13px;
  line-height: 1.5;
}

.btn-secondary {
  background: #6c757d;
  color: white;
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}

.btn-secondary:hover {
  background: #5a6268;
}
</style>