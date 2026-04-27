import fs from 'node:fs';
import path from 'node:path';
import type { GitHygieneConfig, ResolvedConfig, ParserPreset } from './types.ts';
import { DEFAULT_CONFIG } from './constants.ts';
import { createRequire } from 'node:module';
import { loadPreset } from 'conventional-changelog-preset-loader';

const require = createRequire(import.meta.url);

let cachedConfig: ResolvedConfig | null = null;

/**
 * @description
 * Loads the user's config from package.json and merges it with the defaults.
 *
 * @returns {Promise<ResolvedConfig>} The fully resolved and compiled configuration
 */
export async function loadConfig(): Promise<ResolvedConfig> {
  if (cachedConfig) return cachedConfig;

  let userConfig: Partial<GitHygieneConfig> = {};

  try {
    const pkgPath = path.resolve(process.cwd(), 'package.json');
    if (fs.existsSync(pkgPath)) {
      const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
      if (pkg['git-hygiene']) {
        userConfig = pkg['git-hygiene'];
      }
    }
  } catch {
    // Silently fallback to defaults if package.json is missing or invalid
  }

  cachedConfig = await resolveConfig(userConfig);
  return cachedConfig;
}

/**
 * @description
 * Resolves a partial user configuration by merging it with defaults and
 * applying extensions (like @commitlint/config-conventional).
 *
 * @param userConfig - The partial configuration provided by the user
 * @returns {Promise<ResolvedConfig>} The resolved configuration with compiled patterns
 */
export async function resolveConfig(
  userConfig: Partial<GitHygieneConfig>,
): Promise<ResolvedConfig> {
  const mergedConfig: GitHygieneConfig = {
    extends: userConfig.extends || [],
    rules: userConfig.rules || {},
    types: userConfig.types || DEFAULT_CONFIG.types,
    ignoreBranches: userConfig.ignoreBranches || DEFAULT_CONFIG.ignoreBranches,
    maxHeaderLength: userConfig.maxHeaderLength || DEFAULT_CONFIG.maxHeaderLength,
    maxBodyLength: userConfig.maxBodyLength || DEFAULT_CONFIG.maxBodyLength,
    minBodyLength: userConfig.minBodyLength || DEFAULT_CONFIG.minBodyLength,
    typeCase: userConfig.typeCase || DEFAULT_CONFIG.typeCase,
    scopeCase: userConfig.scopeCase || DEFAULT_CONFIG.scopeCase,
    allowEmptyScope: userConfig.allowEmptyScope ?? DEFAULT_CONFIG.allowEmptyScope,
    subjectFullStop: userConfig.subjectFullStop || DEFAULT_CONFIG.subjectFullStop,
    parserPreset: userConfig.parserPreset,
  };

  // Process extensions
  for (const extension of mergedConfig.extends || []) {
    // Specialized support for @commitlint/config-conventional
    if (extension === '@commitlint/config-conventional') {
      try {
        const conventional = require('@commitlint/config-conventional');
        const convRules = conventional.default?.rules || conventional.rules || {};

        if (convRules['type-enum']) {
          const convTypes = convRules['type-enum'][2];
          if (Array.isArray(convTypes)) {
            mergedConfig.types = Array.from(new Set([...mergedConfig.types, ...convTypes]));
          }
        }

        if (!userConfig.maxHeaderLength && convRules['header-max-length']) {
          mergedConfig.maxHeaderLength = convRules['header-max-length'][2];
        }

        if (!userConfig.parserPreset && conventional.default?.parserPreset) {
          mergedConfig.parserPreset = conventional.default.parserPreset;
        }
      } catch {
        console.warn(`Failed to load ${extension}. Is it installed?`);
      }
    } else {
      // Generic preset support using conventional-changelog-preset-loader
      try {
        const preset = (await loadPreset(extension)) as ParserPreset;
        const parserOpts = preset?.parserOpts || preset?.parser;
        if (parserOpts?.headerPattern) {
          // If the preset has its own parser options, use it as the parserPreset
          mergedConfig.parserPreset = preset;
        }
      } catch {
        // Fallback or ignore if it's not a valid preset
      }
    }
  }

  const typesPattern = mergedConfig.types.join('|');
  const branchesPattern = mergedConfig.ignoreBranches.join('|');

  const scopePattern = mergedConfig.allowEmptyScope ? '(\\([a-z0-9-]+\\))?' : '(\\([a-z0-9-]+\\))';

  const resolved = {
    ...mergedConfig,
    patterns: {
      branch: new RegExp(`^(${branchesPattern})$|^(${typesPattern})/.+$`),
      title: new RegExp(`^(${typesPattern})(!)?${scopePattern}: .+$`),
    },
  };

  return resolved;
}

/**
 * @description
 * Helper for testing environments to force a configuration reload.
 */
export function clearConfigCache(): void {
  cachedConfig = null;
}
