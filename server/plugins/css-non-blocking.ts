/**
 * Makes Nuxt CSS chunk links non-blocking since all component styles are
 * already inlined in the HTML via `features: { inlineStyles: true }`.
 * This eliminates render-blocking CSS without causing FOUC.
 */
export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook('render:html', (html) => {
    const makeNonBlocking = (chunk: string) =>
      chunk.replace(
        /<link rel="stylesheet" (href="\/_nuxt\/[^"]+\.css"[^>]*)>/g,
        '<link rel="preload" as="style" $1 onload="this.onload=null;this.rel=\'stylesheet\'"><noscript><link rel="stylesheet" $1></noscript>'
      )

    html.head = html.head.map(makeNonBlocking)
  })
})
