export interface ISigner {
  signXML(xmlContent: string, xpath: string): string;
}