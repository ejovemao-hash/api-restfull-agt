'use strict';

const { Router } = require('express');
const { agtCallLimiter } = require('../middlewares/rateLimiter');
const controller = require('../controllers/nif.controller');

const router = Router();

/**
 * @openapi
 * /nif:
 *   get:
 *     tags: [NIF]
 *     summary: Consulta o NIF de um contribuinte junto da AGT/SIFT
 *     description: >
 *       Efetua uma consulta GET ao endpoint SIFT da AGT para obter o NIF
 *       (Número de Identificação Fiscal) de um contribuinte usando seu
 *       número de documento de identificação.
 *       
 *       A autenticação é feita através do cabeçalho x-api-key, e as credenciais
 *       da AGT são enviadas como HTTP Basic Auth internamente.
 *     security: [{ ApiKeyAuth: [] }]
 *     parameters:
 *       - name: numeroDocumento
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Número do documento de identificação (ex: 5417663700)
 *       - name: tipoDocumento
 *         in: query
 *         required: false
 *         schema:
 *           type: string
 *           default: BI
 *         description: Tipo de documento (BI, PP, etc.)
 *     responses:
 *       200:
 *         description: Consulta processada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 nif:
 *                   type: string
 *                   description: Número de NIF do contribuinte
 *                 contribuinte:
 *                   type: object
 *                   description: Dados adicionais do contribuinte
 *                 error:
 *                   type: string
 *       400:
 *         description: Parâmetros inválidos ou documento não encontrado
 *       401:
 *         description: API key ausente ou inválida
 *       429:
 *         description: Demasiados pedidos num curto período
 *       502:
 *         description: A AGT rejeitou o pedido ou não respondeu
 */
router.get('/', agtCallLimiter, controller.consultarNif);

module.exports = router;
