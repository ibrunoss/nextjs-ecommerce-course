export const BASE_PATH = "";
export const HOME_PATH = `${BASE_PATH}/`;
export const CART_VIEW_PATH = `${BASE_PATH}/carrinho/visualizar`;
export const PRODUCT_DETAIL_PATH = (slug: string) =>
  `${BASE_PATH}/produto/${slug}/detalhes`;
export const SIGN_UP_PATH = `${BASE_PATH}/acesso/cadastrar`;
export const SIGN_IN_PATH = `${BASE_PATH}/acesso/entrar`;

export const route = {
  home: HOME_PATH,
  cartView: CART_VIEW_PATH,
  productDetail: PRODUCT_DETAIL_PATH,
  signUp: SIGN_UP_PATH,
  signIn: SIGN_IN_PATH,
} as const;

export type RouteKey = keyof typeof route;
export type RoutePath = (typeof route)[RouteKey];
