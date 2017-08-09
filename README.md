node-laravel
============
Node.js library for inter-operating with Laravel.

API
---

### decrypt(key, iv, cipher) => string
Decrypt cipher text using the Laravel application encryption key and provided
initialization vector.

### deserialize(string) => string
Deserialize data serialized by PHP.

### encrypt(key, iv, plain) => string
Encrypt plain text using the Laravel application encryption key and provided
initialization vector.

### readCookie(key, cookie) => string
Extract the encrypted and encoded session id from a Laravel session cookie
value.

### readCookies(key, [cookieName], cookies) => string
Extract the encrypted and encoded session id from Laravel session cookie.
