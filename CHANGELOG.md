# Changelog

All notable changes to this project will be documented in this file.

## [0.4.10] - 2026-04-27

### 📚 Documentation

- Update supported version range and add workflow auditing to security practices ([e993cc0](e993cc037181e1ce7ce6df3f14f303ed3519c65e)) by @chitrank2050

### ⚙️ Miscellaneous Tasks

- Update documentation, JSR integration, and dependency requirements for Node.js 24 and pnpm 10 ([58c62db](58c62db79a08b3776fb8dfc069be3baa69631cb5)) by @chitrank2050
- Add MIT license files and update relative documentation links in packages ([02927ca](02927caab4edcdeb401bf09a13179df0f2b15cbf)) by @chitrank2050
- Move NPM publish step before JSR publish in release workflow ([b961e37](b961e3730cf4edfdea81adcd53929db87e6ea2b5)) by @chitrank2050

## [0.4.9] - 2026-04-27

### 🚜 Refactor

- Remove core pkg dep from package.json in favor of jsr.json imports during release/publish ([12b65d9](12b65d9a6d40040bb26e2d336443a242b6a4b75f)) by @chitrank2050

### ⚙️ Miscellaneous Tasks

- **release:** Bump version to v0.4.9 ([8abac92](8abac926a6afcde68889b34f9ec3d1acefd69538)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)

## [0.4.8] - 2026-04-27

### ⚙️ Miscellaneous Tasks

- **release:** Bump version to v0.4.8 ([625763a](625763a955008fad28cc21bc9e0e18288f8bc818)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)

## [0.4.7] - 2026-04-27

### ⚙️ Miscellaneous Tasks

- **release:** Bump version to v0.4.7 ([d460da9](d460da929b1cf8e9f33a6f91c952b8d6db9b55d8)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)

## [0.4.6] - 2026-04-27

### 🚜 Refactor

- Remove unnecessary unstable deno publish flags from workflow and script ([c082717](c0827170905eeb81b2b840b81ac97a7eee570078)) by @chitrank2050

### ⚙️ Miscellaneous Tasks

- Bump version to 0.4.6 and enable auto nodeModulesDir in JSR configuration ([cc56132](cc561324e45304d16c74e9c043e89b8ff5158550)) by @chitrank2050
- **release:** Bump version to v0.4.6 ([a5aeb20](a5aeb203eb69e035e00f110e6b234fe4833f9b6f)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)

## [0.4.5] - 2026-04-27

### 🚀 Features

- Add commitlint dependencies to core and introduce JSR local publication script ([0611eba](0611eba3c6cd236d2e18e0ce27e20a8f737931ec)) by @chitrank2050

### ⚙️ Miscellaneous Tasks

- **release:** Bump version to v0.4.5 ([d0ab07a](d0ab07abf802072e7c0e44eff7290b4e66617564)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)

## [0.4.4] - 2026-04-27

### 🚀 Features

- Sync CLI imports to JSR registry in release workflow ([ee76e83](ee76e83cc1d4fe7f938a3370e6fba131ccb2248b)) by @chitrank2050

### ⚙️ Miscellaneous Tasks

- **release:** Bump version to v0.4.4 ([7925c43](7925c43f71cb089afd2e6ea006c5180589f04ee3)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)

## [0.4.3] - 2026-04-27

### ⚙️ Miscellaneous Tasks

- **release:** Bump version to v0.4.3 ([42fd4b2](42fd4b290bd233f295e69863607378b3c74e24ef)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)
- Fix jsr publish flags and metadata ([b86fdcc](b86fdcca99138e764ee3a94a5299fb3867eca54f)) by @chitrank2050
- **release:** Bump version to v0.4.3 ([2a7a918](2a7a9188edc9fad49771dc14b0bb79ae83630de7)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)

## [0.4.0] - 2026-04-27

### 🚀 Features

- Update jsr.json version and add dry-run step to release workflow ([60311e6](60311e6fb4247a8586ba7868ae9adc59668d183c)) by @chitrank2050
- Add scoped binary name to cli and reformat jsr exclude lists ([d60a1d8](d60a1d858523a07e0a26392f39de710ac82974a1)) by @chitrank2050
- Update package exclusion rules ([f644133](f644133934d51e09b171c9da5298520b8075b70f)) by @chitrank2050

### 🐛 Bug Fixes

- Implement fallback authentication mechanism for tag pushing in release workflow ([0641d3e](0641d3e2a5200a8daf171cb8e211e18e087c29c9)) by @chitrank2050

