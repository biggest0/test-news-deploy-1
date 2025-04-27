# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```


# Notes for future
- Funny quote about how doomed world is - Albert Catstein
- Funny character names: Donald Catnip, Elon Meow, Vladamir Purrtin, Kim Jung Nyan
- Find place in hero to place video on summary of news 
- Find place for a general summary of all the news that happened today
- make edit option for categories, where user can choose to add and remove news categories in the category bar, store it in localStorage


# To-do
- maybe create another component for the popular/ featured news in the hero, maybe just display the title and its rank and let users open it to read
- make hero display 10 articles instead of 6
- create mock data for top news reads, add ranking in top left corner
- figure out color and font size for overall website
- filter option for most popular
1. update popular section to display articles with most count
1. add disclaimer message right after the top bar (DONE)
2. instead of body text, just an image of the cat with the title, if article talkes about a person and there is cat persona, use that if not use cat for the category
3. create a cat page that introduces the cats, a timeline of cats being born and what they are LOL


# Cat names
- Mewton
- Cat Man
- 


# display most popular 4
- base on count, pop the last one, 