import * as yaml from 'js-yaml'

export class YamlParser {
  static parse(yamlString) {
    try {
      return yaml.load(yamlString)
    } catch (error) {
      throw new Error(`YAML解析错误: ${error.message}`)
    }
  }

  static stringify(object) {
    try {
      return yaml.dump(object, {
        indent: 2,
        lineWidth: -1 // 不限制行宽
      })
    } catch (error) {
      throw new Error(`YAML序列化错误: ${error.message}`)
    }
  }

  static validate(yamlString) {
    try {
      yaml.load(yamlString)
      return { valid: true, error: null }
    } catch (error) {
      return { valid: false, error: error.message }
    }
  }
}