import File from '../models/File';

class FileController{
  async store(req, res){

    const {originalname: name, filename: path} = req.file;

    const new_file = await File.create({name, path});

    return res.json(new_file);
  }
}

export default new FileController();