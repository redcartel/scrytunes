const exclude = ['Root', 'MusicList', 'getPaths']

export default function log (section, ...things) {
  if (!exclude.includes(section)) {
    try {
      const e = new Error('Log Stack Trace')
      throw e
    } catch (e) {
      if (things && things[0] === false) {
        console.log(`=== Log from ${section}\n`, ...things.slice(1))
      } else {
        console.log(`=== Log from ${section}\n`, ...things, '\n', e)
      }
    }
  }
}
