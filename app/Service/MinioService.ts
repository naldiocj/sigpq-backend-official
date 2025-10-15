import { minioClient } from 'Config/minio'
import Env from '@ioc:Adonis/Core/Env'

export default class MinioService {
  private bucketName = Env.get('MINIO_BUCKET_NAME')

  public async fileExists(fileName: string): Promise<boolean> {
    try {
      await minioClient.statObject(this.bucketName, fileName)
      return true
    } catch (error) {
      if (error.code === 'NotFound') {
        return false
      }
      throw error
    }
  }

  public async uploadFile(fileName: string, filePath: string, i: number = 1): Promise<string> {
    let uniqueFileName = fileName

    const ext: any = fileName.split('.').pop()
    const onlyName = fileName.slice(0, -(ext.length + 1))
    while (await this.fileExists(uniqueFileName)) {
      uniqueFileName = `${onlyName}-${i}.${ext}`
      i++
    }

    await minioClient.fPutObject(this.bucketName, uniqueFileName, filePath)

    return uniqueFileName
  }

  public async getFileUrl(fileName: string): Promise<string> {
    return await minioClient.presignedGetObject(this.bucketName, fileName, 24 * 60 * 60)
  }

  public async getObject(fileName: string): Promise<object> {
    return await minioClient.getObject(this.bucketName, fileName)
  }

  public async deleteFile(fileName: string): Promise<void> {
    await minioClient.removeObject(this.bucketName, fileName)
  }
}