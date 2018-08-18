let filesToCache = [
  'index.html',
  'index.js',
  'style.css',
  'manifest.json',
  'mordecai-144.png',
  'mordecai.ico',
  'package.json',
  'server.js',
  'sw.js'
]
function print(message, type) {
  data = {
    INFO: {color:'white',bg:'dodgerblue',bold:true},
    SUCCESS: {color:'white',bg:'lightgreen',bold:true},
    WARN: {color:'white',bg:'orange',bold:true},
    ERROR: {color:'white',bg:'indianred',bold:true},
  }
  let { color, bold, bg, width } = data[type.toUpperCase()]
  return console.log(`%c${message}`, `
    background: ${bg};
    color:${color};
    font-weight:${bold ? 'bold' : 'normal'};
    width:${width};

  `)
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('files').then(cache => {
      print('fetching...','INFO')
      console.warn('Ive cached evelything beibi!')
      return cache.addAll(filesToCache)
    })
  )
  // console.log('Hello you just installed our app, thank u!!!')
})
self.addEventListener('fetch', (event) => {
  print('_______________You fetching something!____________________', 'WARN')
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        print(`CACHE: ${event.request.url}`,'warn')
        return response
      }
      print(`FETCH: ${event.request.url}`,'info')
      return fetch(event.request).then(r => {
        caches.open('files').then(cache => {
          cache.addAll([event.request.url])
        })
        return r
      })
    })
  )
})
