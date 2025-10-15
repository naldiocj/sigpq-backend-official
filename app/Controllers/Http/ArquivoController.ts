//app/Controllers/Http/FileController.ts
import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import FileRepository from 'App/Repositories/ArquivoRepository'

export default class ArquivoController {
  private fileRepo = new FileRepository()
  private destino = 'core/'

  public async upload({ request, response }: HttpContextContract) {

    const file = request.file('arquivo')

    if (!file) {
      return response.ok({
        message: 'Nenhum arquivo encontrado',
        object: ''
      });
    }

    const item = await this.fileRepo.upload(file, this.destino)

    return response.ok({
      message: 'Arquivo guardado com sucesso',
      object: { nome: item }
    });
  }

  public async getUrl({ request, response }: HttpContextContract) {
    const fileName = request.input("arquivo")
    const url = await this.fileRepo.getUrl(fileName)
    return response.ok({
      message: null,
      object: url
    });
  }

  public async getObject({ request, response }: HttpContextContract) {
    const fileNames = request.input("arquivo")

    const result: any = await this.fileRepo.getObject(fileNames);

    // Determina o tipo MIME com base na extensão do arquivo
    const mimeType = this.getMimeType(fileNames);

    // Define o cabeçalho Content-Type com o tipo MIME adequado
    response.header("Content-Type", mimeType);

    return response.stream(result);
  }

  public async delete({ request, response }: HttpContextContract) {
    const fileName = request.file("arquivo")
    await this.fileRepo.delete(fileName)
    return response.ok({
      message: 'Arquivo eliminado com sucesso',
      object: null
    });
  }

  private getMimeType(fileName: string): string {
    const extension = fileName.split(".").pop()?.toLowerCase() || "";
    const mimeTypes = {
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
      png: "image/png",
      gif: "image/gif",
      pdf: "application/pdf",
      txt: "text/plain",
      html: "text/html",
      css: "text/css",
      js: "application/javascript",
      mp4: "video/mp4",
      mp3: "audio/mpeg",
    };

    return mimeTypes[extension] || "application/octet-stream";
  }
}