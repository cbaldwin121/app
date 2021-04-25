// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  oidcConfig: {
    client_id: '0oa9i8x4tWUkYqzZ35d6',
    server_host: 'https://dev-33168249.okta.com',
    redirect_url: window.location.origin + '/callback',
    end_session_redirect_url: window.location.origin + '/logout',
    scopes: 'openid profile',
    pkce: true
  },
  scheme: '.okta.dev-33168249:/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
