export default class StringHelper {
    public async limparCaracterEmBranco(str: string) {
        return str
        return str.trim().replace(/\s+/g, ' ');
    }
}
