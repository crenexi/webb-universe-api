import { Connection } from 'typeorm';
import { Injectable, ProviderScope } from '@graphql-modules/di';
import { ShipModel } from '@root/entities';
import { CreateShipModelInput } from '../types/inputs';
import { ShipModelResult } from '../types/results';

import { getModels } from './ship-model/get-models';
import { getModel } from './ship-model/get-model';
import { createModel } from './ship-model/create-model';
import { updateModel } from './ship-model/update-model';
import { deleteModel } from './ship-model/delete-model';

@Injectable({ scope: ProviderScope.Session })
export class ShipModelProvider {
  constructor(private conn: Connection) {
    this.conn = conn;
  }

  getModels = () => await getModels(this.conn);
  getModel = (id: string) => await getModel(id).bind(this);
  createModel = (input: CreateShipModelInput) => createModel(this.conn, input);
  };

  // Ship model: UPDATE
  updateModel = () => {
    return updateModel();
  };

  // Ship model: DELETE
  deleteModel = () => deleteModel();



  /*
  async getIdentities(): Promise<ShipIdentity[]> {
    return this.shipIdentityRepo.find();
  }

  async getIdentity(id: string): Promise<typeof ShipIdentityResult> {
    const identity = await this.shipIdentityRepo.findOne(id);

    return identity || ({
      notFoundNotice: messages.undefinedIdentity,
    });
  }

  async getManufacturers(): Promise<Manufacturer[]> {
    return this.manufacturerRepo.find();
  }

  async getManufacturer(id: string): Promise<typeof ManufacturerResult> {
    const manufacturer = await this.manufacturerRepo.findOne(id);

    return manufacturer || ({
      notFoundNotice: messages.undefinedManufacturer,
    });
  }

  async createManufacturer(
    input: CreateManufacturerInput,
  ): Promise<Manufacturer> {
    try {
      return this.manufacturerRepo.create(input).save();
    } catch (err) {
      const message = `Failed to create manufacturer '${input.name}'`;
      throw Error(message);
    }
  }
  */
}
