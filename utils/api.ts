const CONSUMER_KEY = process.env.NEXT_PUBLIC_POCKET_CONSUMER_KEY;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_POCKET_ACCESS_TOKEN;
const POCKET_API_URL = new URL('https://getpocket.com/v3/get');

export const api = {
  getBookmarks: async () => {
    const res = await fetch(
      `${POCKET_API_URL}?consumer_key=${CONSUMER_KEY}&access_token=${ACCESS_TOKEN}&tag=publish&state=unread&sort=newest&detailType=simple`
    );
    return res.json();
  }
};
