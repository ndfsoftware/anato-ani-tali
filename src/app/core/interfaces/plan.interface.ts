export const PLANT_TYPE = {
  BASICO: 'basico',
  PLUS: 'plus',
};

export type PlanType = (typeof PLANT_TYPE)[keyof typeof PLANT_TYPE];

export interface Plan {
  id: number;
  title: string;
  description: string;
  includes: string[];
  price: number;
  type: PlanType;
}
