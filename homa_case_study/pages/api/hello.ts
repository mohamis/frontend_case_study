// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await fetch(
    "http://api.geonames.org/countryInfoJSON?formatted=true&username=hydrane"
  );

  res.status(200).json(await response.json());
}
