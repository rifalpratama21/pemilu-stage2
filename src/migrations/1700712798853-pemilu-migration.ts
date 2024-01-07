import { MigrationInterface, QueryRunner } from "typeorm";

export class PemiluMigration1700712798853 implements MigrationInterface {
    name = 'PemiluMigration1700712798853'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "peserta" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "no_urut" integer NOT NULL, "address" character varying NOT NULL, "gender" character varying NOT NULL, "vote_paslon" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "paslonId" integer, CONSTRAINT "PK_cf6abc392067b3dff02667e1636" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "paslon" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "no_urut" integer NOT NULL, "visi_misi" character varying NOT NULL, "image" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_f3367efce21ffeeff1e3f58244d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "partai" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "leader" character varying NOT NULL, "no_urut" integer NOT NULL, "visi_misi" character varying NOT NULL, "address" character varying NOT NULL, "image" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "paslonId" integer, CONSTRAINT "PK_9c5c70fa29884e15f3b88a1b40b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "fullname" character varying NOT NULL, "username" character varying NOT NULL, "password" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pemilu" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "author" character varying NOT NULL, "description" character varying NOT NULL, "image" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "usersId" integer, CONSTRAINT "PK_ca3b9941eb997cdf81c5be9996d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "peserta" ADD CONSTRAINT "FK_e45bc09ce754333edcf63c79b24" FOREIGN KEY ("paslonId") REFERENCES "paslon"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "partai" ADD CONSTRAINT "FK_6e81e0a136eec2e38810173f217" FOREIGN KEY ("paslonId") REFERENCES "paslon"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "pemilu" ADD CONSTRAINT "FK_0296c33666136a06e0bcc760be7" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "pemilu" DROP CONSTRAINT "FK_0296c33666136a06e0bcc760be7"`);
        await queryRunner.query(`ALTER TABLE "partai" DROP CONSTRAINT "FK_6e81e0a136eec2e38810173f217"`);
        await queryRunner.query(`ALTER TABLE "peserta" DROP CONSTRAINT "FK_e45bc09ce754333edcf63c79b24"`);
        await queryRunner.query(`DROP TABLE "pemilu"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "partai"`);
        await queryRunner.query(`DROP TABLE "paslon"`);
        await queryRunner.query(`DROP TABLE "peserta"`);
    }

}
