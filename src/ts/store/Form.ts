import { makeObservable, observable, action } from 'mobx';
import FormData from 'ts/helpers/FormData';

interface IError {
  id: string;
  message: string;
}

export interface IFormStore {
  isSuccess: boolean;
  isLocked: boolean;
  isLoading: boolean;
  isServerError: boolean;
  initState: any;
  state: any;

  errorMessage: string;
  errors: IError[];
  setFormError: Function;
  removeFormError: Function;

  setState: Function;
  setInitState?: (response: any) => void;

  updateState: Function;
  updateInitState?: Function;

  clearErrorMessage: () => void;
  clearAllErrors: () => void;
  clear: Function;

  setIsLocked: (status: boolean) => void;

  getFormattedState: Function;
  validation: Function;
  submit: (loader: Function, data: any, clearForm: boolean) => Promise<any>;
}

class FormStore implements IFormStore {
  isEdited: boolean = false;

  isSuccess: boolean = false;

  isLoading: boolean = false; // блокировка формы для обработки данных в store

  isLocked: boolean = false; // блокировка отправки формы для обработки данных вне store

  isServerError: boolean = false;

  initState: any = {}; // инициализационный стейт для сравнения со state

  state: any = {};

  errorMessage: string = '';

  errors: any = {};

  constructor() {
    makeObservable(this, {
      isEdited: observable,
      isSuccess: observable,
      isLoading: observable,
      isLocked: observable,
      isServerError: observable,
      state: observable,
      errorMessage: observable,
      errors: observable,

      setIsLocked: action,
      setState: action,
      setInitState: action,
      updateState: action,

      setFormError: action,
      removeFormError: action,
      clearErrorMessage: action,
      clearAllErrors: action,
      clear: action,

      getFormattedState: action,
      validation: action,
      submit: action,
    });
  }

  setIsLocked(status: boolean) {
    this.isLocked = status;
  }

  setInitState(response: any) {
    this.initState = response || {};
    this.state = JSON.parse(JSON.stringify(this.initState));
    this.isEdited = false;
  }

  setState(response: any) {
    this.state = response || {};
  }

  updateState(propertyName: string, value?: any) {
    this.state = FormData.getUpdatedFormData(this.state, propertyName, value);
    this.isEdited = true;
  }

  setFormError(propertyName: string, message: string) {
    if (!message) {
      this.removeFormError(propertyName);
      return;
    }
    this.errors = {
      ...this.errors,
      [propertyName]: message,
    };
  }

  removeFormError(propertyName: string) {
    if (!this.errors[propertyName]) return;
    const formattedState = { ...this.errors };
    delete formattedState[propertyName];
    this.errors = formattedState;
  }

  clearErrorMessage() {
    this.errorMessage = '';
  }

  clearAllErrors() {
    this.isServerError = false;
    this.errorMessage = '';
    this.errors = {};
  }

  clear() {
    this.clearAllErrors();
    this.state = {};
    this.initState = {};
  }

  getFormattedState() {
    return { ...this.state };
  }

  validation(data: any) {
    if (this.errors.length) {
      return Promise.reject();
    }
    if (!data) {
      return Promise.reject();
    }
    this.clearErrorMessage();
    return Promise.resolve();
  }

  submit(loader: Function, data: any, clearForm: boolean = false): Promise<any> {
    this.clearAllErrors();
    if (this.isLocked) {
      return Promise.resolve();
    }
    return this.validation(data)
      .then(action(() => {
        this.isLoading = true;
      }))
      .then(() => loader(data))
      .then(action((response: any) => {
        this.isSuccess = true;
        if (clearForm) {
          this.clear();
        }
        return Promise.resolve(response);
      }))
      .catch(action((response) => {
        if (response?.code > 204) {
          this.isServerError = true;
          return Promise.reject(response);
        }
        return Promise.reject(response);
      }))
      .finally(action(() => {
        this.isLoading = false;
      }));
  }
}

export default FormStore;
