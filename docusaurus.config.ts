import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';

const config: Config = {
  title: 'Prompt Engine Hub',
  tagline: 'Patterns, templates & tools for great prompts',
  favicon: 'img/favicon.ico',

  url: 'https://karthiksuku.github.io',
  baseUrl: '/karthiksuku/',
  organizationName: 'karthiksuku',
  projectName: 'karthiksuku',

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  i18n: { defaultLocale: 'en', locales: ['en', 'ko'] },

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.ts'),
          editUrl: 'https://github.com/karthiksuku/karthiksuku/edit/main/',
          routeBasePath: 'docs'
        },
        blog: {
          showReadingTime: true,
          blogSidebarCount: 10
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css')
        }
      } as any)
    ]
  ],

  plugins: [
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      { hashed: true, docsRouteBasePath: '/docs' }
    ]
  ],

  themeConfig: {
    image: 'img/og.png',
    navbar: {
      title: 'Prompt Engine Hub',
      logo: { alt: 'PEH Logo', src: 'img/logo.svg' },
      items: [
        { to: '/docs/intro', label: 'Docs', position: 'left' },
        { to: '/docs/cookbook/overview', label: 'Cookbook', position: 'left' },
        { to: '/playground', label: 'Playground', position: 'left' },
        { href: 'https://github.com/karthiksuku/karthiksuku', label: 'GitHub', position: 'right' }
      ]
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting Started', to: '/docs/getting-started' },
            { label: 'Prompt Templates', to: '/docs/templates/overview' },
            { label: 'Integrations', to: '/docs/integrations/overview' }
          ]
        },
        {
          title: 'Community',
          items: [
            { label: 'Contributing', to: '/docs/community/contributing' },
            { label: 'Code of Conduct', to: '/docs/community/code-of-conduct' }
          ]
        },
        {
          title: 'More',
          items: [
            { label: 'Blog', to: '/blog' },
            { label: 'GitHub', href: 'https://github.com/karthiksuku/karthiksuku' }
          ]
        }
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Prompt Engine Hub. Built with Docusaurus.`
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula
    }
  }
};

export default config;
