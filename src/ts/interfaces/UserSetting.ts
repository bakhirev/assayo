interface IEmploymentContract {
  value: number;
  currency: string;
  workDaysInYear: number;
  vacationDaysInYear: number;
  workDaysInWeek: number[];
  type: string;
}

export interface IEmployeesSalary extends IEmploymentContract {
  id: number;
  from: string;
  milliseconds?: number;
}

export interface IEmployees {
  id: number;
  name: string;
  order: number;
  salary: IEmployeesSalary[];
}

export interface IUserSetting {
  version: number;
  defaultSalary: IEmploymentContract; // TODO: rename defaultEmploymentContract
  linksPrefix: {
    task: string;
    pr: string;
  };
  employees: IEmployees[];
}
