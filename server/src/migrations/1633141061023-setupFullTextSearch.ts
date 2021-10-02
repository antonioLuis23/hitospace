import { MigrationInterface, QueryRunner } from "typeorm";

export class setupFullTextSearch1633141061023 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        update employee set document = to_tsvector(coalesce(name, '')) ||
          to_tsvector(coalesce("sectorsName", '')) ||
          to_tsvector(coalesce(function, '')) ||
          to_tsvector(coalesce(abilities, '')) ||
          to_tsvector(coalesce(tags, '')) ||
          to_tsvector(coalesce(country, '')) ||
          to_tsvector(coalesce(state, '')) ||
          to_tsvector(coalesce(city, ''));
        CREATE INDEX document_idx
        ON employee
        USING GIN (document);
                CREATE FUNCTION employee_tsvector_trigger() RETURNS trigger AS $$
        begin
        new.document :=
        to_tsvector('portuguese', coalesce(new.name, ''))
        || to_tsvector('portuguese', coalesce(new."sectorsName", ''))
        || to_tsvector('portuguese', coalesce(new.function, ''))
        || to_tsvector('portuguese', coalesce(new.abilities, ''))
        || to_tsvector('portuguese', coalesce(new.tags, ''))
        || to_tsvector('portuguese', coalesce(new.country, ''))
        || to_tsvector('portuguese', coalesce(new.state, ''))
        || to_tsvector('portuguese', coalesce(new.city, ''));
        return new;
        end
        $$ LANGUAGE plpgsql;
        CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
            ON employee FOR EACH ROW EXECUTE PROCEDURE employee_tsvector_trigger();
            `);
  }

  public async down(_: QueryRunner): Promise<void> {}
}
