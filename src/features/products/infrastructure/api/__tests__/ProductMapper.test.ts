import { ProductMapper } from '../ProductMapper';
import { ProductDTO } from '../dtos';

describe('ProductMapper', () => {
  const mockProductDTO: ProductDTO = {
    id: '1',
    brand: 'Apple',
    model: 'iPhone 13',
    price: '€799.00',
    imgUrl: 'https://example.com/image.jpg',
    networkTechnology: '5G',
    networkSpeed: '5G',
    gprs: 'Yes',
    edge: 'Yes',
    announced: '2021',
    status: 'Available',
    dimentions: '146.7 x 71.5 x 7.7 mm',
    weight: '174 g',
    sim: 'Nano-SIM',
    displayType: 'OLED',
    displayResolution: '1170 x 2532',
    displaySize: '6.1 inches',
    os: 'iOS 15',
    cpu: 'Hexa-core',
    chipset: 'A15 Bionic',
    gpu: 'Apple GPU',
    externalMemory: 'No',
    internalMemory: ['128GB', '256GB'],
    ram: '4GB',
    primaryCamera: '12 MP',
    secondaryCmera: '12 MP',
    speaker: 'Yes',
    audioJack: 'No',
    wlan: ['Wi-Fi 802.11'],
    bluetooth: '5.0',
    gps: 'Yes',
    nfc: 'Yes',
    radio: 'No',
    usb: 'Lightning',
    sensors: 'Face ID',
    battery: '3095 mAh',
    colors: [
      { code: 1, name: 'Black' },
      { code: 2, name: 'White' },
    ],
    options: {
      colors: [
        { code: 1, name: 'Black' },
        { code: 2, name: 'White' },
      ],
      storages: [
        { code: 1, name: '128GB' },
        { code: 2, name: '256GB' },
      ],
    },
  };

  describe('toDomain', () => {
    it('should convert ProductDTO to Product domain model', () => {
      const product = ProductMapper.toDomain(mockProductDTO);

      expect(product.id).toBe('1');
      expect(product.brand).toBe('Apple');
      expect(product.model).toBe('iPhone 13');
      expect(product.price).toBe(79900); // €799.00 in cents
      expect(product.imgUrl).toBe('https://example.com/image.jpg');
    });

    it('should convert price string to cents correctly', () => {
      const product = ProductMapper.toDomain(mockProductDTO);
      expect(product.price).toBe(79900); // €799.00 -> 79900 cents
    });

    it('should handle price with comma separator', () => {
      const dtoWithComma = { ...mockProductDTO, price: '€1,199.00' };
      const product = ProductMapper.toDomain(dtoWithComma);
      expect(product.price).toBe(119900); // €1,199.00 -> 119900 cents
    });

    it('should map colors correctly', () => {
      const product = ProductMapper.toDomain(mockProductDTO);
      
      expect(product.options.colors).toHaveLength(2);
      expect(product.options.colors[0]).toEqual({ code: 1, name: 'Black' });
      expect(product.options.colors[1]).toEqual({ code: 2, name: 'White' });
    });

    it('should map storages correctly', () => {
      const product = ProductMapper.toDomain(mockProductDTO);
      
      expect(product.options.storages).toHaveLength(2);
      expect(product.options.storages[0]).toEqual({ code: 1, name: '128GB' });
      expect(product.options.storages[1]).toEqual({ code: 2, name: '256GB' });
    });
  });

  describe('toDomainList', () => {
    it('should convert array of DTOs to array of Products', () => {
      const dtos = [mockProductDTO, { ...mockProductDTO, id: '2' }];
      const products = ProductMapper.toDomainList(dtos);

      expect(products).toHaveLength(2);
      expect(products[0]?.id).toBe('1');
      expect(products[1]?.id).toBe('2');
    });

    it('should handle empty array', () => {
      const products = ProductMapper.toDomainList([]);
      expect(products).toHaveLength(0);
    });
  });
});