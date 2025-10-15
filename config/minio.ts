import Env from '@ioc:Adonis/Core/Env'
import * as Minio from 'minio'

export const minioConfig = {
  endPoint: Env.get('MINIO_ENDPOINT'),
  port: Env.get('MINIO_PORT', 9000),
  useSSL: Env.get('MINIO_USE_SSL', false) === 'true',
  accessKey: Env.get('MINIO_ACCESS_KEY'),
  secretKey: Env.get('MINIO_SECRET_KEY'),
  bucket: Env.get('MINIO_BUCKET_NAME'),
  forcePathStyle: true,
}

// Uso correto do Minio.Client
export const minioClient = new Minio.Client(minioConfig)