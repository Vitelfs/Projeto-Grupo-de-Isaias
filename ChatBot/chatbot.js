const express = require("express");
const wppconnect = require("@wppconnect-team/wppconnect");

const app = express();
app.use(express.json()); // Middleware para interpretar JSON no corpo da requisição

// Inicia a instância do WPPConnect
wppconnect
  .create()
  .then((client) => {
    console.log("WPPConnect está pronto!");

    // Endpoint para enviar mensagens
    app.post("/enviar-mensagem", async (req, res) => {
      const { numero, mensagem } = req.body;

      // Validação dos parâmetros da requisição
      if (!numero || !mensagem) {
        return res.status(400).json({
          success: false,
          error: "Número e mensagem são obrigatórios.",
        });
      }

      // Formatação do número no padrão internacional
      const numeroFormatado = numero.includes("@c.us")
        ? numero
        : `${numero}@c.us`;

      try {
        // Envia a mensagem utilizando o cliente do WPPConnect
        const resposta = await client.sendText(numeroFormatado, mensagem);
        console.log("Mensagem enviada:", resposta);
        res.status(200).json({ success: true, data: resposta });
      } catch (erro) {
        console.error("Erro ao enviar mensagem:", erro);
        res.status(500).json({
          success: false,
          error: "Falha ao enviar a mensagem. Verifique os detalhes no log.",
        });
      }
    });
  })
  .catch((erro) => {
    console.error("Erro ao iniciar o WPPConnect:", erro);
  });

// Inicia o servidor
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
