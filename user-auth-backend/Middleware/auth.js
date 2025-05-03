// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"
  
    if (!token) return res.status(401).json({ message: 'Access token missing' });
  
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Invalid or expired token' });
  
      req.user = decoded; // decoded contains { email, iat, exp }
      next(); // proceed to the next middleware or route handler
    });
  }
  