const fs = require('fs');
const files = [
  'criacao-de-sites-profissionais-no-rio-de-janeiro.html',
  'especialista-em-seo-rio-de-janeiro.html',
  'google-meu-negocio-para-empresas.html',
  'index.html'
];
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  
  content = content.replace(/opacity-100 -z-20/g, 'opacity-15 -z-20');
  content = content.replace(/opacity-100 object-left/g, 'opacity-15 object-left');

  fs.writeFileSync(file, content);
});
console.log('Background transparency applied to all pages.');
