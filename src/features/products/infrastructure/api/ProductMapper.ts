import { Product, ProductColor, ProductStorage } from '../../domain/models';
import { ProductDTO, ProductColorDTO, ProductStorageDTO } from './dtos';

/**
 * Mapper to convert API DTOs to Domain models
 */
export class ProductMapper {
  /**
   * Convert ProductDTO to Product domain model
   */
  static toDomain(dto: ProductDTO): Product {
    return new Product(
      dto.id,
      dto.brand,
      dto.model,
      this.parsePrice(dto.price),
      dto.imgUrl,
      dto.networkTechnology,
      dto.networkSpeed,
      dto.gprs,
      dto.edge,
      dto.announced,
      dto.status,
      dto.dimentions,
      dto.weight,
      dto.sim,
      dto.displayType,
      dto.displayResolution,
      dto.displaySize,
      dto.os,
      dto.cpu,
      dto.chipset,
      dto.gpu,
      dto.externalMemory,
      Array.isArray(dto.internalMemory) ? dto.internalMemory : [],
      dto.ram,
      dto.primaryCamera,
      dto.secondaryCmera,
      dto.speaker,
      dto.audioJack,
      Array.isArray(dto.wlan) ? dto.wlan : [],
      dto.bluetooth,
      dto.gps,
      dto.nfc,
      dto.radio,
      dto.usb,
      dto.sensors,
      dto.battery,
      this.mapColors(dto.colors ?? []),
      {
        colors: this.mapColors(dto.options?.colors ?? []),
        storages: this.mapStorages(dto.options?.storages ?? []),
      }
    );
  }

  /**
   * Convert array of ProductDTOs to array of Products
   */
  static toDomainList(dtos: ProductDTO[] | undefined | null): Product[] {
    if (!dtos || !Array.isArray(dtos)) {
      return [];
    }
    return dtos.map((dto) => this.toDomain(dto));
  }

  /**
   * Parse price string to cents (Money type)
   * e.g., "€1,199.00" -> 119900 cents
   */
  private static parsePrice(priceString: string): number {
    // Remove currency symbol and whitespace
    const cleaned = priceString.replace(/[€$,\s]/g, '');
    
    // Parse as float and convert to cents
    const price = parseFloat(cleaned);
    
    if (isNaN(price)) {
      return 0;
    }
    
    return Math.round(price * 100);
  }

  /**
   * Map color DTOs to domain colors
   */
  private static mapColors(colorDTOs: ProductColorDTO[] | undefined | null): ProductColor[] {
    if (!colorDTOs || !Array.isArray(colorDTOs)) {
      return [];
    }
    return colorDTOs.map((dto) => ({
      code: dto.code,
      name: dto.name,
    }));
  }

  /**
   * Map storage DTOs to domain storages
   */
  private static mapStorages(storageDTOs: ProductStorageDTO[] | undefined | null): ProductStorage[] {
    if (!storageDTOs || !Array.isArray(storageDTOs)) {
      return [];
    }
    return storageDTOs.map((dto) => ({
      code: dto.code,
      name: dto.name,
    }));
  }
}