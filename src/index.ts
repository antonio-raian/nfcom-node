// export { NFCom } from './entities/nfcom.entity';
// export { XMLSigner } from './services/xmlSigner.service';
// export { SOAPClient } from './services/soapClient.service';
// export { FileHandler } from './services/fileHandler.service';
// export * from './interfaces/signerXml.interface';
// export * from './interfaces/soapclient.interface';
// export * from './interfaces/fileHandler.interface';

import { NFCom } from "./entities/nfcom.entity";
import { FileHandler } from "./services/fileHandler.service";
import { SOAPClient } from "./services/soapClient.service";
import { XMLSigner } from "./services/xmlSigner.service";
import * as fs from 'fs';

function main() {
  const privateKey = fs.readFileSync('key.pem', 'utf8');
  const cert = fs.readFileSync('cert.pem', 'utf8');

  const signer = new XMLSigner(privateKey, cert);
  const soapClient = new SOAPClient();
  const nfcom = new NFCom(signer, soapClient);

  const NFComExample = {
    NFCom: {
      $: {
        xmlns: 'http://www.portalfiscal.inf.br/nfcom',
      },
      infNFCom: {
        $: {
          versao: '1.00',
          Id: 'NFCom35250846665188000198620010000818101000000012',
        },
        ide: {
          cUF: '35',
          tpAmb: '1',
          mod: '62',
          serie: '1',
          nNF: '81810',
          cNF: '0000001',
          cDV: '1',
          dhEmi: '2023-05-25T14:30:00-03:00',
          tpEmis: '1',
          nSiteAutoriz: '1',
          cMunFG: '3557409',
          finNFCom: '0',
          tpFat: '0',
          verProc: '1',
          indCessaoMeiosRede: "1"
        },
        emit: {
          CNPJ: '46665188000198',
          IE: '0000000',
          CRT: '3',
          xNome: 'Sistema Clube de Comunicacao Ltda.',
          xFant: "NOME FANTASIA",
          enderEmit: {
            xLgr: 'Av. Nove de Julho',
            nro: '456',
            xBairro: 'Centro',
            cMun: '3543402',
            xMun: 'Ribeirao Preto',
            CEP: '14025000',
            UF: 'SP',
            fone: "11999999999"
          },
        },
        dest: {
          xNome: 'ATRI COMERCIAL LTDA',
          CNPJ: '46101424001891',
          indIEDest: '2',
          IE: 'ISENTO',
          enderDest: {
            xLgr: 'AV.MARIA DE JESUS CONDEIXA',
            nro: '335',
            xBairro: 'Jardim Nova Alianca',
            cMun: '3543402',
            xMun: 'Ribeirao Preto',
            CEP: '14091230',
            UF: 'SP',
            cPais: '1058',
            xPais: 'Brasil',
          },
        },
        assinante: {
          iCodAssinante: '1',
          tpAssinante: '1',
          tpServUtil: '6',
          nContrato: '62313',
          dContratoIni: '2025-09-01',
          dContratoFim: '2025-09-10',
        },
        det: {
          $: { nItem: '1' },
          prod: {
            cProd: '1',
            xProd:
              'Faturamento Conforme PEDIDO NUMERO: 24363 Referente veiculacoes no mes de Agosto/2025.',
            cClass: '0000001',
            CFOP: '5303',
            uMed: '4',
            qFaturada: '00000000001.0000',
            vItem: '1.00',
            vDesc: '1035.00',
            vProd: '1.00',
          },
          imposto: {
            indSemCST: '1',
            PIS: {
              CST: '01',
              vBC: '1.00',
              pPIS: '0.65',
              vPIS: '0.65',
            },
            COFINS: {
              CST: '01',
              vBC: '1.00',
              pCOFINS: '3.00',
              vCOFINS: '0.03',
            },
          },
        },
        total: {
          vProd: '1.00',
          ICMSTot: {
            vBC: '0',
            vICMS: '0',
            vICMSDeson: '0',
            vFCP: '0',
          },
          vCOFINS: '3.00',
          vPIS: '0.65',
          vFUNTTEL: '0.00',
          vFUST: '0.00',
          vRetTribTot: {
            vRetPIS: '0.00',
            vRetCofins: '0.00',
            vRetCSLL: '0.00',
            vIRRF: '0.00',
          },
          vDesc: '0.00',
          vOutro: '0.00',
          vNF: '1.00',
        },
        infAdic: {
          infAdFisco:
            'NFSC MOD 21 - EMITIDA CONFORME PORTARIA CAT.79/03 ART. 1o, ITEM II. RESERVADO AO FISCO PFC: 430',
          infCpl:
            'Valor de referencia do desconto padrao (remuneracao da agencia item 1.11 das normas padrao da atividade publicitaria) R$ 1.035,00 - Valor aproximado dos impostos sobre Lucro Real PIS 0,65% (R$ 26,91), COFINS 3% (R$ 124,20), CSLL 9% (R$ 372,60) e (I.R na Fonte para Entidades Publicas 4,8% (R$ 198,72)) - Nao incidencia de ICMS, conf. Art. 155, Inciso II, Parag. 2o, Inciso X alinea "D" da Constituicao Federal. Cobranca: BANCO SICREDI',
        },
        gRespTec: {
          CNPJ: '16921495000121',
          xContato: 'Valério Guimarães',
          email: 'valerio@controlaltweb.com.br',
          fone: '16991378813',
        },
      },
      infNFComSupl: {
        qrCodNFCom: "https://sefaz.sp.gov.br/nfcom/consulta?chNFCom=35250900000000000191620010000000011000000001&tpAmb=2"
      },
    },
  };

  const xml = nfcom.createXML(NFComExample);
  const fileHandler = new FileHandler();
  console.log('XML criado', xml);
  nfcom.signXML(xml, "//*[local-name(.)='infNFCom']").then(signedXmlPath => {
    console.log('XML assinado', signedXmlPath);
  });
}

main();