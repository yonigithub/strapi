const GoogleStrategy = require('passport-google-oauth2');

module.exports = ({ env }) => ({
  host: env('HOST', '0.0.0.0'),
  port: env.int('PORT', 1337),
  admin: {
    auth: {
      secret: env('ADMIN_JWT_SECRET', 'example-token'),
      providers: [
        {
          uid: 'google',
          displayName: 'Google OAuth2 long name',
          icon: '',
          createStrategy: strapi => {
            return new GoogleStrategy(
              {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: strapi.admin.services.passport.getProviderCallbackUrl('google'),
                scope: [
                  'https://www.googleapis.com/auth/userinfo.profile',
                  'https://www.googleapis.com/auth/userinfo.email',
                ],
              },
              (request, accessToken, refreshToken, profile, done) => {
                done(null, {
                  email: profile.email,
                  firstname: profile.given_name,
                  lastname: profile.family_name,
                });
              }
            );
          },
        },
      ],
    },
  },
});
