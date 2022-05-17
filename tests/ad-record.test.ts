import {AdRecord} from "../records/ad.record";

const defaultObj = {
    name: 'Test Name',
    description: 'bla',
    url: 'https://github.com/OlaVieira',
    price: 0,
    lat: 9,
    lon: 8,
}

test('Can build AdRecord', () => {
    const ad = new AdRecord(defaultObj);

    expect(ad.name).toBe('Test Name');
    expect(ad.description).toBe('bla');
    expect(ad.url).toBe('https://github.com/OlaVieira');
    expect(ad.price).toBe(0);
});

test('Validates invalid price', () => {

    expect( () => new AdRecord({
        ...defaultObj,
        price: -3,
    })).toThrow('The amount of the price must be more than 0 and less than 999 999')
    }
);

// @TODO: Check all the validations

