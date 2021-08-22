// Generates a 4-digit code.
// TODO: Use a lib or improve this code
export const generateRandomCode = () => {
  const randomCode = Math.floor(1000 + Math.random() * 9000)

  return randomCode
}
