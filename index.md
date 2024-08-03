---
# https://vitepress.dev/reference/default-theme-home-page
layout: home

hero:
  name: "My Web Note"
  text: "Record learning"
  tagline: 深自缄默 如云漂泊
  image:
    src: /image/02.png
  actions:
    - theme: brand
      text:  Study Now
      link: /md/html-md/basis.md
    - theme: alt
      text: About 
      link: /about
      logo: https://vitepress.dev/assets/vitepress-logo-dark.svg

features:
  - icon : 👇
    title: 你
    details: now
  - icon : 😍
    title: 渴望
    details: to click
  - icon : 💪
    title: 力量吗
    details: the blue button
---

<br>

---
<br>
<br>

<center>迈向光明之路，必将荆棘丛生，你的努力定不会辜负你的</center>
<p align="right">——<a href="https://github.com/message163" _target="_blank" style="text-decoration: none;">小满zs</a></p>

---

<script defer>
  if (typeof document !== 'undefined') {
    const body = document.querySelector('body')
  const div = document.createElement('div')
  div.style.opacity='0'
  div.innerHTML = `✨ New ! 新项目 <a href="https://abindsoul.github.io/fs-desgin-ui/" target="_blank">点击此处前往!</a> | <span class='alert-close'>❌</span> |`
  div.style.fontSize = '13px'
  div.style.width = '250px'
  div.style.height = 'auto'
  div.style.padding='5px 5px'
  div.style.textAlign = 'center'
  div.style.color='#000000'
  div.style.borderRadius = '5px'
  div.style.position = 'fixed'
  div.style.top = '100px'
  div.style.left = '50%'
  div.style.transform = 'translateX(-50%)'
  div.style.transition = 'all .5s'
  div.style.backgroundColor = '#ec97e1'
  div.style.zIndex = '9999'
  body.appendChild(div)
  const span = document.querySelector('.alert-close')
  span.style.cursor='pointer';
  span.addEventListener('click',()=>{
      div.remove()
  })
  setTimeout(()=>{
      div.style.opacity='1'
      div.style.top = '60px'
  },1000)
  setTimeout(()=>{
      div.remove()
  },10000)
  }
</script>