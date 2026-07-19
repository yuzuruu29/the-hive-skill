const fs = require('fs');
const dir = 'C:\\\\the-hive-skill\\\\hive-ad\\\\src';
fs.readdirSync(dir).forEach(file => {
  if (file.endsWith('.tsx')) {
    let content = fs.readFileSync(`${dir}\\\\${file}`, 'utf8');
    content = content.replace(/import React from 'react';\\n/g, '');
    fs.writeFileSync(`${dir}\\\\${file}`, content);
  }
});