### 🚜 Refactor

- Optimize JSR compatibility by isolating dynamic imports & streamlining CI/publish scripts ([67da4c8](67da4c861783d4f5605ff3cbc2e1154d2077ee01)) by @chitrank2050

### ⚙️ Miscellaneous Tasks

- Migrate JSR release process from npx to Deno CLI ([72f60f7](72f60f7c23caf5c188b7adbd2d9aba694fb88ce8)) by @chitrank2050
- Update JSR config with refined publish excludes & explicit package paths for release workflow ([2fd9650](2fd9650fa52289074afb0a8c727b369fd0baa0ea)) by @chitrank2050
- **release:** Bump version to v0.4.0 ([1c54194](1c541942404182763d44222f708b5beedba70ce8)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)
- **release:** Bump version to v0.4.1 ([26b69e3](26b69e3b2c094d7e4f8de7d448bd74ce7caf1b46)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)
- **release:** Bump version to v0.4.2 ([18b8120](18b8120b347f7efaf0fa3cb8dac520f4b18719f6)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)
- **release:** Bump version to v0.4.0 ([61252ae](61252aed2ad518c3b5fe13415152fef81fee7629)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)

## [0.3.1] - 2026-04-27

### 📚 Documentation

- Add security badges and update action usage examples with latest release SHA ([362c615](362c61509fcf38d74ae13c2cdeb8c22d9ab7e652)) by @chitrank2050
- Update package descriptions to clarify ESM support, runtime requirements and dependency status ([599ae6b](599ae6b820dd681e10789afa7691ba37268efce0)) by @chitrank2050

### ⚙️ Miscellaneous Tasks

- **release:** Bump version to v0.3.1 ([9a96697](9a96697793e97aa33d6aba3523028fb328a9b658)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)

## [0.2.0] - 2026-04-27

### 🚀 Features

- Added support for extends and custom rules configuration ([47b5c78](47b5c78065acbbd5231945c0d0ef81d832a07eef)) by @chitrank2050
- Implement configuration extensibility and commitlint parser preset support ([bc57c75](bc57c75916a80f40d0d8eeeaa4b43ffeca16aded)) by @chitrank2050
- Add support for extends and custom rules configuration in documentation ([e2ef5cf](e2ef5cf40d236bca4a66f65f8467625b9ed2629c)) by @chitrank2050
- Add bump command to suggest semantic versioning based on commit history ([21413ae](21413aebff1f90ae0b4e082b88edb2aea5c5dc56)) by @chitrank2050
- Add --json CLI flag and support for configuration validation ([f1567b3](f1567b3388370e3e6726fa7f16bebbea7f3f8285)) by @chitrank2050
- Integrate version bumping into release flow and add commit linting script ([e6c99db](e6c99db280d0c015c01c5714ee6c5d0b455ed71d)) by @chitrank2050
- Introduce zero-config Omni-Mode to auto validate PR metadata & calculate version bumps ([1dd140c](1dd140c24493105aaf4172a85827697774ff638e)) by @chitrank2050
- Granularize CI checks and automate release versioning using git-hygiene recommendations ([736402f](736402f10418e57b33c3ca22d58902439894c2b6)) by @chitrank2050
- Integrate Gitleaks installation into release preparation workflow and configure in lefthook ([31cb24f](31cb24f9120ab7a57cfdf04778d85cf50ff41dd9)) by @chitrank2050
- Export releaseType and reason as action outputs ([b1af537](b1af537a72d221181f31f6f4fa19ce54bd5a2017)) by @chitrank2050

### 🐛 Bug Fixes

- Restrict package.json to essential fields before JSR publication to prevent parser errors ([9bb73cf](9bb73cfb94ea79c621a9641d6a9565aeaf5ec3f9)) by @chitrank2050

### 🚜 Refactor

- Make config loading and validation async to support dynamic preset resolution ([84ca6bf](84ca6bf6bca724ec3a59c1947fe07a29de527afc)) by @chitrank2050
- Improve type safety, add support for function-based parser presets & update documentation ([8df2e95](8df2e95115e192aae091fdec2b1995d754a397e6)) by @chitrank2050
- Improve tag extraction logic to support both workflow inputs and branch naming conventions ([ca57cab](ca57cab37cefa39f9546cd9159c9f1a45da9c756)) by @chitrank2050
- Migrate from CommonJS require to ESM dynamic imports & refine JSR package publishing logic ([100b8a5](100b8a5095b520ecb74235ac4ee0dff02398e3f6)) by @chitrank2050

