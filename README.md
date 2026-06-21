# News

`news` is a [React Native](https://reactnative.dev) **mini-app** within the Super App Showcase — a news/article reading experience. It is built as a [Module Federation](https://module-federation.io) remote using [Re.Pack](https://re-pack.dev) (Rspack), loaded at runtime by the host shell, or run on its own in standalone mode for local development.

## What it exposes

The Rspack config registers a federated container named `news` and exposes a single module:

| Key      | Module                          | Description                              |
| -------- | ------------------------------- | ---------------------------------------- |
| `./App`  | `./src/navigation/MainNavigator` | Tab-based news app rendered by the host |

- **Container name:** `news`
- **Remote entry:** `news.container.js.bundle`
- **Output uniqueName:** `sas-news`

`MainNavigator` wraps a [`TabsNavigator`](src/navigation/TabsNavigator.tsx) with Home, Search, and Account tabs. The app is self-contained — it has no dependency on an Auth remote and runs standalone without other dev servers.

It shares a single [`super-app-showcase-sdk/lib/counterStore`](../superApp/packages/sdk) singleton with the rest of the mini-apps so the shared counter stays in sync across the super app.

## Tech stack

- React Native `0.84.1` / React `19.2.3`
- [`@callstack/repack`](https://re-pack.dev) `5.2.5` with `@rspack/core` for bundling
- [`@module-federation/enhanced`](https://module-federation.io) (`ModuleFederationPluginV2`)
- [React Navigation](https://reactnavigation.org) (`native-stack`) + [`react-native-bottom-tabs`](https://github.com/callstackincubator/react-native-bottom-tabs)
- [`react-native-paper`](https://reactnativepaper.com) + `react-native-vector-icons` for UI
- [`zustand`](https://github.com/pmndrs/zustand) for state (shared counter store)
- [`@gorhom/bottom-sheet`](https://github.com/gorhom/react-native-bottom-sheet) + `react-native-reanimated` / `react-native-gesture-handler` / `react-native-screens`

Production builds are signed via Re.Pack's `CodeSigningPlugin` (`code-signing.pem`).

## Getting Started

> **Note**: Complete the [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment) before proceeding. Requires Node `>= 22`. Package manager is `pnpm@9.15.3`.

Install dependencies:

```sh
pnpm install
```

### Step 1: Start the dev server

`news` runs its Re.Pack dev server on **port 9004** so it doesn't collide with the host (8081):

```sh
pnpm start
```

To run the mini-app **standalone** (eager-loaded shared deps, default port 8081):

```sh
pnpm start:standalone
```

The `STANDALONE` env flag flips shared dependencies to `eager` so the bundle can boot without a host providing them.

### Step 2: Build and run on a device

With the dev server running, in another terminal:

```sh
# iOS — install pods first (first clone / after native dep changes)
pnpm pods
pnpm ios

# Android
pnpm android
```

### Generate bundle files

```sh
pnpm bundle           # both platforms
pnpm bundle:ios       # iOS only
pnpm bundle:android   # Android only
```

## Project layout

| Path                          | Purpose                                                   |
| ----------------------------- | --------------------------------------------------------- |
| `src/App.tsx`                 | App root — providers + `NavigationContainer`              |
| `src/navigation/`             | `MainNavigator` (exposed), `TabsNavigator`, per-tab stacks |
| `src/screens/`                | `HomeScreen`, `SearchScreen`, `AccountScreen`             |
| `src/components/`             | `Counter`, `NavBar`                                       |
| `src/data/`                   | Mock news/article JSON fixtures                           |
| `index.js`                    | `AppRegistry` entry point (standalone runs)               |
| `rspack.config.ts`            | Re.Pack + Module Federation V2 configuration              |
| `sharedDeps.js`               | Derives the shared dependency map from `package.json`     |
| `android/` `ios/`             | Native projects                                           |

## Scripts

| Script                   | Description                                          |
| ------------------------ | ---------------------------------------------------- |
| `pnpm start`             | Start the dev server on port 9004                    |
| `pnpm start:standalone`  | Start standalone (eager shared deps) on port 8081    |
| `pnpm android`           | Build & run on Android                               |
| `pnpm ios`               | Build & run on iOS                                   |
| `pnpm pods`              | Install CocoaPods deps (`bundle install` + `pod install`) |
| `pnpm pods:update`       | Update CocoaPods deps                                |
| `pnpm bundle[:platform]` | Generate JS bundle(s) for ios/android                |
| `pnpm lint`              | Run ESLint                                           |
| `pnpm test`              | Run Jest tests                                       |

## Learn more

- [Re.Pack documentation](https://re-pack.dev/docs)
- [Module Federation](https://module-federation.io)
- [React Native](https://reactnative.dev)
</content>
