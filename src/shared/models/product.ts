import {ModelBase} from './model-base';

export interface Product extends ModelBase{
  description: String;
  quantity: number;
}
