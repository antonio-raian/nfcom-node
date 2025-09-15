export interface INFComXml {
  createXML(jsonData: object): string;
  signXML(xml: string, xpath: string): string;
}
