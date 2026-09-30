var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { Resend } from 'resend';
function apiDevPlugin() {
    return {
        name: 'api-dev-server',
        configureServer: function (server) {
            var _this = this;
            server.middlewares.use(function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
                var body_1;
                var _this = this;
                return __generator(this, function (_a) {
                    if (req.url === '/api/send-email' && req.method === 'POST') {
                        body_1 = '';
                        req.on('data', function (chunk) {
                            body_1 += chunk;
                        });
                        req.on('end', function () { return __awaiter(_this, void 0, void 0, function () {
                            var data, business, contact, goal, challenge, resend, emailMatch, replyTo, html, result, err_1;
                            var _a;
                            return __generator(this, function (_b) {
                                switch (_b.label) {
                                    case 0:
                                        _b.trys.push([0, 2, , 3]);
                                        data = JSON.parse(body_1 || '{}');
                                        business = data.business, contact = data.contact, goal = data.goal, challenge = data.challenge;
                                        if (!business || !contact) {
                                            res.statusCode = 400;
                                            res.setHeader('Content-Type', 'application/json');
                                            res.end(JSON.stringify({ success: false, error: 'Campos obrigatórios ausentes.' }));
                                            return [2 /*return*/];
                                        }
                                        resend = new Resend(process.env.RESEND_API_KEY);
                                        emailMatch = String(contact).match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
                                        replyTo = emailMatch ? emailMatch[0] : undefined;
                                        html = "\n                <div style=\"font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 28px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; color: #0f172a;\">\n                  <div style=\"margin-bottom: 22px; border-bottom: 2px solid #0052FF; padding-bottom: 14px;\">\n                    <span style=\"font-size: 11px; font-weight: 700; letter-spacing: 0.12em; color: #0052FF; text-transform: uppercase;\">Tech Hub \u00B7 Novo Contato</span>\n                    <h1 style=\"font-size: 22px; color: #0f172a; margin: 6px 0 0 0; font-weight: 600;\">Nova solicita\u00E7\u00E3o de or\u00E7amento</h1>\n                  </div>\n                  <table style=\"width: 100%; border-collapse: collapse; margin-top: 16px;\">\n                    <tr>\n                      <td style=\"padding: 10px 0; color: #64748b; font-size: 13px; width: 140px; border-bottom: 1px solid #f1f5f9;\"><strong>Nome / Empresa:</strong></td>\n                      <td style=\"padding: 10px 0; color: #0f172a; font-size: 14px; font-weight: 600; border-bottom: 1px solid #f1f5f9;\">".concat(business, "</td>\n                    </tr>\n                    <tr>\n                      <td style=\"padding: 10px 0; color: #64748b; font-size: 13px; border-bottom: 1px solid #f1f5f9;\"><strong>Contato:</strong></td>\n                      <td style=\"padding: 10px 0; color: #0f172a; font-size: 14px; border-bottom: 1px solid #f1f5f9;\">").concat(contact, "</td>\n                    </tr>\n                    <tr>\n                      <td style=\"padding: 10px 0; color: #64748b; font-size: 13px; border-bottom: 1px solid #f1f5f9;\"><strong>Objetivo Principal:</strong></td>\n                      <td style=\"padding: 10px 0; color: #0052FF; font-size: 14px; font-weight: 600; border-bottom: 1px solid #f1f5f9;\">").concat(goal || 'Não informado', "</td>\n                    </tr>\n                    <tr>\n                      <td style=\"padding: 12px 0; color: #64748b; font-size: 13px; vertical-align: top;\"><strong>Desafio / Mensagem:</strong></td>\n                      <td style=\"padding: 12px 0; color: #334155; font-size: 14px; line-height: 1.6; white-space: pre-wrap;\">").concat(challenge || 'Não detalhado', "</td>\n                    </tr>\n                  </table>\n                  <div style=\"margin-top: 28px; padding-top: 16px; border-top: 1px solid #e2e8f0; font-size: 12px; color: #94a3b8;\">\n                    <span>Recebido atrav\u00E9s do formul\u00E1rio do site <strong>techhubvision.com.br</strong> (Ambiente de Desenvolvimento)</span>\n                  </div>\n                </div>\n              ");
                                        return [4 /*yield*/, resend.emails.send({
                                                from: 'onboarding@resend.dev',
                                                to: 'orcamentos@techhubvision.com.br',
                                                replyTo: replyTo,
                                                subject: "[Novo Or\u00E7amento - Dev] ".concat(business, " - ").concat(goal || 'Contato'),
                                                html: html,
                                            })];
                                    case 1:
                                        result = _b.sent();
                                        res.setHeader('Content-Type', 'application/json');
                                        if (result.error) {
                                            res.statusCode = 500;
                                            res.end(JSON.stringify({ success: false, error: result.error.message }));
                                        }
                                        else {
                                            res.statusCode = 200;
                                            res.end(JSON.stringify({ success: true, id: (_a = result.data) === null || _a === void 0 ? void 0 : _a.id }));
                                        }
                                        return [3 /*break*/, 3];
                                    case 2:
                                        err_1 = _b.sent();
                                        res.setHeader('Content-Type', 'application/json');
                                        res.statusCode = 500;
                                        res.end(JSON.stringify({ success: false, error: (err_1 === null || err_1 === void 0 ? void 0 : err_1.message) || 'Erro interno.' }));
                                        return [3 /*break*/, 3];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        }); });
                        return [2 /*return*/];
                    }
                    next();
                    return [2 /*return*/];
                });
            }); });
        },
    };
}
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), apiDevPlugin()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
