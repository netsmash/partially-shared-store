import { Router, Request, Response } from 'express';
import { UserModel } from '../models';

const router = Router();

router.put('/', async (request: Request, response: Response, next) => {
  const { displayName } = request.body;
  const imageUrl = request.body?.imageUrl || undefined;

  if (displayName.length < 3) {
    return response.status(422).send({ error: 'Display name is too short' });
  }

  request.user.displayName = displayName;
  if (imageUrl) {
    request.user.imageUrl = imageUrl;
  }
  request.user.save();
  return response.status(201).send(request.user);
});

router.get('/me', async (request: Request, response: Response, next) => {
  if (request.user) {
    return response.redirect(`/users/${request.user._id.toString()}`);
  }
  next();
});

router.get('/:id', async (request: Request, response: Response, next) => {
  const user = await UserModel.findById(request.params.id);
  if (!user) {
    return response.status(404).send({ error: 'User not found' });
  } else if (request.user && user._id.equals(request.user._id)) {
    return response.status(200).send(user.serialize());
  }
  return response.status(200).send(user.serialize());
});

export { router };
