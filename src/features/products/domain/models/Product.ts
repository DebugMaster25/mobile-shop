import { Id, Money } from '@shared/domain/types';

/**
 * Product color option
 */
export interface ProductColor {
  code: number;
  name: string;
}

/**
 * Product storage option
 */
export interface ProductStorage {
  code: number;
  name: string;
}

/**
 * Product specifications
 */
export interface ProductSpecs {
  cpu: string;
  ram: string;
  os: string;
  displayResolution: string;
  battery: string;
  primaryCamera: string;
  secondaryCmera: string; // Note: API has typo "secondaryCmera"
  dimentions: string; // Note: API has typo "dimentions"
  weight: string;
}

/**
 * Product entity - Core business object
 */
export class Product {
  constructor(
    public readonly id: Id,
    public readonly brand: string,
    public readonly model: string,
    public readonly price: Money,
    public readonly imgUrl: string,
    public readonly networkTechnology: string,
    public readonly networkSpeed: string,
    public readonly gprs: string,
    public readonly edge: string,
    public readonly announced: string,
    public readonly status: string,
    public readonly dimentions: string, // Note: API has typo
    public readonly weight: string,
    public readonly sim: string,
    public readonly displayType: string,
    public readonly displayResolution: string,
    public readonly displaySize: string,
    public readonly os: string,
    public readonly cpu: string,
    public readonly chipset: string,
    public readonly gpu: string,
    public readonly externalMemory: string,
    public readonly internalMemory: string[],
    public readonly ram: string,
    public readonly primaryCamera: string,
    public readonly secondaryCmera: string, // Note: API has typo
    public readonly speaker: string,
    public readonly audioJack: string,
    public readonly wlan: string[],
    public readonly bluetooth: string,
    public readonly gps: string,
    public readonly nfc: string,
    public readonly radio: string,
    public readonly usb: string,
    public readonly sensors: string,
    public readonly battery: string,
    public readonly colors: ProductColor[],
    public readonly options: {
      colors: ProductColor[];
      storages: ProductStorage[];
    }
  ) {}

  /**
   * Get formatted price for display
   */
  get formattedPrice(): string {
    if (!this.price) return 'Price: Not Known';
    return `Price: €${(this.price / 100).toFixed(2)}`;
  }

  /**
   * Get product specifications
   */
  get specifications(): ProductSpecs {
    return {
      cpu: this.cpu,
      ram: this.ram,
      os: this.os,
      displayResolution: this.displayResolution,
      battery: this.battery,
      primaryCamera: this.primaryCamera,
      secondaryCmera: this.secondaryCmera,
      dimentions: this.dimentions,
      weight: this.weight,
    };
  }

  /**
   * Check if product matches search query
   */
  matchesSearch(query: string): boolean {
    if (!query.trim()) return true;
    
    const searchTerm = query.toLowerCase();
    const brand = this.brand.toLowerCase();
    const model = this.model.toLowerCase();
    
    return brand.includes(searchTerm) || model.includes(searchTerm);
  }

  /**
   * Get default color
   */
  getDefaultColor(): ProductColor | undefined {
    return this.options.colors[0];
  }

  /**
   * Get default storage
   */
  getDefaultStorage(): ProductStorage | undefined {
    return this.options.storages[0];
  }

  /**
   * Find color by code
   */
  findColorByCode(code: number): ProductColor | undefined {
    return this.options.colors.find((color) => color.code === code);
  }

  /**
   * Find storage by code
   */
  findStorageByCode(code: number): ProductStorage | undefined {
    return this.options.storages.find((storage) => storage.code === code);
  }
}