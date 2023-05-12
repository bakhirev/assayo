export interface IEmployeesSalary {
  id: number;
  value: number;
  currency: string;
  workDaysInYear: number;
  vacationDaysInYear: number;
  workDaysInWeek: number;
  from: string;
}

export interface IEmployees {
  id: number;
  name: string;
  order: number;
  salary: IEmployeesSalary[];
}

export interface ISetting {
  defaultFilters: {
    minCommits: number;
    from: string;
    to: string;
  };
  filters: {
    minCommits: number;
    from: string;
    to: string;
  };
  defaultSalary: {
    value: number;
    currency: string;
    workDaysInYear: number;
    vacationDaysInYear: number;
    workDaysInWeek: number;
    type: 'full' | 'part';
  };
  linksPrefixForTasks: string;
  employees: IEmployees[];
}
