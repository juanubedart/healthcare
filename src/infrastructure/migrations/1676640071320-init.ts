import { MigrationInterface, QueryRunner } from "typeorm"

export class init1676640071320 implements MigrationInterface {
  name = "init1676640071320"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "parients" ADD "healthcard" character varying(100)`)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "parients" DROP COLUMN "healthcard"`)
  }
}
