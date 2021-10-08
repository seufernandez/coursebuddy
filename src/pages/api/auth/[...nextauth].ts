import { v4 as uuidv4 } from 'uuid';

import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import { supabase } from '../../../services/supabase';

export default NextAuth({
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      authorizationUrl:
        'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
      scope:
        'https://www.googleapis.com/auth/userinfo.email  https://www.googleapis.com/auth/userinfo.profile',
    }),
  ],
  jwt: {
    signingKey: process.env.SIGNIN_KEY,
  },
  callbacks: {
    async session(session) {
      return {
        ...session,
      };
    },

    async signIn(user, account, profile) {
      const { name, email, image } = user;

      const { data: users, error } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      // if theres a user with the same email as the current user, users.lengh will be 1
      if (users?.length === 0 || users === null) {
        // an if theres no one with the same email, we will write this new user down
        await supabase.from('users').insert([
          {
            name: `${name}`,
            avatar_url: `${image}`,
            email: `${email}`,
          },
        ]);
      }

      return true;
    },
  },
});
