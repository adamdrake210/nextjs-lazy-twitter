import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import { NextApiHandler } from "next";

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options);
export default authHandler;

const options = {
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_API_KEY!,
      clientSecret: process.env.TWITTER_API_KEY_SECRET!,
      version: "2.0",
    }),
  ],
  secret: process.env.SECRET,
};
