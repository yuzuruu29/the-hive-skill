const fs = require('fs');
const path = 'C:\\\\Users\\\\uzzie\\\\.gemini\\\\config\\\\skills';
const items = fs.readdirSync(path).filter(f => {
  try {
    return fs.statSync(`${path}\\\\${f}`).isDirectory() && !f.startsWith('.');
  } catch(e) {
    return false;
  }
});
fs.writeFileSync('src/skillsData.json', JSON.stringify(items));
console.log('Generated skillsData.json with ' + items.length + ' skills.');
