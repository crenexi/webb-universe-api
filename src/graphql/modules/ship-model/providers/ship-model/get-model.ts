import { Connection } from 'typeorm';
import { dbTryCatch } from '@root/helpers';
import { ShipModel, ShipSpecs } from '@root/entities';
import { ShipModelResult } from '../../types/results';
import { messages } from '../../constants';

type GetModel = (
  conn: Connection,
  payload: { id: string },
) => Promise<typeof ShipModelResult>;

export const getModel: GetModel = async (conn, id) => {
  const shipModelRepo = conn.getRepository(ShipModel);

  const model = await dbTryCatch(() => {
    return shipModelRepo
      .createQueryBuilder('shipModel')
      .where('shipModel.id = :id', { id })
      .leftJoinAndSelect(
        ShipSpecs,
        'shipSpecs',
        'shipModel.specsId = shipSpecs.id',
      ).getOne();
  });

  // Undefined model
  return model || ({
    notFoundNotice: messages.undefinedModel,
  });
};