### 📚 Documentation

- Update documentation for JSON output support and programmatic configuration usage ([221177a](221177aa434cfd29528a9bdcbe22f4fe1d495f4d)) by @chitrank2050
- Add automated release process documentation to CONTRIBUTING.md and README.md ([c3e2549](c3e254945ebc927158f4d6401550c0eab5836edd)) by @chitrank2050

### ⚙️ Miscellaneous Tasks

- Update lefthook configuration to improve git hook execution ([5c0f4ad](5c0f4adc48f44c8156f628fe6acdcc796c0bb03a)) by @chitrank2050
- **release:** Bump version to v0.2.0 ([577bcc8](577bcc8441a61b6c7a6a94ec27f3f1944d54a684)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)
- **release:** Bump version to v0.3.0 ([016aec6](016aec62cb5a288f1a0413d3769ce8d505336212)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)
- Strip scripts and update core dependency version in package.json before JSR publication ([bc2e9d5](bc2e9d5202c6abd1594758810dbdb382dbed6c7c)) by @chitrank2050
- **release:** Bump version to v0.2.0 ([c98ed0a](c98ed0a21d49175025a9fc0ee80e1dd70b6211a6)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)
- Reorder NPM publish step after JSR publish in release workflow ([e5d52dc](e5d52dcd16d45f7369cddc4365320308bcf1f363)) by @chitrank2050
- **release:** Bump version to v0.2.0 ([7cd725a](7cd725abdbcd12d0e14b77fa94c423dd9ddf8933)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)

## [0.1.6] - 2026-04-26

### 📚 Documentation

- Add GitHub Marketplace action badge and registry link to README ([2555faa](2555faa0a9512380c5516faf804073d0b71596a4)) by @chitrank2050

### ⚙️ Miscellaneous Tasks

- **release:** Bump version to v0.1.6 ([df91567](df915671bcf396c4b24cf0d5791004b2600413a7)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)

## [0.1.5] - 2026-04-26

### 🚀 Features

- Add branding icon and color to action metadata ([5c2582d](5c2582de363071757b34738875df170864f863ea)) by @chitrank2050

### 🚜 Refactor

- Remove dedicated action package and consolidate logic into the repository root ([892a890](892a89054d563ee5537109f645e0a3fd31284a55)) by @chitrank2050
- Consolidate PR validation logic and enable automated approval for bot-managed workflows ([5dc3bd1](5dc3bd150beafaf3d91b41a5b3ffc1da8ae043e2)) by @chitrank2050

### 📚 Documentation

- Reorder license section to appear at the end of README ([8ce3632](8ce3632966c4496d23420c05f824adc66b379b33)) by @chitrank2050
- Update badge layout and add registry comparison table to README ([9f394b4](9f394b47372a102e7bfb5ce2f3a853748d5981d4)) by @chitrank2050

### ⚙️ Miscellaneous Tasks

- Update changelog with v0.1.4 release and clean up formatting ([0e9a240](0e9a240a308e93fda4580611b835473a65a3f13a)) by @chitrank2050
- Update workflow trigger name and document GitHub Action usage in README ([d7e6038](d7e60380ddbcd6728ea003c0df759b328b4999b8)) by @chitrank2050
- Update permissions and add strict error handling to auto-approve workflow scripts ([34b2359](34b2359d7a73290f7b484af8443312a283c4ae1a)) by @chitrank2050
- **release:** Bump version to v0.1.5 ([6b623be](6b623be6a739545498d8d274788a61aeb85919df)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)

## [0.1.4] - 2026-04-26

### ⚙️ Miscellaneous Tasks

- Update JSR metadata and bump version to v0.1.3 ([8a45c23](8a45c2397754d93bfc12f7f3e15bb1476f7194f7)) by @chitrank2050
- Update tag pattern and standardize version formatting in release workflow ([8e8787d](8e8787d76f93eb11cc5375ae39a91771acfe6db8)) by @chitrank2050
- Trim commit messages in changelog template ([54cf3de](54cf3deb1fddb9773b298adbb2822a6c79daacba)) by @chitrank2050
- **release:** Bump version to v0.1.4 ([0dbb79e](0dbb79ed0596591f0530c047d61b8f22cfb92f19)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)

## [0.1.3] - 2026-04-26

### ⚙️ Miscellaneous Tasks

