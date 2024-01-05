import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import User from '../../../models/user';
import connectToDb from '../../../utils/database';
import { Profile } from 'next-auth';

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
        // Add more providers as needed
    ],

    // Optional: Define custom callbacks
    callbacks: {
        async session({ session }) {
            // Your custom session logic here

            // Check if session.user is defined before accessing its properties
            if (session.user) {
                const sessionUser = await User.findOne({
                    email: session.user.email
                });
                // Optionally, you can update the session with additional user data
                //session.user.id = sessionUser._id.toString();
            }

            return session;
        },

        async signIn({ profile }: { profile?: Profile }) {
            try {
                if (!profile) {
                    // Handle the case where profile is undefined
                    console.error('Profile is undefined.');
                    return false;
                }

                await connectToDb();

                // check if the user exists
                const isPresent = await User.findOne({ email: profile.email });

                // if the user does not exist, create a new user
                if (!isPresent) {
                    await User.create({
                        email: profile.email,
                        username: profile.name?.replace(" ", "").toLocaleLowerCase(),
                        // image: profile.picture
                    });
                }
                return true;
            } catch (err) {
                console.error(err);
                return false;
            }
        },
    },
});

export { handler as GET, handler as POST };
