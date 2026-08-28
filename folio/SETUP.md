Download counter — setup

What this is
- A Google Sheet holds one number: total downloads.
- A small Apps Script "web app" exposes that number over HTTP: GET to read it, GET with a secret token to increment it.
- counter.js (loaded by the site) calls that web app: once on page load to display the count, and once when someone clicks Download.

Why a Sheet at all
A static HTML file has no shared memory between visitors — every browser is isolated. Showing one running total to everyone requires some server-side piece all visitors write to. A Sheet + Apps Script is the free, no-hosting-required version of that. Alternatives (Firebase, Cloudflare Workers + KV) work too and are more robust at high traffic, but this is the simplest for a resume-builder side project.

