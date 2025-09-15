import * as xmlCrypto from 'xml-crypto';
import { ISigner } from '../interfaces/signerXml.interface';

export class XMLSigner implements ISigner {
  constructor(private privateKey: string, private publicCert: string) {}

  signXML(xmlContent: string, xpath: string): string {
    const sig = new xmlCrypto.SignedXml({
      privateKey: this.privateKey,
      publicCert: this.publicCert,
    });

    sig.signatureAlgorithm =
      'http://www.w3.org/2001/04/xmldsig-more#rsa-sha256';
    sig.canonicalizationAlgorithm = 'http://www.w3.org/2001/10/xml-exc-c14n#';

    sig.addReference({
      xpath: xpath,
      digestAlgorithm: 'http://www.w3.org/2001/04/xmlenc#sha256',
      transforms: ['http://www.w3.org/2001/10/xml-exc-c14n#'],
    });

    sig.computeSignature(xmlContent);

    return sig.getSignedXml();
  }
}
