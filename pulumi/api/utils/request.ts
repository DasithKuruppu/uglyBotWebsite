import https from 'https';

export const getHTTP = () => https;
export const HTTPRequest = (opts: https.RequestOptions = {}) => {
  const HTTPClient = getHTTP();
  return new Promise((resolve, reject) => {
    const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;
    console.log({ CLERK_SECRET_KEY });
    const options = {
      method: `GET`,
      hostname: `api.clerk.com`,
      port: null,
      path: `/v1/users/userId/oauth_access_tokens/oauth_discord`,
      headers: {
        'Content-Type': `application/json`,
        Authorization: `Bearer ${CLERK_SECRET_KEY}`,
      },
      ...opts,
    };
    const req = HTTPClient.request(options, function (res) {
      const chunks: any[] = [];

      res.on(`data`, function (chunk: any) {
        chunks.push(chunk);
      });

      res.on(`end`, function () {
        const body = Buffer.concat(chunks);
        resolve(JSON.parse(body.toString()));
      });

      res.on(`error`, function (error: any) {
        reject(error);
      });
    });
    req.end();
  });
};
