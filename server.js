const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '==',
    pass: '===',
  },
});

app.post('/enviar-email', async (req, res) => {
  console.log('Recebendo solicitação para enviar e-mail.');

  const { nome, email, telefone, Empresa, Cargo, mensagem } = req.body;

  // Criar um objeto somente com os dados dos campos
  const dadosDoFormulario = { nome, email, telefone, Empresa, Cargo, mensagem };

  try {
    const info = await transporter.sendMail({
      from: '==',
      to: '==',
      subject: 'olha o arquivo json',
      text: JSON.stringify(dadosDoFormulario, null, 2),
      attachments: [
        {
          filename: 'formulario.json',
          content: JSON.stringify(dadosDoFormulario, null, 2),
        },
      ],
    });

    console.log('E-mail enviado:', info);
    res.json({ success: true, message: 'E-mail enviado com sucesso.' });
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error);
    res.status(500).json({ success: false, message: 'Erro ao enviar e-mail.' });
  }
});

app.listen(port, () => {
  console.log(`Servidor iniciado na porta ${port}`);
});
