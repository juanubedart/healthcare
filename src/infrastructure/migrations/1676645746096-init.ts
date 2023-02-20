import { MigrationInterface, QueryRunner } from "typeorm";

export class init1676645746096 implements MigrationInterface {
    name = 'init1676645746096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parients" DROP COLUMN "healthcard"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "parients" ADD "healthcard" character varying(100)`);
    }

}
