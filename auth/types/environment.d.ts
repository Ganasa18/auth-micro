export {};

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT_SERVER: number;
      DB_PORT: number;
      DB_USER: string;
      DB_HOST: string;
      DB_NAME: string;
      DB_PASSWORD: string;
      ENV: "test" | "dev" | "prod";
      KAFKA_CLIENT_ID: string;
      KAFKA_URL: string;
    }
  }
}
