import Router from 'express';
import User from './app/models/User'

const routes = new Router();


routes.get('/', async (req, res) =>{
  const user = await User.create({
    name: 'Ian Luccas',
    email: 'ian@gmail.com',
    password_hash: '148716498',
    provider: true
  })

  return res.json(user);
})

export default routes;