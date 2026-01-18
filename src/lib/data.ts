import type { WebsiteSource, DatabaseConnection } from "@/lib/types";

export const initialWebsiteSources: WebsiteSource[] = [
  {
    id: "1",
    name: "LVB.cm",
    url: "https.lvb.cm",
    isActive: true,
  },
  {
    id: "2",
    name: "Matrix Telecoms",
    url: "https.matrixtelecoms.com",
    isActive: true,
  },
  {
    id: "3",
    name: "ADAC.cm",
    url: "https.adac.cm",
    isActive: false,
  },
  {
    id: "4",
    name: "Groupe ICCNET",
    url: "https.groupeiccnet.cm",
    isActive: true,
  },
];

export const initialDatabaseConnections: DatabaseConnection[] = [
  {
    id: "db1",
    name: "Production PGSQL",
    type: "postgresql",
    host: "prod.db.example.com",
    port: 5432,
    user: "admin_user",
    dbname: "production_db",
  },
  {
    id: "db2",
    name: "Staging MySQL",
    type: "mysql",
    host: "staging.db.example.com",
    port: 3306,
    user: "staging_user",
    dbname: "staging_db",
  },
  {
    id: "db3",
    name: "User Data Firestore",
    type: "firestore",
    host: "sourcewise-ai.firebaseio.com",
    port: 443,
    user: "service-account",
    dbname: "firestore_db",
  },
];
