export const environment = {
  production: false,
  // {lang} is variable in the url so it will be replaced with the current language in the app . (jwt.interceptor.ts)
  apiUrl : 'https://salamtechapi.azurewebsites.net/api/{lang}',
  storageUrl : 'https://salamtechapi.azurewebsites.net',
  localStorageUserKey : 'currentUser',
  timeout : 30000,
  languages : ['en','ar','fr','de'],
  defaultLang : 'en',
  mapbox: {
    accessToken: 'pk.eyJ1IjoiemV4YXhhd3lueSIsImEiOiJjazJuZDMzNGYwbXc5M2dueDJhazBmajJmIn0.tRzMu-yiZZEF-0RYt5H8Ow'
  }
  // ng build --configuration production - to vercel
};
