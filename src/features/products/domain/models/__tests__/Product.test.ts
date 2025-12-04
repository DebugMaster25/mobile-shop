import { Product } from '../Product';

describe('Product', () => {
  const mockProduct = new Product(
    '1',
    'Apple',
    'iPhone 13',
    79900, // €799.00 in cents
    'https://example.com/image.jpg',
    '5G',
    '5G',
    'Yes',
    'Yes',
    '2021',
    'Available',
    '146.7 x 71.5 x 7.7 mm',
    '174 g',
    'Nano-SIM',
    'OLED',
    '1170 x 2532',
    '6.1 inches',
    'iOS 15',
    'Hexa-core',
    'A15 Bionic',
    'Apple GPU',
    'No',
    ['128GB', '256GB'],
    '4GB',
    '12 MP',
    '12 MP',
    'Yes',
    'No',
    ['Wi-Fi 802.11'],
    '5.0',
    'Yes',
    'Yes',
    'No',
    'Lightning',
    'Face ID',
    '3095 mAh',
    [
      { code: 1, name: 'Black' },
      { code: 2, name: 'White' },
    ],
    {
      colors: [
        { code: 1, name: 'Black' },
        { code: 2, name: 'White' },
      ],
      storages: [
        { code: 1, name: '128GB' },
        { code: 2, name: '256GB' },
      ],
    }
  );

  describe('formattedPrice', () => {
    it('should format price in euros', () => {
      expect(mockProduct.formattedPrice).toBe('Price: €799.00');
    });

    it('should handle zero price', () => {
      const freeProduct = new Product(
        '1', 'Brand', 'Model', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', 
        '', '', '', '', '', [''], '', '', '', '', '', [''], '', '', '', '', '', '', '', 
        [], { colors: [], storages: [] }
      );
      expect(freeProduct.formattedPrice).toBe('Price: Not Known');
    });
  });

  describe('specifications', () => {
    it('should return product specifications', () => {
      const specs = mockProduct.specifications;
      
      expect(specs.cpu).toBe('Hexa-core');
      expect(specs.ram).toBe('4GB');
      expect(specs.os).toBe('iOS 15');
      expect(specs.displayResolution).toBe('1170 x 2532');
      expect(specs.battery).toBe('3095 mAh');
      expect(specs.primaryCamera).toBe('12 MP');
      expect(specs.secondaryCmera).toBe('12 MP');
      expect(specs.dimentions).toBe('146.7 x 71.5 x 7.7 mm');
      expect(specs.weight).toBe('174 g');
    });
  });

  describe('matchesSearch', () => {
    it('should match product by brand (case insensitive)', () => {
      expect(mockProduct.matchesSearch('apple')).toBe(true);
      expect(mockProduct.matchesSearch('APPLE')).toBe(true);
      expect(mockProduct.matchesSearch('Apple')).toBe(true);
    });

    it('should match product by model (case insensitive)', () => {
      expect(mockProduct.matchesSearch('iphone')).toBe(true);
      expect(mockProduct.matchesSearch('iPhone 13')).toBe(true);
      expect(mockProduct.matchesSearch('13')).toBe(true);
    });

    it('should not match unrelated search terms', () => {
      expect(mockProduct.matchesSearch('Samsung')).toBe(false);
      expect(mockProduct.matchesSearch('Galaxy')).toBe(false);
    });

    it('should return true for empty search query', () => {
      expect(mockProduct.matchesSearch('')).toBe(true);
      expect(mockProduct.matchesSearch('   ')).toBe(true);
    });
  });

  describe('getDefaultColor', () => {
    it('should return first color as default', () => {
      const defaultColor = mockProduct.getDefaultColor();
      expect(defaultColor).toEqual({ code: 1, name: 'Black' });
    });

    it('should return undefined if no colors available', () => {
      const productNoColors = new Product(
        '1', 'Brand', 'Model', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', 
        '', '', '', '', '', [''], '', '', '', '', '', [''], '', '', '', '', '', '', '', 
        [], { colors: [], storages: [] }
      );
      expect(productNoColors.getDefaultColor()).toBeUndefined();
    });
  });

  describe('getDefaultStorage', () => {
    it('should return first storage as default', () => {
      const defaultStorage = mockProduct.getDefaultStorage();
      expect(defaultStorage).toEqual({ code: 1, name: '128GB' });
    });

    it('should return undefined if no storages available', () => {
      const productNoStorages = new Product(
        '1', 'Brand', 'Model', 0, '', '', '', '', '', '', '', '', '', '', '', '', '', 
        '', '', '', '', '', [''], '', '', '', '', '', [''], '', '', '', '', '', '', '', 
        [], { colors: [], storages: [] }
      );
      expect(productNoStorages.getDefaultStorage()).toBeUndefined();
    });
  });

  describe('findColorByCode', () => {
    it('should find color by code', () => {
      const color = mockProduct.findColorByCode(1);
      expect(color).toEqual({ code: 1, name: 'Black' });
    });

    it('should return undefined for non-existent code', () => {
      const color = mockProduct.findColorByCode(999);
      expect(color).toBeUndefined();
    });
  });

  describe('findStorageByCode', () => {
    it('should find storage by code', () => {
      const storage = mockProduct.findStorageByCode(2);
      expect(storage).toEqual({ code: 2, name: '256GB' });
    });

    it('should return undefined for non-existent code', () => {
      const storage = mockProduct.findStorageByCode(999);
      expect(storage).toBeUndefined();
    });
  });
});