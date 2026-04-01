export default interface ApplicationConfig {
  title: string;
  logo: string;

  language: string;
  languages: {
    id: string;
    title: string;
    currency: string;
  }[];
  ref: string;

  urlForCss: string;
  urlForGitLog: string;

  prefixForTask: string;
  prefixForPR: string;

  middleSalaryInMonth: number;
  workDays: boolean[];
  currency: string;
  exchangeRate: Record<string, number>;

  permissions: string[];
  disabledPermissions: string[];

  plugins: string[];
  disabledPlugins: string[];
}
