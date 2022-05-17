import {AddEntity} from "../types";
import {ValidationError} from "../utils/errors";

interface NewAddEntity extends Omit<AddEntity, 'id'> {
    id?: string;
}

export class AdRecord implements AddEntity {
    id: string;
    name: string;
    description: string;
    price: number;
    url: string;
    lat: number;
    lon: number;

    constructor(obj: NewAddEntity) {
        if (!obj.name|| obj.name.length > 100) {
            throw new ValidationError('Name of the ad cannot be empty and must have less than 100 characters.')
        }
        if (obj.description.length > 1000) {
            throw new ValidationError('Description of the ad cannot exceed 1000 characters.')
        }

        if (obj.price < 0 || obj.price > 999999) {
            throw new ValidationError('The amount of the price must be more than 0 and less than 999 999.')
        }

        // @TODO: Check if url is valid!
        if (!obj.url || obj.url.length > 100) {
            throw new ValidationError('Url of the ad cannot be empty and cannot exceed 100 characters.')
        }
        if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
            throw new ValidationError('Cannot locate the ad.')
        }

        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.id = obj.id;
        this.lat = obj.lat;
        this.lon = obj.lon;


    }

}
