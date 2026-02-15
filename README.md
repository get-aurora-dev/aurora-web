# Aurora Web

The official Aurora website, built with NextJS 16 and React 19, using TailwindCSS and shadcn/ui components.

## Getting Started

```bash
pnpm i          # Install dependencies
pnpm run dev    # Start development server at http://localhost:3000
pnpm run build  # Build static files to ./out
pnpm run preview
```

## Static Deployment (Cloudflare Pages)

This project is configured for static export.

- Build command: `pnpm run build`
- Build output directory: `out`
- Root redirect: `/` -> `/en/` is handled by `public/_redirects`

## Contributing

Every contribution is welcome! Submit changes by creating a PR. Thank you for your contribution!

### Adding a New Language

Adding a new language is easy - you only need to touch **two files**:

1. **Create a translation file** - Copy `messages/en.json` to `messages/{locale}.json`:
   ```bash
   cp messages/en.json messages/es.json  # Example: Spanish
   ```

2. **Register the language** - Add an entry to the `languages` array in `i18n/config.ts`:
   ```typescript
   export const languages: Language[] = [
     { code: 'en', name: 'English', nativeName: 'English' },
     { code: 'de', name: 'German', nativeName: 'Deutsch' },
     { code: 'es', name: 'Spanish', nativeName: 'Español' },  // Add your language
     // ...
   ];
   ```

3. **Translate** - Edit your new `messages/{locale}.json` file with your translations.

4. **Submit a PR** - That's it!

#### Locale Code Format

Use standard [BCP 47 language tags](https://en.wikipedia.org/wiki/IETF_language_tag):
- Simple codes: `en`, `de`, `fr`, `es`
- Regional variants: `pt-PT` (Portuguese - Portugal), `pt-BR` (Portuguese - Brazil)

### Project Structure

```
aurora-web/
├── app/[locale]/       # Internationalized pages
├── components/         # React components
├── i18n/
│   ├── config.ts       # Language configuration (single source of truth)
│   ├── routing.ts      # next-intl routing setup
│   └── request.ts      # next-intl request config
├── messages/           # Translation files
│   ├── en.json         # English (reference)
│   ├── de.json         # German
│   ├── fr.json         # French
│   ├── pt-PT.json      # Portuguese (Portugal)
│   └── ru.json         # Russian
└── public/_redirects   # Static host redirects
```
