export default {

    // oidc = open id connect
    oidc: {
        clientId: '0oa63mwqwlAELBdwO5d7', // public identifier of client app
        issuer: 'https://dev-59937452.okta.com/oauth2/default', // issuer of token, URL when authorizing with Okta Authorization Server
        redirectUri: 'http://localhost:4200/login/callback',
        scopes: ['openid', 'profile', 'email']    
    }
}
