import jwt from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../../config/authConfig';

class SessionsController{
  async store(req, res){

    const {email, password} = req.body;

    const user = await User.findOne({where: {email}});

    if(!user){
      // Erro 401 quer dizer erro de permissão
      return res.status(401).json({ERROR: "User not found"});
    }

    if(!(await user.checkHash(password))){
      return res.status(401).json({ERROR: "Password does not match"});
    }

    
    const {id, name } = user;

    return res.status(200).json({
      user: {
        id,
        name,
        email
      },
      token: jwt.sign( {id} , authConfig.string_gobarber, {
        expiresIn: authConfig.expiresIn 
      })
    });

    // -  O primeiro parâmetro do método sign é o payload
    // - O segundo parâmetro é uma string único só para sua aplicação. O site do 
    // md5online pode ser usado.
    // - O terceiro parâmetro é para as configurações do token, dizer por ex 
    // quanto tempo esse token é válido

  }
}

export default new SessionsController();