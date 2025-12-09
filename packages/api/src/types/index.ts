/**
 * Все возможные компоненты товаров,
 * которые могут лежать в Dynamic Zone "attributes".
 *
 * Обновляется при добавлении новых product-типов.
 */
export const PRODUCT_COMPONENTS = {
  LAWN_SINGLE: 'products.lawn-single',
  TECHNIQUE: 'products.technique',
  COMPOSITION_ITEM: 'products.composition-item',
} as const;

/**
 * Union Type всех типов продуктов.
 * Например: "products.lawn-single" | "products.composition-item"
 */
export type PRODUCT_COMPONENTS = (typeof PRODUCT_COMPONENTS)[keyof typeof PRODUCT_COMPONENTS];

/**
 * Удобный enum-like тип для UI/логики:
 */
export enum ProductType {
  Lawn = 'lawn',
  Tractor = 'tractor',
  Technique = 'technique',
}

/**
 * Union всех product.type значений (из enumeration в Product)
 */
export type ProductTypeValue = `${ProductType}`;
