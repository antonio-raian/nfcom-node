import axios, { AxiosResponse } from 'axios';
import { ISOAPClient } from '../interfaces/soapClient.interface';

export class SOAPClient implements ISOAPClient {
  async enviarNFCom(
    signedXml: string,
    ambiente: 'homologacao' | 'producao' = 'homologacao',
  ): Promise<any> {
    const endpoints = {
      homologacao:
        'https://nfcom-homologacao.svrs.rs.gov.br/WS/NFComRecepcao/NFComRecepcao.asmx',
      producao:
        'https://nfcom.svrs.rs.gov.br/WS/NFComRecepcao/NFComRecepcao.asmx',
    };

    const url = endpoints[ambiente];

    const soapEnvelope = `
      <?xml version="1.0" encoding="utf-8"?>
      <soap12:Envelope 
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" 
        xmlns:xsd="http://www.w3.org/2001/XMLSchema" 
        xmlns:soap12="http://www.w3.org/2003/05/soap-envelope">
        <soap12:Body>
          <RecepcionarLoteRps xmlns="http://nfcom.svrs.rs.gov.br/">
            <nfComCabecMsg>
              <![CDATA[
              <cabecalho xmlns="http://www.abrasf.org.br/nfcom" versao="1.00">
                <versaoDados>1.00</versaoDados>
              </cabecalho>
              ]]>
            </nfComCabecMsg>
            <nfComDadosMsg>
              <![CDATA[${signedXml}]]>
            </nfComDadosMsg>
          </RecepcionarLoteRps>
        </soap12:Body>
      </soap12:Envelope>
    `.trim();

    const headers = {
      'Content-Type': 'application/soap+xml; charset=utf-8',
      SOAPAction: 'http://nfcom.svrs.rs.gov.br/RecepcionarLoteRps',
      'Content-Length': Buffer.byteLength(soapEnvelope).toString(),
    };

    const response: AxiosResponse = await axios.post(url, soapEnvelope, {
      headers,
    });
    return response.data;
  }
}
