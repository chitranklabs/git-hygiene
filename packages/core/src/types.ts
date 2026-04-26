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

  /**
   * The maximum allowed length for the commit message header (first line).
   * Default is 72 characters (Conventional Commits standard).
   */
  maxHeaderLength: number;

  /**
   * Minimum and maximum allowed length for the commit message body.
   */
  maxBodyLength?: number;
  minBodyLength?: number;

  /**
   * Rules for casing of types and scopes.
   * Default is 'lower-case'.
   */
  typeCase?: string;
  scopeCase?: string;

  /**
   * Whether to allow an empty scope in PR titles and commit messages.
   * Default is true.
   */
  allowEmptyScope?: boolean;

  /**
   * Whether the subject should end with a full stop.
   * Default is 'never'.
   */
  subjectFullStop?: 'always' | 'never';
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
