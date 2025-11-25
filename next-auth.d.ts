import NextAuth from "next-auth";


//FOR NEXT-AUTH MOCKING PURPOSES
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
}
