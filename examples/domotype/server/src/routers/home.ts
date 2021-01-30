import { createInitialState } from 'domotype-store';
import { Router, Request, Response } from 'express';
import { HomeDocument, HomeModel, StateModel } from '../models';

const router = Router();

router.get('/', async (request: Request, response: Response) => {
  const homes = await HomeModel.find({});
  return response
    .status(200)
    .send(homes.map((home: HomeDocument) => home.serialize()));
});

router.post('/', async (request: Request, response: Response) => {
  const state = new StateModel();
  state.value = createInitialState();
  await state.save();

  const home = new HomeModel({
    stateId: state._id,
    name: request.body.name,
  });
  await home.save();

  state.homeId = home._id;
  await state.save();

  return response.status(201).send(home.serialize());
});

router.get('/:id', async (request: Request, response: Response) => {
  const home = await HomeModel.findById(request.params.id);
  if (!home) {
    return response.status(404).send({ error: 'Home not found' });
  }
  return response.status(200).send(home.serialize());
});

export { router };
