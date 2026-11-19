const config = window.PROPOSTA
const menu = document.querySelector('#menu')
const nav = document.querySelector('#links')
function closeMenu() {
  menu.setAttribute('aria-expanded', 'false')
}
menu.addEventListener('click', () => {
  menu.setAttribute('aria-expanded', String(menu.getAttribute('aria-expanded') === 'false'))
})
nav.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu()
})
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
    closeMenu()
    menu.focus()
  }
})

const progress = document.querySelector('.progress')
function updateProgress() {
  const distance = document.documentElement.scrollHeight - innerHeight
  progress.style.transform = 'scaleX(' + (distance > 0 ? Math.min(1, Math.max(0, scrollY / distance)) : 0) + ')'
}
addEventListener('scroll', updateProgress, { passive: true })
addEventListener('resize', updateProgress)
new ResizeObserver(updateProgress).observe(document.body)
updateProgress()

const tabs = Array.from(document.querySelectorAll('[role="tab"]'))
const panel = document.querySelector('#demo')
const descriptions = [
  'Conheça como a Veent Payment pode apoiar as rotinas de pessoal da sua empresa.',
  'Conheça como a Veent Payment pode apoiar a organização contábil da sua empresa.',
  'Conheça como a Veent Payment pode apoiar a gestão de obrigações fiscais e tributárias.',
  'Conheça como a Veent Payment pode apoiar o planejamento e a tomada de decisões da sua empresa.',
]
function selectTab(index) {
  tabs.forEach((tab, i) => {
    tab.setAttribute('aria-selected', String(i === index))
    tab.tabIndex = i === index ? 0 : -1
  })
  panel.setAttribute('aria-labelledby', tabs[index].id)
  panel.querySelector('h3').textContent = tabs[index].textContent
  panel.querySelector('p').textContent = descriptions[index]
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectTab(index))
  tab.addEventListener('keydown', (event) => {
    const next = {
      ArrowRight: (index + 1) % tabs.length,
      ArrowLeft: (index + tabs.length - 1) % tabs.length,
      Home: 0,
      End: tabs.length - 1,
    }[event.key]
    if (next === undefined) return
    event.preventDefault()
    selectTab(next)
    tabs[next].focus({ preventScroll: true })
  })
})
function image(source, alt) {
  const node = document.createElement('img')
  node.src = source
  node.alt = alt
  return node
}
if (config.logo) {
  const logo = image(config.logo, 'Web em Vista')
  document.querySelector('.brand').replaceChildren(logo)
}
document.querySelector('[data-date]').textContent = config.data || 'A definir'
document.querySelector('[data-validity]').textContent = config.validade || 'A definir'

function element(tag, value, className) {
  const node = document.createElement(tag)
  node.textContent = value
  if (className) node.className = className
  return node
}
function projectUrl(input) {
  try {
    const url = new URL(input)
    return ['https:', 'http:'].includes(url.protocol) ? url.href : ''
  } catch {
    return ''
  }
}
config.projetos.slice(0, 3).forEach((project) => {
  const card = element('article', '', 'project')
  const preview = element('div', '', 'preview')
  if (project.imagem) {
    const picture = image(project.imagem, 'Captura do site ' + (project.nome || 'do projeto'))
    picture.loading = 'lazy'
    preview.append(picture)
  } else {
    preview.append(element('span', 'Imagem reservada'))
  }
  const body = element('div', '', 'project-body')
  body.append(
    element('p', project.segmento || '[SEGMENTO]', 'eyebrow'),
    element('h3', project.nome || '[NOME DO PROJETO]'),
    element('p', project.descricao || '[DESCRIÇÃO DO PROJETO]'),
  )
  const url = projectUrl(project.link)
  const link = element(url ? 'a' : 'span', 'Visualizar projeto', 'project-link')
  if (url) {
    link.href = url
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
  } else {
    link.setAttribute('aria-disabled', 'true')
  }
  body.append(link)
  card.append(preview, body)
  document.querySelector('#projects').append(card)
})

const status = document.querySelector('#contact-status')
const number = config.whatsapp.replace(/\D/g, '')
const plans = ['One Page', 'Institucional Completo']
if (!number) status.textContent = 'WhatsApp da Web em Vista a confirmar.'
document.querySelectorAll('.contact').forEach((link) => {
  const plan = plans[Number(link.dataset.plan)]
  if (number) {
    const message = 'Olá, Pamella! Quero fechar a contratação do plano ' + plan + ' para o site da Veent Payment. Podemos seguir com os próximos passos?'
    link.href = 'https://wa.me/' + number + '?text=' + encodeURIComponent(message)
    link.target = '_blank'
    link.rel = 'noopener noreferrer'
  } else {
    link.addEventListener('click', () => {
      status.textContent = 'Plano selecionado: ' + plan + '. WhatsApp da Web em Vista a confirmar.'
    })
  }
})

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('entered')
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.2 })
  document.querySelectorAll('.reveal').forEach((item) => observer.observe(item))
}
