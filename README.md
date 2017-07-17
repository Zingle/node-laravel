node-laravel
============
Node.js library for interoperating with Laravel.

API
---

### laravel.COOKIE_NAME
Default cookie name if none is provided when creating a Laravel context.  The
cookie defaults to `"laravel_session"` which is the same as the Laravel default.

### laravel(appKey, [cookieName], fetch) => Laravel
Create a new Laravel context using an application encryption key and a data
storage fetching function.  Optionally, override the default cookie used to
reference the session.

The `fetch` function takes the session id as its only argument and must return
a Promise which resolves to the encoded session data.

### laravel.Laravel
Laravel context prototype.  This object will be in the prototype chain of any
Laravel context created with the `laravel` function.

### laravel.Laravel#decrypt(iv, cipher) => string
Decrypt cipher text using the Laravel context application encryption key and a
provided initialization vector.

### laravel.Laravel#fetch(id) => Promise
Fetch encoded session data using the `fetch` function provided when the context
was created and decode it.

### laravel.Laravel#readCookie(cookie) => string
Extract the encrypted and encoded session id from a Laravel session cookie
value.

### laravel.Laravel#readCookies(cookies) => string
Extract the encrypted and encoded session id from the default Laravel session
cookie.
