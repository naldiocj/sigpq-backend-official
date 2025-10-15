import MinioService from 'App/Service/MinioService'
import * as fs from 'fs'
import * as path from 'path'

export default class FileRepository {

  private minioService = new MinioService()

  

  public async fileExists(fileName: any) {
    return await this.minioService.fileExists(fileName)
  }

  // Novo método para upload de buffers binários
  public async uploadBinary(
    files: { name: string; data: Buffer; type: string } | { name: string; data: Buffer; type: string }[],
    folder: string
  ): Promise<string | string[]> {
    console.log('Iniciando uploadBinary com arquivos:', files);
    try {
      const fileArray = Array.isArray(files) ? files : [files];
      console.log('Arquivos normalizados:', fileArray);

      const uploadedFiles: string[] = [];
      for (const file of fileArray) {
        console.log('Processando arquivo:', file.name, 'Tamanho:', file.data.length);
        const tempFilePath = path.join(__dirname, 'tmp', file.name);
        console.log('Criando arquivo temporário em:', tempFilePath);
        await fs.promises.mkdir(path.dirname(tempFilePath), { recursive: true });
        await fs.promises.writeFile(tempFilePath, file.data);

        const fullFilePath = `${folder}${file.name}`;
        console.log('Fazendo upload para MinIO:', fullFilePath);
        const newFileName = await this.minioService.uploadFile(fullFilePath, tempFilePath);
        console.log('Arquivo enviado com sucesso:', newFileName);
        uploadedFiles.push(newFileName);

        await fs.promises.unlink(tempFilePath);
        console.log('Arquivo temporário removido:', tempFilePath);
      }

      console.log('Upload concluído, retornando:', uploadedFiles);
      return fileArray.length === 1 ? uploadedFiles[0] : uploadedFiles;
    } catch (error) {
      console.error('Erro no uploadBinary:', error.message, error.stack);
      throw new Error(error.message || 'Não foi possível guardar o arquivo binário');
    }
  }

  public async uploadBinary(
    files: { name: string; data: Buffer; type: string } | { name: string; data: Buffer; type: string }[],
    folder: string
  ): Promise<string | string[]> {
    console.log('Iniciando uploadBinary com arquivos:', files);
    try {
      const fileArray = Array.isArray(files) ? files : [files];
      console.log('Arquivos normalizados:', fileArray);

      const uploadedFiles: string[] = [];
      for (const file of fileArray) {
        console.log('Processando arquivo:', file.name, 'Tamanho:', file.data.length);
        const tempFilePath = path.join(__dirname, 'tmp', file.name);
        console.log('Criando arquivo temporário em:', tempFilePath);
        await fs.promises.mkdir(path.dirname(tempFilePath), { recursive: true });
        await fs.promises.writeFile(tempFilePath, file.data);

        const fullFilePath = `${folder}${file.name}`;
        console.log('Fazendo upload para MinIO:', fullFilePath);
        const newFileName = await this.minioService.uploadFile(fullFilePath, tempFilePath);
        console.log('Arquivo enviado com sucesso:', newFileName);
        uploadedFiles.push(newFileName);

        await fs.promises.unlink(tempFilePath);
        console.log('Arquivo temporário removido:', tempFilePath);
      }

      console.log('Upload concluído, retornando:', uploadedFiles);
      return fileArray.length === 1 ? uploadedFiles[0] : uploadedFiles;
    } catch (error) {
      console.error('Erro no uploadBinary:', error.message, error.stack);
      throw new Error(error.message || 'Não foi possível guardar o arquivo binário');
    }
  }

  // Método para um ou mais arquivos em base64 (Socket.IO)
  public async uploadBase644(
    files: { name: string; data: string; type: string } | { name: string; data: string; type: string }[],
    folder: string
  ): Promise<string | string[]> {
    try {
      // Normalizar entrada para array
      const fileArray = Array.isArray(files) ? files : [files]

      if (fileArray.length === 0 || fileArray.some(f => !f?.data)) {
        throw new Error('Nenhum arquivo encontrado')
      }

      const uploadedFiles: string[] = []

      for (const file of fileArray) {
        // Criar arquivo temporário a partir do base64
        const buffer = Buffer.from(file.data, 'base64')
        const tempFilePath = path.join(__dirname, 'tmp', file.name)
        await fs.promises.mkdir(path.dirname(tempFilePath), { recursive: true })
        await fs.promises.writeFile(tempFilePath, buffer)

        // Fazer upload para o MinIO
        const fullFilePath = `${folder}${file.name}`
        const newFileName = await this.minioService.uploadFile(fullFilePath, tempFilePath)
        uploadedFiles.push(newFileName)

        // Remover arquivo temporário
        await fs.promises.unlink(tempFilePath)
      }

      // Retornar string única se for um arquivo, ou array se forem múltiplos
      return fileArray.length === 1 ? uploadedFiles[0] : uploadedFiles
    } catch (error) {
      throw new Error(error.message || 'Não foi possível guardar o arquivo em base64')
    }
  }

  public async upload(file, folder: string) {
    try {
      if (!file) {
        throw new Error('Nenhum arquivo encontrado')
      }

      const fileName = file.clientName
      const filePath = file.tmpPath!
      const fullFilePath = `${folder}${fileName}`

      const newFileName = await this.minioService.uploadFile(fullFilePath, filePath)

      return newFileName
    } catch (error) {
      throw new Error(error.message || 'Não foi possível guardar o arquivo')
    }
  }

  public async getUrl(fileName) {
    try {
      if (!await this.fileExists(fileName)) {
        throw new Error('Nenhum arquivo encontrado')
      }
      const url = await this.minioService.getFileUrl(fileName)
      return url
    } catch (error) {
      throw new Error(error.message || 'Não foi possível obter o arquivo')
    }
  }

  public async getObject(fileName) {
    try {
      if (!await this.fileExists(fileName)) {
        throw new Error('Nenhum arquivo encontrado')
      }
      const object = await this.minioService.getObject(fileName)
      return object
    } catch (error) {
      throw new Error(error.message || 'Não foi possível obter o arquivo')
    }
  }

  public async delete(fileName) {

    try {
      if (!await this.fileExists(fileName)) {
        throw new Error('Nenhum arquivo encontrado')
      }
      await this.minioService.deleteFile(fileName)
    } catch (error) {
      throw new Error(error.message || 'Não foi possível eliminar o arquivo')
    }
  }
}
