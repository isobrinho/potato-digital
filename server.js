const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors'); // Importe o módulo 'cors'
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors()); // Use o middleware do CORS

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'seu@gmail.com',
    pass: 'suasenha123',
  },
});

// Adicione este bloco na rota responsável por enviar e-mails
app.post('/enviar-email', async (req, res) => {
  console.log('Recebendo solicitação para enviar e-mail.');

  const { destinatario, assunto, corpo, anexo } = req.body;

  try {
    const info = await transporter.sendMail({
      from: 'seuemail@gmail.com',
      to: 'seuemail@gmail.com',
      subject: 'olha o aquivo json',
      text: 'teliga no json',
      attachments: [
        {
          filename: 'formulario.json',
          content: JSON.stringify(anexo, null, 2),
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
