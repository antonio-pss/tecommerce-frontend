import {ModelBase} from './model-base';

export interface Sale extends ModelBase {
  nrf: String;
  id_client: number;
  id_product: number;
  id_employee: number;
}