- Update JSR metadata with descriptions and publication filters ([cd4076e](cd4076ec433a7d7188244575145a2674fa599cd0)) by @chitrank2050
- **release:** Bump version to v0.1.3 ([f10e8be](f10e8beebde9ecbb137ec4faadabead7445d5ae4)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)

## [0.1.2] - 2026-04-26

### 🚜 Refactor

- Improve PR authorization logic and add draft status validation to auto-approve workflow ([900a8f9](900a8f90300bc27763e67b4d68eac16f6d2f3f1a)) by @chitrank2050
- Streamline auto-approve workflow authorization, permissions, and status checks ([77ef074](77ef074dd5886282059102e9fcc41e8ce48e5430)) by @chitrank2050
- Replace auto-approval flow with direct auto-merge enablement in CI workflow ([4017b05](4017b05832f246ba2b8b7d4e61e753d7b0ff633d)) by @chitrank2050
- Replace auto-approve logic with direct auto-merge enablement in CI workflow ([874bd13](874bd1300ff40e152e989d0d43c6785ce79db64b)) by @chitrank2050

### ⚙️ Miscellaneous Tasks

- Renovate config to include merge confidence, refine matching rules & group actions deps ([feab45a](feab45af018de9e9e07edfbdf1b88620ead6aa36)) by @chitrank2050
- Update contents permission to write in auto-approve workflow ([b0a44cc](b0a44cc2d5a8f5edd848516f169ca37909aded1d)) by @chitrank2050
- Update gitignore and allow dirty state in jsr publish workflow ([72d661c](72d661c31a90933ff7c0b2f992dbe5f6af706b7b)) by @chitrank2050
- **release:** Bump version to 0.1.2 ([a1f62c2](a1f62c24c03c19a18ce8b97610350030afec56a5)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)
- Update maxHeaderLength to 100 in constants and remove redundant config from package.json ([b1a838a](b1a838ae59c30d46bd8316d5bf1baf2eb693e791)) by @chitrank2050
- Increase default maxHeaderLength from 72 to 100 across documentation and config ([ae99ac9](ae99ac9d9b6306a723e14c8beb25350d5ba4ac24)) by @chitrank2050
- Update release workflow to sync versioning for both NPM and JSR packages ([047f4d8](047f4d8ae50751d6ff36b1867e65b9713056f51e)) by @chitrank2050
- **release:** Bump version to v0.1.2 ([7fe59ba](7fe59ba1af525ce354321b516cdd6c8e8b101c4a)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)
- **release:** Bump version to v0.1.2 ([899bd2f](899bd2f53d54697e0295767ae8f010868a962c46)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)
- Dynamically update core package dependency versions during JSR publication ([7f44522](7f44522ce8c09f6d99885ef8a9e062b6b2bb691c)) by @chitrank2050
- **release:** Bump version to v0.1.2 ([2181482](2181482afeac483bbdfddb8ede12380ca5ff50e3)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)

## [0.1.1] - 2026-04-26

### 🚀 Features

- Add configuration for allowed commit types to package manifest files ([78e8a93](78e8a931d9ad67ef50621598918156b22571e3eb)) by @chitrank2050

### 📚 Documentation

- Add repository structure to CONTRIBUTING.md and clean up redundant engine test assertion ([a40917f](a40917fb98bb2e8eceed9d7f5a1ecc58e56f2a24)) by @chitrank2050
- Add input table to README and migrate Gitleaks scan to official GitHub Action ([858f6c4](858f6c41df7f11b062ed7b61e4e3514726b38601)) by @chitrank2050

### ⚙️ Miscellaneous Tasks

- Add MIT license field to jsr.json files in core and cli packages ([f385a7e](f385a7e6442d18f24be9a473f8e2eadaa669062a)) by @chitrank2050
- **release:** Bump version to 0.1.1 ([6490c0f](6490c0f7a7a7f1f89c01fda4adabbac04079f00f)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)

## [0.1.0] - 2026-04-26

### 🚀 Features

