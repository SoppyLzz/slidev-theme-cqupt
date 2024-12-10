import { defineConfig } from 'unocss'

export default defineConfig({
    shortcuts: {
        's-bg-theme': 'bg-[var(--s-theme)]',
        's-bg-dim': 'bg-[var(--s-bg-dim)]',
        's-bg-fade': 'bg-[var(--s-bg-fade)]',
        's-bg-base': 'bg-[var(--s-bg-base)]',
        's-bg-deep': 'bg-[var(--s-bg-deep)]',

        's-color-theme': 'text-[var(--s-theme)] fill-[var(--s-theme)]',
        's-color-deep': 'text-[var(--s-line-deep)] fill-[var(--s-line-deep)]',
        's-color-base': 'text-[var(--s-line-base)] fill-[var(--s-line-base)]',
        's-color-fade': 'text-[var(--s-line-fade)] fill-[var(--s-line-fade)]',

        's-border-theme': 'border-[var(--s-theme)]',
        's-border-deep': 'border-[var(--s-line-deep)]',
        's-border-base': 'border-[var(--s-line-base)]',
        's-border-fade': 'border-[var(--s-line-fade)]',

        // provide for writing slides
        's-icon-sm': 'w-4 h-4',
        's-icon-md': 'w-5 h-5',
        's-icon-lg': 'w-6 h-6',
        's-icon-xl': 'w-8 h-8',

        // just for s-card
        's-bg-primary': 'bg-[var(--s-primary)]',
        's-bg-success': 'bg-[var(--s-success)]',
        's-bg-info': 'bg-[var(--s-info)]',
        's-bg-warning': 'bg-[var(--s-warning)]',
        's-bg-danger': 'bg-[var(--s-danger)]',
    },
})