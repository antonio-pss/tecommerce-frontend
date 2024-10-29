import {ModelBase} from './model-base';

export interface Client extends ModelBase {
  name: string;
  age: number;
  rg: string;
  cpf: string;
}
