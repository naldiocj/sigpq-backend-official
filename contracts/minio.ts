declare module '@ioc:Adonis/Core/MinIO' {
    import { Client } from 'minio'
    
    const MinioClient: Client
    export default MinioClient
  }