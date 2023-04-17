export function bufferToBase64(buffer) {
  let binary = ''
  let bytes = new Uint8Array(buffer) // Uint8Array is an array of 8 integers (cuz a byte is 4 binary digits)
  const len = bytes.byteLength // the length in bytes of the array
  for (let i = 0; i < len; i++) binary += String.fromCharCode(bytes[i]) // concatenate every byte into a string
  return window.btoa(binary)
}
