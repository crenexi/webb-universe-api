import { Connection } from 'typeorm';
import { dbTryCatch } from '@root/helpers';
import { ShipModel, ShipSpecs } from '@root/entities';

type DeleteShipModel = (
  conn: Connection,
  payload: { id: string },
) => Promise<string>;

export const deleteShipModel: DeleteShipModel = async (conn, { id }) => {
  const shipModelRepo = conn.getRepository(ShipModel);
  const shipSpecsRepo = conn.getRepository(ShipSpecs);

  return dbTryCatch<string>(async () => {
    const { specsId } = await shipModelRepo.findOneOrFail(id);

    // Delete ship model, then specs
    await shipModelRepo.delete(id);
    await shipSpecsRepo.delete(specsId);
    return id;
  });
};
