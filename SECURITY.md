# Security

## Reporting a vulnerability

Please do not publish security-sensitive details in a public issue.

For website or repository security issues, contact AliPay through the project contact channel listed on the site:

- Telegram: https://t.me/VespidKitten875

When reporting an issue, include the affected page or file, reproduction steps, impact, and any safe proof of concept that helps reproduce the problem.

## Deployment security

- GitHub Actions uses least-privilege permissions.
- Pull requests run build verification but cannot deploy to GitHub Pages.
- Pages deployment is restricted to pushes to `main`.
- Static content is protected by a Content Security Policy in `index.html`.
