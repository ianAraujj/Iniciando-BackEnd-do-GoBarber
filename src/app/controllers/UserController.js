import User from '../models/User';

class UserController {
  async store(req, res){

    if((req.body.name) && (req.body.email) && (req.body.password)){
      const email_exist = await User.findOne({where:{ email: req.body.email}});

      if(email_exist){
        return res.status(400).json({
          ERROR: "e-mail already exists"
        });
      }
  
      const {id, name, email, provider, password_hash} = await User.create(req.body);
  
      return res.json({
        id: id,
        name: name,
        email: email,
        provider: provider,
        password_hash: password_hash
      });
    }else{
      return res.status(400).json({
        ERROR: "Campos incorretos"
      });
    } 
  }

  async delete(req, res){
    const id_recebido = req.params.id;
    const user = await User.findOne({where:{
      id: id_recebido
    }});

    if(user){

      //await User.delete(user);
      return res.status(400).json({
        MESSAGE: "User was deleted"
      })

    }else{
      return res.status(400).json({
        ERROR: "User not exists"
      })
    }
  }

  async show(req, res){
    const id_recebido = req.params.id;
    const user = await User.findOne({where:{
      id: id_recebido
    }});

    if(user){
      return res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        provider: user.provider
      });
    }else{
      return res.status(400).json({
        ERROR: "User not found"
      })
    }
  }

}


export default new UserController();