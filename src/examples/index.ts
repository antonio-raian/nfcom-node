// import { NFCom, XMLSigner, SOAPClient, FileHandler } from 'nfcom-node';

// // Configuração
// const privateKey = `-----BEGIN PRIVATE KEY----- ...`;
// const publicCert = `-----BEGIN CERTIFICATE----- ...`;

// const signer = new XMLSigner(privateKey, publicCert);
// const soapClient = new SOAPClient();
// const fileHandler = new FileHandler();

// const nfcom = new NFCom(signer, soapClient, fileHandler);

// // Dados da NFCom
// const jsonData = {
//   // ... estrutura da NFCom
// };

// // Uso
// async function processarNFCom() {
//   try {
//     // Gerar e assinar XML
//     const { signedXmlPath } = await nfcom.signAndSave(
//       jsonData,
//       "//*[local-name(.)='infNFCom']",
//       './filesXml',
//       'minha_nfcom',
//     );

//     // Ler XML assinado
//     const signedXml = await fileHandler.readFile(signedXmlPath);

//     // Enviar para a SEFAZ
//     const response = await nfcom.sendSignedXML(signedXml, 'homologacao');
//     console.log('Resposta do webservice:', response);
//   } catch (error) {
//     console.error('Erro ao processar NFCom:', error);
//   }
// }

// processarNFCom();
