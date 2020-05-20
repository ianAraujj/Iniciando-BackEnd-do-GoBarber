import Agendamento from '../models/Agendamento';
import User from '../models/User';

class AgendamentoController{

  async store(req, res){

    const {date, id_user, id_provider} = req.body;

    if((!date) || (!id_user) || (!id_provider)){
      return res.status(400).json({
        ERROR: "Bad Request"
      });
    }

    const date_agendamento = new Date(date);
    const hoje = new Date();

    if(date_agendamento.getTime() <= hoje.getTime()){
      return res.status(400).json({
        ERRO: "Invalid date"
      });
    }

    const user = await User.findByPk(id_user);
    const provider = await User.findByPk(id_provider);

    if((!user) || (!provider)){
      return res.status(400).json({
        ERROR: "User don't found"
      });
    }

    if(!provider.provider){
      return res.status(401).json({
        ERROR: "Provedor não encontrado"
      });
    }

    const agend = await Agendamento.findOne({where:{
      date, 
      id_user,
      id_provider
    }});

    if(agend){
      return res.status(400).json({
        ERROR: "Agendamento já cadastrado"
      });
    }

    const new_agendamento = await Agendamento.create({date, id_user, id_provider});

    return res.json(new_agendamento);
  }

}

export default new AgendamentoController();