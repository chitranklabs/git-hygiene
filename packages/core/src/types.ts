/**
 * @description
 * The core configuration object for git-hygiene.
 * Defines the allowed metadata standards across the repository.
 */
export interface GitHygieneConfig {
  /**
   * The list of allowed commit/branch types (e.g., 'feat', 'fix').
   * Enforced in PR titles, branch names, and commit messages.
   */
  types: string[];

  /**
   * Branch names that should bypass branch naming validation.
   * Typically base branches like 'main', 'master', 'development'.
   */
  ignoreBranches: string[];
}

/**
 * @description
 * The resolved configuration object with dynamically generated regular expressions.
 */
export interface ResolvedConfig extends GitHygieneConfig {
  /**
   * Pre-compiled Regex patterns based on the configuration.
   */
  patterns: {
    /** Pattern to validate branch names */
    branch: RegExp;
    /** Pattern to validate PR titles */
    title: RegExp;
  };
}

/**
 * @description
 * The result of a metadata validation check.
 */
export interface ValidationResult {
  /** True if the validation passed */
  valid: boolean;
  /** Human-readable message explaining the result */
  message: string;
  /** The actual input that was evaluated (if invalid) */
  actual?: string;
  /** The expected format or rule (if invalid) */
  expected?: string;
}
