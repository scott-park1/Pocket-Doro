import { auth } from 'express-oauth2-jwt-bearer'

export const checkJwt = auth({
  audience: 'https://pocket-doro/api',
  issuerBaseURL: 'https://whai-2023-jen.au.auth0.com/',
  tokenSigningAlg: 'RS256',
})
