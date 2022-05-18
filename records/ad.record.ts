import {AdEntity, NewAdEntity} from "../types";
import {ValidationError} from "../utils/errors";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type AdRecordResults = [AdEntity[], FieldPacket[]];

export class AdRecord implements AdEntity {
    id: string;
    name: string;
    description: string;
    price: number;
    url: string;
    lat: number;
    lon: number;

    constructor(obj: NewAdEntity) {
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

        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.price = obj.price;
        this.url = obj.url;
        this.id = obj.id;
        this.lat = obj.lat;
        this.lon = obj.lon;


    }

    static async getOne(id: string): Promise<AdRecord> | null {
        const [results] = await pool.execute("SELECT * FROM `ads` WHERE id = :id", {
            id,
        }) as AdRecordResults;
        return results.length === 0 ? null : new AdRecord(results[0])
    }
}
