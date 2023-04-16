import { SEO } from '@/components/SEO';
import Interactions from '../index';
import ContentWrapper from '../template-contentWrapper';
import requestProfileGif from './_requestProfile.gif';
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
        selected: true,
      },
      {
        title: `/ask`,
        url: `/docs/interactions/ask`,
        id: `ask`,
        selected: false,
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
export default function requestProfile() {
  const pathList = [
    {
      label: `Home`,
      path: `/`,
    },
    { label: `Interactions`, path: `/docs/interactions` },
    { label: `Request Profile`, path: `/docs/interactions/request_profile` },
  ];
  const Content = () => (
    <ContentWrapper
      title="/request profile"
      description="Get the profile of yourself or another user"
      disableImage={false}
      imageSrc={requestProfileGif}
      features={[
        {
          id: `user`,
          required: false,
          hidden: false,
          title: `user`,
          text: `The name of the user you want to see the profile of`,
          examples: [`@brokenPumpkin`],
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
    title="Interactions - Request User Profile"
    description="Documentation on how to use the /request profile interaction"
  />
);
