const GALLERY_PHOTOS = Array.from({ length: 25 }, (_, i) => ({
  src: `/gallery/${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `Ladli — memory ${i + 1}`,
}))

export default GALLERY_PHOTOS
