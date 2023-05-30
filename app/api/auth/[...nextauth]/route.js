import User from "@models/user";
import { connectToDB } from "@utils/database";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

// Open Explaination below:
/*
Explaination of the handler:
The code you provided appears to be using NextAuth, a library for authentication in Next.js applications. It sets up authentication with Google as the provider and includes logic for handling sessions and sign-ins.

Here's a breakdown of the code:

The code defines a constant handler that uses the NextAuth function. This function is called with an object as its argument, specifying various configuration options for authentication.

The providers array within the configuration object specifies the authentication provider(s) to use. In this case, there is only one provider, which is GoogleProvider. It requires two properties: clientId and clientSecret, which are environment variables (process.env.GOOGLE_ID and process.env.GOOGLE_CLIENT_SECRET, respectively) containing the Google OAuth 2.0 client ID and client secret.

The session function is an asynchronous function that is called every time a session is created or updated. It receives an object with a session property, representing the session data. Inside this function, it retrieves the user data from the database based on the user's email, using User.findOne(). The await keyword indicates that this operation is asynchronous. Once the user data is obtained, the user's ID is added to the session object, and the updated session is returned.

The signIn function is an asynchronous function that is called when a user signs in with Google authentication. It receives an object with a profile property, containing the user's profile data obtained from Google. Inside this function, it performs several actions:

a. It connects to the database using the connectToDB function.

b. It checks if a user with the same email already exists in the database using User.findOne(). If a user with the same email is found, the userExists variable is set to true.

c. If a user with the same email does not exist (userExists is false), a new user is created using User.create(). The user's email, username (derived from the profile name by replacing spaces with empty strings and converting to lowercase), and image URL are saved in the database.

d. The function returns true if the sign-in process is successful.

e. If an error occurs during the sign-in process, the error is logged to the console, and the function returns false.

Overall, this code sets up NextAuth with Google as the authentication provider and includes logic for handling sessions and sign-ins. It integrates with a MongoDB database to store and retrieve user data.

    
The profile parameter in the signIn function refers to the user's profile data obtained from the authentication provider, in this case, Google.

When a user signs in using Google authentication, the provider (GoogleProvider) retrieves the user's profile information, such as their email, name, and profile picture. This information is then passed to the signIn function as the profile parameter.

You can access various properties of the user's profile using profile.propertyName. In the provided code snippet, the signIn function utilizes profile.email, profile.name, and profile.picture to access the user's email, name, and profile picture, respectively.

These profile properties can be used within the signIn function to perform further actions, such as checking if the user already exists in the database or creating a new user record with the obtained profile information.
*/

console.log({
  clientId: process.env.GOOGLE_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      // Get the data of the user every single time
      const sessionUser = await User.findOne({
        email: session.user.email,
      });
      // Auto-created id sent by google is updated by the auto-created ID through MongdoDB
      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      // When someone signs in with Google Auth, his profile will be passed to this function
      // Then, we save the user to our database after adding some logic
      try {
        // Serverless => lambda => dynamodb
        await connectToDB();
        // Check if a user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });

        // If not => create a new user and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }

        return true;
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
