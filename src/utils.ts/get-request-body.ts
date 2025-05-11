export const getRequestBody = (req: any): Promise<any> =>
    new Promise((resolve, reject) => {
      let body = '';
      req.on('data', (chunk: any) => (body += chunk));
      req.on('end', () => {
        try {
          resolve(JSON.parse(body));
        } catch {
          reject(new Error('Invalid JSON'));
        }
      });
    });