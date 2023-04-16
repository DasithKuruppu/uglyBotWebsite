import { SEO } from '@/components/SEO';
import Interactions from '../index';
import ContentWrapper from '../template-contentWrapper';
import removeRaidUserGif from './_removeRaidUser.gif';
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
        selected: true,
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
export default function ask() {
  const pathList = [
    {
      label: `Home`,
      path: `/`,
    },
    { label: `Interactions`, path: `/docs/interactions` },
    { label: `Remove Raid User`, path: `/docs/interactions/remove_raid_user` },
  ];
  const Content = () => (
    <ContentWrapper
      title="/remove raid_user"
      description="Removes a user from a given raid"
      disableImage={false}
      imageSrc={removeRaidUserGif}
      features={[
        {
          id: `raidUser`,
          required: true,
          hidden: false,
          title: `user`,
          text: `The user name of the raid user`,
          examples: [`@brokenPumpkin`],
        },
        {
          id: `raidId`,
          required: true,
          hidden: false,
          title: `raid_id`,
          text: `The raid id of the raid you want to remove the user from`,
          examples: [`Pca7TmKcX2`],
        },
        {
          id: `reason`,
          required: false,
          hidden: false,
          title: `reason`,
          text: `The reason for removing the user from the raid`,
          examples: [
            `Did not show up`,
            `Were unable to join`,
            `Did not meet queue requirements`,
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
    title="Interactions - Remove Raid User"
    description="Documentation on how to use the /remove raid_user interaction"
  />
);
