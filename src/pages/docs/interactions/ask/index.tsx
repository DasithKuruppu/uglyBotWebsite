import { SEO } from '@/components/SEO';
import Interactions from '../index';
import ContentWrapper from '../template-contentWrapper';
import askGif from './_ask.gif';
const defaultCategories = [
  {
    title: `Raids and Events`,
    components: [
      {
        title: `/create raid`,
        url: `/docs/interactions/`,
        id: `createRaid`,
        selected: false,
      },
      {
        title: `/remove raid_user`,
        url: `/docs/interactions/remove_raid_user`,
        id: `removeRaidUser`,
        selected: false,
      },
      {
        title: `/request raid_summary`,
        url: `/docs/interactions/request_raid_summary`,
        id: `raidSummary`,
        selected: false,
      },
    ],
    id: `create`,
  },
  {
    title: `Users`,
    components: [
      {
        title: `/request profile`,
        url: `/docs/interactions/request_profile`,
        id: `requestProfile`,
        selected: false,
      },
      {
        title: `/ask`,
        url: `/docs/interactions/ask`,
        id: `ask`,
        selected: true,
      },
    ],
    id: `user`,
  },
  {
    title: `Server`,
    components: [
      {
        title: `/request server_profile`,
        url: `/docs/interactions/request_server_profile`,
        id: `serverProfile`,
        selected: false,
      },
    ],
    id: `server`,
  },
];
export default function ask() {
  const pathList = [
    {
      label: `Home`,
      path: `/`,
    },
    { label: `Interactions`, path: `/docs/interactions` },
    { label: `Ask`, path: `/docs/interactions/ask` },
  ];
  const Content = () => (
    <ContentWrapper
      title="/ask"
      description="Ask or say anything to the bot and get a response"
      disableImage={false}
      imageSrc={askGif}
      features={[
        {
          id: `message`,
          required: true,
          title: `message`,
          hidden: false,
          text: `The message you want to send to the bot`,
          examples: [
            `Hi how are you?`,
            `What is the weather like?`,
            `Draw me a pink elephant`,
          ],
        },
      ]}
    />
  );
  return (
    <Interactions
      pathList={pathList}
      categories={defaultCategories}
      mainItem={Content}
    />
  );
}

export const Head = () => (
  <SEO
    title="Interactions - Ask"
    description="Documentation on how to use the /ask interaction"
  />
);
