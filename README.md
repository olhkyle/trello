# 🔭 Trello with Vanilla Javascript

<img src="https://github.com/olhkyle/trello/assets/99726297/08b3f53f-a8da-436c-a046-8a1b3fbc01af"/>

## Overview
- Implemented SPA (Single Page Application) using Vanilla JavaScript without any libraries or frameworks
- Created a Diffing algorithm similar to React's Reconciliation
- Designed a CBD library based on the implemented Diffing algorithm, using Class (ES6+) syntax
- Implemented various DOM event interactions using event delegation


<br/>

## Tech Stacks
`HTML` `SASS(CSS)` `JavaScript` `lodash`



<br/>

## Main Feature

### Feature 1

<img width="920" src="https://github.com/olhkyle/trello/assets/99726297/e6ab2ae6-0903-4286-9b43-890c20fc99db"/>

- Drag and drop with `Card` and `List` Component

- Close `ListCreator` and `CardCreator` component to press 'ESC'
  - If `textarea` component in `ListCreator` is focused, pressing 'ESC' makes `ListCreator` close
  - If all `textarea` components in `List` Components are opened, pressing 'ESC' makes all `CardCreator` close

- Open `Modal` Component, after click `Card` component
  - After Click `textarea` component and insert some words, press 'Enter' to save `Card` Component's title
  - If click `textarea` in description part, then we have to save the contents.
    - The situation Trello will not save contents
      1. click the `overlay` area
      2. click the area without `textarea` in description part
      3. click close `button` component
      4. after click `textarea` in description part, if we do not click 'save' button or press 'Enter' as `textarea` is focused