- Initialize git-hygiene project with configuration and tooling ([9c773c6](9c773c651c5497b58c6173d71da4fd57dec618b1)) by @chitrank2050
- Configure Lefthook git hooks and enable experimental TypeScript execution for tests and CLI commands ([67f0607](67f0607d2985166c10beb72acfdbdea5b6856143)) by @chitrank2050
- Implement configurable project settings with dynamic validation rules ([5333e5a](5333e5a888e218c48fcfabfc9228ad9b9c85ec83)) by @chitrank2050
- Add configurable commit linting rules for length, casing, scope, and subject punctuation ([384034f](384034fb6789fec1673773b4d66a65cb4e67423b)) by @chitrank2050
- Implement automated PR labeler with custom bot token setup action ([807ee66](807ee664ba986816726d92f00ceecac39080938a)) by @chitrank2050
- Add stale issue management and workflow security linting automation ([b50dbe3](b50dbe37ea51f6e514b5ec93529464455c7c74cd)) by @chitrank2050
- Add OpenSSF Scorecard workflow for security health analysis ([f62c301](f62c3011380f2df5d53c758fc14c77b2f42d987f)) by @chitrank2050
- Configure smart exemption rules for stale issues and pull requests ([fe255a3](fe255a3449f2d1ec291b590df73fea2b4c8a1104)) by @chitrank2050
- Add CI and automated PR approval workflows ([e133d57](e133d57482ad6956e1717abb6ee516212ae50c84)) by @chitrank2050
- Add automated release scripts for changelog gen & version tag with shared logging utility ([6a30972](6a309724ada551e5381d67b497a09fcdb4e13998)) by @chitrank2050
- Add auto PR desc gen and optimize CI workflows with path filtering & concurrent job exec ([40b4b1b](40b4b1bad8bb14760d22dc2af64e400923751e7f)) by @chitrank2050
- Add weekly workflow to prune redundant pnpm dependency overrides ([859ba86](859ba86e28ed7945aa23c0c720544411445fb89e)) by @chitrank2050
- Add automated release preparation and finalization workflows ([9a2f11c](9a2f11c24bc212832b7e2d51345a4a5466ec5273)) by @chitrank2050
- Add PR hygiene workflow and update JSR publishing to use OIDC authentication ([ff57d6b](ff57d6bd5cd6ffb9ebbf0797c50f603678ebc6d4)) by @chitrank2050
- Enhance CI/CD security by adding gitleaks & zizmor lint to lefthook and updating action deps ([3239d1b](3239d1b089780eaf704127a6064eebd35110ce07)) by @chitrank2050
- Branch validation for specific args & improve cov report generation by ensuring dir existence ([0e45da4](0e45da4aabf2fdba1f9752d6c8b6bc3667546f6d)) by @chitrank2050
- Add workflow_dispatch trigger to release-finalize & optimize dep install with --prefer-offline ([4719c57](4719c571805c1fb15f642e5d14835d024bbb927b)) by @chitrank2050
- Expose detailed validation errors in engine & update docs with configuration references ([98c776b](98c776bf0e5606ae1cd78d4aaddadd21bc6e7fae)) by @chitrank2050

### 🐛 Bug Fixes

- Correct Gitleaks GITHUB_TOKEN environment variable configuration ([1b9bef6](1b9bef6100d023909b67cf86d95680dc4d8766b8)) by @chitrank2050
- Remove environment variables from Scorecard workflow to comply with security restrictions ([406f55d](406f55debe2d2314dccdc971c2df064f4ca70731)) by @chitrank2050
- Allow optional 'v' prefix in branch names and normalize tag format in release workflow ([f72234e](f72234e0a41ad5dcbb67caf9d3ee60eac3efc7f4)) by @chitrank2050

### 🚜 Refactor

- Migrate to monorepo structure with turbo, adding core engine, cli, and github action packages ([af1219a](af1219a726fea1408a5b8fec947fd3dd6969d21f)) by @chitrank2050
- Update CI pipeline to use granular file filtering and conditional job execution ([8f70154](8f70154dd5c4ba5a8ad5f0084a0131885aa69565)) by @chitrank2050
- Enforce granular workflow permissions and add timeout limits across all CI actions ([4cb11a3](4cb11a3c072608f6ad8fcd6e34504d5741eb6500)) by @chitrank2050
- Remove build configuration and dependencies from action package ([c3c26a4](c3c26a43461648ca33f99bd4b1bf195b9219f884)) by @chitrank2050

### 📚 Documentation

- Overhaul README with updated features, installation instructions, and project architecture details ([6358d3c](6358d3cfad10661569fde87592a6bb6c743b7f68)) by @chitrank2050
- Overhaul README with enhanced feat list, installation examples & architectural documentation ([8d09a18](8d09a189de3e29f242038b4539c26af036e67428)) by @chitrank2050
- Update security policy with disclosure process, add assets, and refresh README header branding ([9ace73a](9ace73a5c414c95f0052759a348d8bfd60a7399a)) by @chitrank2050
- Add OpenSSF Scorecard badge to README ([d9b342e](d9b342e9181c9d1fb33bc28300d602e397cae16b)) by @chitrank2050
- Enhance project doc with badges & improved formatting while setting action pkg to private ([acd0a25](acd0a2521b73cce60c2269adbfc6855f41e28522)) by @chitrank2050

