import JSEncrypt from 'jsencrypt'

const pubKey = '-----BEGIN PUBLIC KEY-----\n' +
  'MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAKE7yjZiTn9DHSzSQETYlEoU9OgVMyMh\n' +
  '/fvl7NDqSMGgjgJ9q4898r6OyG7Dh5iJN0r9UiY+ii0N7QaFpdaaoZcCAwEAAQ==\n' +
  '-----END PUBLIC KEY-----'

var encryptor = new JSEncrypt()
encryptor.setPublicKey(pubKey)

export function encrypt (data) {
  const entryption = encryptor.encrypt(data)
  return entryption
}
