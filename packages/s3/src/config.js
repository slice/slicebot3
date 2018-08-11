import fs from 'fs'
import toml from 'toml'

export function read(filename) {
  const content = fs.readFileSync(filename, 'utf-8')
  return toml.parse(content)
}
