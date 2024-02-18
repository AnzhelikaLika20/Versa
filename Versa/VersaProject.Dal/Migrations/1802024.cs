using FluentMigrator;

namespace VersaProject.Dal.Migrations;

public class AddUserType : Migration {
    public override void Up()
    {
        const string sql = @"
DO $$
    BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typename = 'user') THEN
            CREATE TYPE user as 
            (
                id bigint,
                name string
            );
        END IF;
    END
$$
";
        Execute.Sql(sql);
    }

    public override void Down()
    {
        const string sql = @"
DO $$
    BEGIN
        DROP TYPE IF EXISTS user;
    END
$$
";
        Execute.Sql(sql);
    }
}