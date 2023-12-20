import * as fs from 'fs';
import { Octokit } from 'octokit';

async function downloadFile(
  repo: string,
  path: string,
  dest: string,
  token: string,
): Promise<void> {
  const octokit = new Octokit({
    auth: token,
  });
  const result = await octokit.request(
    `GET /repos/{owner}/{repo}/contents/{path}`,
    {
      owner: repo.split('/')[0],
      repo: repo.split('/')[1],
      path: path,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
      },
    },
  );
  const file = Buffer.from((result.data as any).content, 'base64').toString();
  fs.writeFileSync(dest, file, 'utf8');
}

export async function fetchProtos(
  services: Record<string, { repository: string; branch: string }>,
  target: string,
  token: string,
) {
  await Promise.all(
    Object.keys(services).map(async (key) => {
      const service = services[key];
      const { repository, branch } = service;
      fs.mkdirSync(`${target}/fetched-protos/${key}`, { recursive: true });
      return await downloadFile(
        repository,
        'src/combined.proto',
        `${target}/fetched-protos/${key}/fetched.proto`,
        token,
      );
    }),
  );
}
