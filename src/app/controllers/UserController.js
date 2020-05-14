import User from '../models/User';

class UserController {
  async store(req, res) {

    if ((req.body.name) && (req.body.email) && (req.body.password)) {
      const email_exist = await User.findOne({ where: { email: req.body.email } });

      if (email_exist) {
        return res.status(400).json({
          ERROR: "e-mail already exists"
        });
      }

      const { id, name, email, provider, password_hash } = await User.create(req.body);

      return res.json({
        id: id,
        name: name,
        email: email,
        provider: provider,
        password_hash: password_hash
      });
    } else {
      return res.status(400).json({
        ERROR: "Campos incorretos"
      });
    }
  }

  async update(req, res) {

    const { Password } = req.body;
    const email_antigo = req.body.email;
    const old_name = req.body.name;
    const new_password = req.body.NewPassword;
    const Oldprovider = req.body.provider;

    const user = await User.findByPk(req.body.idUser);

    if (user) {

      if (email_antigo && (user.email != email_antigo)) {

        const email_exist = await User.findOne({ where: { email: email_antigo } });

        if (email_exist) {
          return res.status(400).json({
            ERROR: "e-mail already exists"
          });
        }
      }

      if (new_password && (!(await user.checkHash(Password)))) {
        return res.status(401).json({ERROR: "Password does not match"});
      }

      const {name, email, provider, password_hash} = await user.update({
        name: old_name,
        password: new_password,
        provider: Oldprovider,
        email: email_antigo
      });


      return res.json({
        name,
        provider,
        email,
        password_hash
      });

    } else {
      return res.status(401).json({ ERROR: "User does not exists" });
    }

  }

  async delete(req, res) {
    const id_recebido = req.params.id;
    const user = await User.findOne({
      where: {
        id: id_recebido
      }
    });

    if (user) {

      //await user.delete();
      return res.status(400).json({
        MESSAGE: "User was deleted"
      })

    } else {
      return res.status(400).json({
        ERROR: "User not exists"
      })
    }
  }

  async show(req, res) {
    const id_recebido = req.params.id;
    const user = await User.findOne({
      where: {
        id: id_recebido
      }
    });

    if (user) {
      return res.json({
        id: user.id,
        email: user.email,
        name: user.name,
        provider: user.provider
      });
    } else {
      return res.status(400).json({
        ERROR: "User not found"
      })
    }
  }

}


export default new UserController();