import jwt from 'jsonwebtoken'

export function checkPasswordStrength (password) {
  // Minimum eight characters, at least one letter, one number and one special character:
  const strengthRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  return strengthRegex.test(password)
}

export function generateToken (data) {
  return jwt.sign({
    data
  }, process.env.JWT_SECRET, { expiresIn: '1h' })
}

// This middleware checks if the request has a valid JWT token in the Authorization header
export function requireAuthorization (req, res, next) {
  const token = req.headers.authorization
  if (!token) {
    res.status(401).json({ error: 'No token provided' })
    return
  }
  try {
    const accessToken = token.split(' ')[1]
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
    req.user = decoded.data
    next()
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' })
  }
}
