const converteIds = require("../utils/conversorDeStringHelper.js");

class Controller {
  constructor(entidadeService) {
    this.entidadeService = entidadeService;
  }

  async pegaCursos(req, res) {
    try {
      const listaDeRegistro = await this.entidadeService.pegaTodosOsRegistros();
      return res.status(200).json(listaDeRegistro);
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }

  async pegaUmPorId(req, res) {
    const { id } = req.params;
    try {
      const umRegistro = await this.entidadeService.pegaUmRegistroPorId(
        Number(id)
      );
      return res.status(200).json(umRegistro);
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }

  async pegaUm(req, res) {
    const { ...params } = req.params;
    const where = converteIds(params);
    try {
      const umRegistro = await this.entidadeService.pegaUmRegistro(where);
      return res.status(200).json(umRegistro);
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }

  async criaNovo(req, res) {
    const dadosParaCriacao = req.body;
    try {
      console.log(this.entidadeService);
      const novoRegistroCriado = await this.entidadeService.criaRegistro(
        dadosParaCriacao
      );
      return res.status(200).json(novoRegistroCriado);
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }

  async atualiza(req, res) {
    const { ...params } = req.params;
    const dadosAtualizados = req.body;
    const where = converteIds(params);

    try {
      const foiAtualizado = await this.entidadeService.atualizaRegistro(
        dadosAtualizados,
        where
      );

      if (!foiAtualizado)
        return res
          .status(400)
          .json({ mensagem: "registro não foi atualizado" });

      return res.status(200).json({ mensagem: "Atualizado com sucesso" });
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }

  async exclui(req, res) {
    const { ...params } = req.params;
    const where = converteIds(params);
    try {
      await this.entidadeService.excluiRegistro(where);
      return res.status(200).json({ mensagem: `${where} deletado` });
    } catch (erro) {
      return res.status(500).json({ error: erro.message });
    }
  }
}

module.exports = Controller;