### ⚙️ Miscellaneous Tasks

- Add jsr.json configuration files to packages and update lockfile ([b3b07bd](b3b07bd8b057a91133820f05117d98bb1e204e91)) by @chitrank2050
- Update dependencies and bump node types to 25.6.0 ([14e84b1](14e84b13e0c6804cf2e2a3bbdb3a94db11211919)) by @chitrank2050
- Ignore .turbo directory, update lockfile, and fix engine import extension ([dcfcced](dcfccedca8265ade39c9b1fa8cc67f0c44a902e5)) by @chitrank2050
- Update turbo cache artifacts and build metadata ([e058900](e0589006e663df930d42ba1a71d9b17e1a9b306c)) by @chitrank2050
- Upgrade linting stack, refine types, and update git hooks and tooling scripts ([158bb1f](158bb1f4f3f618721278448750d42f174368525b)) by @chitrank2050
- Add lefthook install script and update development dependencies ([e002f7e](e002f7ec8324f415849747ccea57ec8a30da2194)) by @chitrank2050
- Git-cliff for automated changelog gen & update lefthook config ([d6f2cd8](d6f2cd85f64504a3098373ae406e1b8ee62e77a4)) by @chitrank2050
- Remove explicit pnpm version from ci workflow ([5543a9b](5543a9baabd07e6182b81b2b45e3452490f60366)) by @chitrank2050
- Remove git-cliff dependency from package.json and lockfile ([c200eb7](c200eb7774b28bccea79da33827f1e5c15ffa987)) by @chitrank2050
- Scope migration to @chitrank2050 and standardize package configurations ([866fc96](866fc9637ea3ab9558f39de92073063714a0fc0c)) by @chitrank2050
- Pin checkout and labeler actions to specific commit hashes ([e4a13cd](e4a13cd2165ab670932e157c1e398f6525ff3318)) by @chitrank2050
- Upgrade pnpm setup action and migrate package scope to @chitrank2050 ([bf0b9cb](bf0b9cbb6d7454b636d3328c9821e0f4f738030f)) by @chitrank2050
- Integrate markdownlint, refactor CI scripts, and update Gitleaks action ([8c58511](8c5851128220d49198dc40a9f3b333138403cae5)) by @chitrank2050
- Update lefthook configuration hooks ([6ec27a8](6ec27a85ac69aec4aa516703c90f81cebfe84672)) by @chitrank2050
- Upgrade markdownlint-cli to v0.48.0 ([0c02a89](0c02a8986d2ce5aadb7cb27f2600623f3782fb81)) by @chitrank2050
- Update Scorecard workflow configuration and add security policy document ([13a7e2b](13a7e2bc9a734dad0e9330a63214c5446a2435fa)) by @chitrank2050
- Replace gitleaks-action with direct binary installation in CI workflow ([a2594e4](a2594e4ed8b5a14d97bc7b23b830ef69de904084)) by @chitrank2050
- Update pkg naming, add README documentation & enable platform automerge in Renovate config ([4731fcb](4731fcb33cf71234750ac8efc2bd2745dbb06833)) by @chitrank2050
- Add project governance, community documentation, issue templates, and test coverage scripts ([8ccc044](8ccc044ef5ab4219c907c882bfdd119cc7367955)) by @chitrank2050
- Update release workflow permissions and add version field to package.json ([dfcf099](dfcf099ff1ba9f2dcaa48a4fd16d243234cc349b)) by @chitrank2050
- Update release PR title format and optimize CI coverage upload condition ([1f02eb8](1f02eb8259671b8c01ab0d5063e8e8d77700b026)) by @chitrank2050
- Add rocket emoji to release pull request title ([fef1a64](fef1a64af80b3411483b96de290c7a338d16144d)) by @chitrank2050
- Update changelog template to link github users and add remote repository configuration ([ef71397](ef713972906a0a6c47add22d721653cc17de719e)) by @chitrank2050
- **release:** Bump version to 0.1.0 ([7a12644](7a12644c82a348bbfbd850c11b111c26717cc1a2)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)
- **release:** Bump version to 0.1.0 ([2556b6f](2556b6fec14e4e9740aa3bf85eed270b509ab2ca)) by [chitrank-actions[bot]](https://github.com/apps/chitrank-actions)

<!-- generated by git-cliff -->
