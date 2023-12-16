import fs from 'fs';
import https from 'https';

function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);

    https
      .get(url, (response) => {
        if (response.statusCode !== 200) {
          reject(`Failed to download file: Status Code ${response.statusCode}`);
          return;
        }

        response.pipe(file);

        file.on('finish', () => {
          file.close();
          resolve();
        });
      })
      .on('error', (err) => {
        fs.unlink(dest, () => {
          return;
        });
        reject(`Failed to download file: ${err.message}`);
      });
  });
}

export async function fetchProtos(
  services: { repository: string; branch: string }[],
) {
  await Promise.all(
    Object.keys(services).map((key) => {
      const service = services[key];
      const { repository, branch } = service;
      const url = `https://raw.githubusercontent.com/${repository}/${branch}/src/combined.proto`;
      fs.mkdirSync(`${__dirname}/temp/${key}`, { recursive: true });
      return downloadFile(url, `${__dirname}/temp/${key}/combined.proto`);
    }),
  );
}