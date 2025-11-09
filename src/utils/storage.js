const STORAGE_KEY = 'metadata-templates'

export const storage = {
  save(templates) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(templates))
    } catch (error) {
      console.error('保存模板失败:', error)
    }
  },

  load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY)
      return data ? JSON.parse(data) : null
    } catch (error) {
      console.error('加载模板失败:', error)
      return null
    }
  },

  clear() {
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch (error) {
      console.error('清除模板失败:', error)
    }
  }
}