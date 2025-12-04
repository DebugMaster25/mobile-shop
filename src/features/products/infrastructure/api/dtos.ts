/**
 * API Data Transfer Objects
 * These match the exact structure returned by the API
 */

/**
 * Product color DTO from API
 */
export interface ProductColorDTO {
    code: number;
    name: string;
  }
  
  /**
   * Product storage DTO from API
   */
  export interface ProductStorageDTO {
    code: number;
    name: string;
  }
  
  /**
   * Product options DTO from API
   */
  export interface ProductOptionsDTO {
    colors: ProductColorDTO[];
    storages: ProductStorageDTO[];
  }
  
  /**
   * Product DTO from API
   * Note: API has some typos in field names (secondaryCmera, dimentions)
   * We keep them as-is to match the API contract
   */
  export interface ProductDTO {
    id: string;
    brand: string;
    model: string;
    price: string;
    imgUrl: string;
    networkTechnology: string;
    networkSpeed: string;
    gprs: string;
    edge: string;
    announced: string;
    status: string;
    dimentions: string; // Note: API typo
    weight: string;
    sim: string;
    displayType: string;
    displayResolution: string;
    displaySize: string;
    os: string;
    cpu: string;
    chipset: string;
    gpu: string;
    externalMemory: string;
    internalMemory: string[];
    ram: string;
    primaryCamera: string;
    secondaryCmera: string; // Note: API typo
    speaker: string;
    audioJack: string;
    wlan: string[];
    bluetooth: string;
    gps: string;
    nfc: string;
    radio: string;
    usb: string;
    sensors: string;
    battery: string;
    colors: ProductColorDTO[];
    options: ProductOptionsDTO;
  }
  
  /**
   * Product list response from API
   */
  export type ProductListDTO = ProductDTO[];
  
  /**
   * Cart item request DTO
   */
  export interface AddToCartRequestDTO {
    id: string;
    colorCode: number;
    storageCode: number;
  }
  
  /**
   * Add to cart response DTO
   */
  export interface AddToCartResponseDTO {
    count: number;
  }