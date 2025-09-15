export interface ISOAPClient {
  enviarNFCom(
    signedXml: string,
    ambiente: 'homologacao' | 'producao',
  ): Promise<any>;
}
