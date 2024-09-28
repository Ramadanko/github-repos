# github-repos

## Overview
This project allows users to find the most starred GitHub repositories for a given programming language, within a specified date range, and with a minimum number of stars. The application interacts with GitHub’s Search API to fetch repositories and displays the results in dynamically scrollable tiles.

## Features
- Search for Most Starred GitHub Repositories by Language
- Users can select a programming language from a dropdown list.
- Date Range Filter
  - Users can filter repositories based on the date they were created using a dropdown calendar
  - The results will include only the repositories created within the selected date range
- Star Count Filter: Users can filter repositories by specifying a minimum number of stars.
- Repository Details Displayed on Tiles
  - Each tile shows the repository name, description, owner’s username, and the number of stars.
  - Clicking on the repository name opens the GitHub repository page in a new tab.
- Error Handling and Loading States
  - The app displays loading progress bar while fetching data
  - User-friendly error messages are shown when the GitHub API request fails
- Infinite Scrolling for Each Language Tile
  - Each language tile supports infinite scrolling, meaning more repositories are fetched as the user scrolls down.

## Architecture and Structure
the way I structure my single page apps are the following starting from the src folder
- maint.ts or index.ts the application starting point
- components folder
  - for reusable components across the app
  - modules folder where each module mostly represents and entity where we have CRUD operations, things that mostly relate together & can be managed in isolation 
    - ListPage
    - CreateEditForm
    - DetailedPage
    - store file
    - constants
    - Route.ts to export module routes
  - router/index.ts
    - is to import routes from other module and build app's route
  - store folder: is to create app global store(s) that could be used in many places in across the app
  - assets folder for static files like images, fonts, etc..
  - utils folder
    - is for global utility function(s) I can use everywhere

That approach I used is also known as organize by **feature** and yes some developers prefer to organize the application by **type** but, I prefer the first approach

**Note:** there is no need to use global state management for this simple task, i'm using it here which is Pinia to show that I know it how I use it.

## Recommended IDE Setup

[Webstorm](https://www.jetbrains.com/webstorm/)

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup
First install [Nodejs](https://nodejs.org/en) 18.3 or higher

```sh
yarn install
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```
