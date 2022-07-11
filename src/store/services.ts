import axios from "axios";

const base_url = process.env.SERVER_HOST;
const is_demo = Boolean(process.env.DEMO);

export async function fetchUser(id: number): Promise<any> {
  console.log(`GET ${base_url}'/users`)
  if (is_demo) {
    return {
      status: 200,
      data: {
        id: 324023,
        name: "David"
      }
    }
  } else {
    return await axios.get(`${base_url}/users`);
  }
}
