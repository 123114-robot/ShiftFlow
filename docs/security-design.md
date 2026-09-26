# Security Design

- Use adaptive password hashing; never plaintext.
- Sign short-lived JWTs with an environment secret.
- Authenticate before resolving resources; authorise role and ownership server-side.
- Validate bodies, params, and queries.
- Hide stack traces and sensitive records.
- Restrict CORS to the configured frontend.
- Keep .env and credentials out of Git.
- Do not expose employee directories or others' leave to employees.

Phase 1 contains no usable login credentials.
