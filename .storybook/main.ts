import remarkGfm from 'remark-gfm';
import type { StorybookConfig } from '@storybook/react-webpack5';

const pagesBasePath = process.env.STORYBOOK_BASE_PATH?.endsWith('/')
  ? process.env.STORYBOOK_BASE_PATH
  : process.env.STORYBOOK_BASE_PATH
    ? `${process.env.STORYBOOK_BASE_PATH}/`
    : undefined;

const addPagesBaseHref = (head: string) =>
  pagesBasePath ? `<base href="${pagesBasePath}" />${head}` : head;

const config: StorybookConfig = {
  core: {
    disableTelemetry: true,

    disableWhatsNewNotifications: true,
  },
  framework: '@storybook/react-webpack5',
  staticDirs: ['./static'],
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-webpack5-compiler-babel',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],
  typescript: {
    check: false,
    reactDocgen: 'react-docgen-typescript',
  },
  managerHead: addPagesBaseHref,
  previewHead: addPagesBaseHref,
  webpackFinal: async (webpackConfig) => {
    if (pagesBasePath && webpackConfig.output) {
      webpackConfig.output.publicPath = pagesBasePath;
    }

    return webpackConfig;
  },
};

export default config;
