// Generate a secure secret key for BETTER_AUTH_SECRET
const crypto = require('crypto');

const secret = crypto.randomBytes(32).toString('base64');
console.log('Generated BETTER_AUTH_SECRET:');
console.log(secret);
console.log('\nCopy this value and use it in your Vercel environment variables.');