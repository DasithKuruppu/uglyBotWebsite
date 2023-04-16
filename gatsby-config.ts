import type { GatsbyConfig } from 'gatsby';
require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`,
});
const config: GatsbyConfig = {
  // Since `gatsby-plugin-typescript` is automatically included in Gatsby you
  // don't need to define it here (just if you need to change the options)
  plugins: [
    `gatsby-plugin-pnpm`,
    {
      resolve: `@chakra-ui/gatsby-plugin`,
      options: {
        /**
         * @property {boolean} [resetCSS=true]
         * if false, this plugin will not use `<CSSReset />
         */
        resetCSS: true,
        /**
         * @property {boolean} [isUsingColorMode=true]
         * if false, this plugin will not use <ColorModeProvider />
         */
        isUsingColorMode: true,
        /**
         * @property {boolean} [isBaseProvider=false]
         * if true, will render `<ChakraBaseProvider>`
         */
        isBaseProvider: false,
      },
    },
    {
      resolve: `gatsby-plugin-clerk`,
    },
  ],
  graphqlTypegen: true,
  jsxRuntime: `automatic`,
  siteMetadata: {
    title: `UglyBot`,
    description: `UglyBot is a highly versatile discord bot that leverages AI to interact with users and aid in the creation of raids.`,
    image: `/uglyBotPancake.jpg`,
    siteUrl: `https://uglybot.click`,
  },
};

export default config;
