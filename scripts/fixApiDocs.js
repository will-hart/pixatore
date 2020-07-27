/* eslint-disable @typescript-eslint/no-var-requires */

const glob = require('glob')
const fs = require('fs')

function replaceArrows(path) {
  const dataStr = fs.readFileSync(path, { encoding: 'utf-8' })
  fs.writeFileSync(path, dataStr.replace(/>/g, '&gt;').replace(/</g, '&lt;'))

  console.log('Replaced < and > in ', path)
}

glob('./packages/docs/docs/api/**/*.md', function (err, files) {
  if (err) {
    console.err(err)
    return
  }

  files.forEach(replaceArrows)
})
