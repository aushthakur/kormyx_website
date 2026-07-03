const fs = require('fs');

let footerPath = '/Users/apple/Coding/Kormyx/client/src/components/Footer.jsx';
let content = fs.readFileSync(footerPath, 'utf8');

// A helper to replace specific sections based on a regex that matches the column title
function replaceColumnLinks(content, columnTitle, basePath) {
  const regex = new RegExp(`(<h4[^>]*>${columnTitle}<\\/h4>\\s*)([\\s\\S]*?)(<\\/div>)`, 'g');
  return content.replace(regex, (match, header, linksStr, footer) => {
    let newLinksStr = linksStr.replace(/<a href="#"([^>]*)>(.*?)<\/a>/g, (m, attrs, text) => {
      let slug = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return `<Link to="${basePath}/${slug}"${attrs}>${text}</Link>`;
    });
    return header + newLinksStr + footer;
  });
}

content = replaceColumnLinks(content, 'Products', '/products');
content = replaceColumnLinks(content, 'Solutions', '/solutions');
content = replaceColumnLinks(content, 'Resources', '/resources');
content = replaceColumnLinks(content, 'From Kormyx', '/from-kormyx');
content = replaceColumnLinks(content, 'Support', '/support');
content = replaceColumnLinks(content, 'Company', '/company');
content = replaceColumnLinks(content, 'Follow', '/follow');

fs.writeFileSync(footerPath, content, 'utf8');
console.log('Footer links updated!');
