# Changelog

All notable changes to this project will be documented in this file.

## [0.1.0] - 2026-04-26

### 🚀 Features

- Initialize git-hygiene project with configuration and tooling ([9c773c6](9c773c651c5497b58c6173d71da4fd57dec618b1)) by chitrank2050
- Configure Lefthook git hooks and enable experimental TypeScript execution for tests and CLI commands ([67f0607](67f0607d2985166c10beb72acfdbdea5b6856143)) by chitrank2050
- Implement configurable project settings with dynamic validation rules ([5333e5a](5333e5a888e218c48fcfabfc9228ad9b9c85ec83)) by chitrank2050
- Add configurable commit linting rules for length, casing, scope, and subject punctuation ([384034f](384034fb6789fec1673773b4d66a65cb4e67423b)) by chitrank2050
- Implement automated PR labeler with custom bot token setup action ([807ee66](807ee664ba986816726d92f00ceecac39080938a)) by chitrank2050
- Add stale issue management and workflow security linting automation ([b50dbe3](b50dbe37ea51f6e514b5ec93529464455c7c74cd)) by chitrank2050
- Add OpenSSF Scorecard workflow for security health analysis ([f62c301](f62c3011380f2df5d53c758fc14c77b2f42d987f)) by chitrank2050
- Configure smart exemption rules for stale issues and pull requests ([fe255a3](fe255a3449f2d1ec291b590df73fea2b4c8a1104)) by chitrank2050
- Add CI and automated PR approval workflows ([e133d57](e133d57482ad6956e1717abb6ee516212ae50c84)) by chitrank2050
- Add automated release scripts for changelog gen & version tag with shared logging utility ([6a30972](6a309724ada551e5381d67b497a09fcdb4e13998)) by chitrank2050
- Add auto PR desc gen and optimize CI workflows with path filtering & concurrent job exec ([40b4b1b](40b4b1bad8bb14760d22dc2af64e400923751e7f)) by chitrank2050
- Add weekly workflow to prune redundant pnpm dependency overrides ([859ba86](859ba86e28ed7945aa23c0c720544411445fb89e)) by chitrank2050
- Add automated release preparation and finalization workflows ([9a2f11c](9a2f11c24bc212832b7e2d51345a4a5466ec5273)) by chitrank2050
- Add PR hygiene workflow and update JSR publishing to use OIDC authentication ([ff57d6b](ff57d6bd5cd6ffb9ebbf0797c50f603678ebc6d4)) by chitrank2050
- Enhance CI/CD security by adding gitleaks & zizmor lint to lefthook and updating action deps ([3239d1b](3239d1b089780eaf704127a6064eebd35110ce07)) by chitrank2050
- Branch validation for specific args & improve cov report generation by ensuring dir existence ([0e45da4](0e45da4aabf2fdba1f9752d6c8b6bc3667546f6d)) by chitrank2050

### 🐛 Bug Fixes

- Correct Gitleaks GITHUB_TOKEN environment variable configuration ([1b9bef6](1b9bef6100d023909b67cf86d95680dc4d8766b8)) by chitrank2050
- Remove environment variables from Scorecard workflow to comply with security restrictions ([406f55d](406f55debe2d2314dccdc971c2df064f4ca70731)) by chitrank2050

### 🚜 Refactor

- Migrate to monorepo structure with turbo, adding core engine, cli, and github action packages ([af1219a](af1219a726fea1408a5b8fec947fd3dd6969d21f)) by chitrank2050
- Update CI pipeline to use granular file filtering and conditional job execution ([8f70154](8f70154dd5c4ba5a8ad5f0084a0131885aa69565)) by chitrank2050
- Enforce granular workflow permissions and add timeout limits across all CI actions ([4cb11a3](4cb11a3c072608f6ad8fcd6e34504d5741eb6500)) by chitrank2050
- Remove build configuration and dependencies from action package ([c3c26a4](c3c26a43461648ca33f99bd4b1bf195b9219f884)) by chitrank2050

### 📚 Documentation

