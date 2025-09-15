import { Builder } from 'xml2js';
import { ISigner } from '../interfaces/signerXml.interface';
import { ISOAPClient } from '../interfaces/soapClient.interface';

export class NFCom {
  constructor(private signer: ISigner, private soapClient: ISOAPClient) {}

  createXML(jsonData: object): string {
    const builder = new Builder();
    return builder.buildObject(jsonData);
  }

  async signXML(xml: string, xpath: string): Promise<string> {
    return await this.signer.signXML(xml, xpath);
  }

  async sendSignedXML(
    signedXml: string,
    ambiente: 'homologacao' | 'producao' = 'homologacao',
  ): Promise<any> {
    return await this.soapClient.enviarNFCom(signedXml, ambiente);
  }
}
