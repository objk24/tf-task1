export class ProtoGenerator {
  static generateProto(template) {
    if (!template?.content?.fields) {
      return '// 无字段定义'
    }

    const templateName = template.name.replace(/\s+/g, '') + 'Template'
    let protoCode = `syntax = "proto3";\n\n`
    protoCode += `message ${templateName} {\n`

    template.content.fields.forEach((field, index) => {
      const protoType = this.mapToProtoType(field.type)
      const fieldNumber = index + 1
      const required = field.required ? ' // required' : ''
      
      protoCode += `  ${protoType} ${field.name} = ${fieldNumber};${required}\n`
    })

    protoCode += '}'

    return protoCode
  }

  static mapToProtoType(type) {
    const typeMap = {
      string: 'string',
      number: 'double',
      integer: 'int32',
      boolean: 'bool',
      date: 'string',
      datetime: 'string'
    }
    return typeMap[type] || 'string'
  }
}