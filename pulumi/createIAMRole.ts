import * as aws from '@pulumi/aws';

export function createIamRole(
  name: string,
  tables: aws.dynamodb.Table[],
  lambda?: aws.lambda.Function,
) {
  const role = new aws.iam.Role(`${name}-role`, {
    assumeRolePolicy: aws.iam.getPolicyDocumentOutput({
      statements: [
        {
          actions: [`sts:AssumeRole`],
          principals: [
            {
              identifiers: [`appsync.amazonaws.com`],
              type: `Service`,
            },
          ],
          effect: `Allow`,
        },
      ],
    }).json,
  });

  const policy = new aws.iam.Policy(`${name}-policy`, {
    policy: aws.iam.getPolicyDocumentOutput({
      statements: [
        {
          actions: [
            `dynamodb:PutItem`,
            `dynamodb:GetItem`,
            `dynamodb:Scan`,
            `dynamodb:Query`,
          ],
          resources: tables.map((table) => table.arn),
          effect: `Allow`,
        },
        ...(lambda
          ? [
              {
                actions: [`lambda:InvokeFunction`],
                resources: [lambda.arn],
                effect: `Allow`,
              },
            ]
          : []),
      ],
    }).json,
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const attachment = new aws.iam.RolePolicyAttachment(`${name}-rpa`, {
    role,
    policyArn: policy.arn,
  });

  return role;
}
