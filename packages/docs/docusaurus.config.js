module.exports = {
  title: 'Pixatore',
  tagline: 'Tauri, Pixi, Colyseus, Vue multiplayer game starter kit',
  url: 'https://will-hart.github.io',
  baseUrl: '/pixatore/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'will-hart', // Usually your GitHub org/user name.
  projectName: 'pixatore', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'Pixatore',
      logo: {
        alt: 'Pixatore Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Guides',
          position: 'left',
        },
        {
          to: 'docs/api/app/index',
          activeBasePath: 'docs/api/app',
          label: 'Client API',
          position: 'right',
        },
        {
          to: 'docs/api/server/index',
          activeBasePath: 'docs/api/server',
          label: 'Server API',
          position: 'right',
        },
        {
          to: 'docs/api/shared/index',
          activeBasePath: 'docs/api/shared',
          label: 'Shared API',
          position: 'right',
        },
        { to: 'blog', label: 'Blog', position: 'left' },
        {
          href: 'https://github.com/will-hart/pixatore',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Guides',
              to: 'docs/',
            },
            {
              label: 'Client API',
              to: 'docs/api/app/index',
            },
            {
              label: 'Shared API',
              to: 'docs/api/shared/index',
            },
            {
              label: 'Server API',
              to: 'docs/api/server/index',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'Blog',
              to: 'blog',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/will-hart/pixatore',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} William Hart. Built with Docusaurus and Typedoc.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          // It is recommended to set document id as docs home page (`docs/` path).
          homePageId: 'index',
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/will-hart/pixatore/edit/stable/package/docs/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/will-hart/pixatore/edit/stable/package/docs/blog/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
}