- Overhaul README with updated features, installation instructions, and project architecture details ([6358d3c](6358d3cfad10661569fde87592a6bb6c743b7f68)) by chitrank2050
- Overhaul README with enhanced feat list, installation examples & architectural documentation ([8d09a18](8d09a189de3e29f242038b4539c26af036e67428)) by chitrank2050
- Update security policy with disclosure process, add assets, and refresh README header branding ([9ace73a](9ace73a5c414c95f0052759a348d8bfd60a7399a)) by chitrank2050

### ⚙️ Miscellaneous Tasks

- Add jsr.json configuration files to packages and update lockfile ([b3b07bd](b3b07bd8b057a91133820f05117d98bb1e204e91)) by chitrank2050
- Update dependencies and bump node types to 25.6.0 ([14e84b1](14e84b13e0c6804cf2e2a3bbdb3a94db11211919)) by chitrank2050
- Ignore .turbo directory, update lockfile, and fix engine import extension ([dcfcced](dcfccedca8265ade39c9b1fa8cc67f0c44a902e5)) by chitrank2050
- Update turbo cache artifacts and build metadata ([e058900](e0589006e663df930d42ba1a71d9b17e1a9b306c)) by chitrank2050
- Upgrade linting stack, refine types, and update git hooks and tooling scripts ([158bb1f](158bb1f4f3f618721278448750d42f174368525b)) by chitrank2050
- Add lefthook install script and update development dependencies ([e002f7e](e002f7ec8324f415849747ccea57ec8a30da2194)) by chitrank2050
- Git-cliff for automated changelog gen & update lefthook config ([d6f2cd8](d6f2cd85f64504a3098373ae406e1b8ee62e77a4)) by chitrank2050
- Remove explicit pnpm version from ci workflow ([5543a9b](5543a9baabd07e6182b81b2b45e3452490f60366)) by chitrank2050
- Remove git-cliff dependency from package.json and lockfile ([c200eb7](c200eb7774b28bccea79da33827f1e5c15ffa987)) by chitrank2050
- Scope migration to @chitrank2050 and standardize package configurations ([866fc96](866fc9637ea3ab9558f39de92073063714a0fc0c)) by chitrank2050
- Pin checkout and labeler actions to specific commit hashes ([e4a13cd](e4a13cd2165ab670932e157c1e398f6525ff3318)) by chitrank2050
- Upgrade pnpm setup action and migrate package scope to @chitrank2050 ([bf0b9cb](bf0b9cbb6d7454b636d3328c9821e0f4f738030f)) by chitrank2050
- Integrate markdownlint, refactor CI scripts, and update Gitleaks action ([8c58511](8c5851128220d49198dc40a9f3b333138403cae5)) by chitrank2050
- Update lefthook configuration hooks ([6ec27a8](6ec27a85ac69aec4aa516703c90f81cebfe84672)) by chitrank2050
- Upgrade markdownlint-cli to v0.48.0 ([0c02a89](0c02a8986d2ce5aadb7cb27f2600623f3782fb81)) by chitrank2050
- Update Scorecard workflow configuration and add security policy document ([13a7e2b](13a7e2bc9a734dad0e9330a63214c5446a2435fa)) by chitrank2050
- Replace gitleaks-action with direct binary installation in CI workflow ([a2594e4](a2594e4ed8b5a14d97bc7b23b830ef69de904084)) by chitrank2050
- Update pkg naming, add README documentation & enable platform automerge in Renovate config ([4731fcb](4731fcb33cf71234750ac8efc2bd2745dbb06833)) by chitrank2050
- Add project governance, community documentation, issue templates, and test coverage scripts ([8ccc044](8ccc044ef5ab4219c907c882bfdd119cc7367955)) by chitrank2050
- Update release workflow permissions and add version field to package.json ([dfcf099](dfcf099ff1ba9f2dcaa48a4fd16d243234cc349b)) by chitrank2050
- Update release PR title format and optimize CI coverage upload condition ([1f02eb8](1f02eb8259671b8c01ab0d5063e8e8d77700b026)) by chitrank2050
- Add rocket emoji to release pull request title ([fef1a64](fef1a64af80b3411483b96de290c7a338d16144d)) by chitrank2050

<!-- generated by git-cliff -->
